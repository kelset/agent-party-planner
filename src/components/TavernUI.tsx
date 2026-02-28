import { useState, useMemo, useEffect } from 'preact/hooks';
import LZString from 'lz-string';
import type {
  OrchestrationConfig,
  Responsibility,
  PartyMember,
} from '../core/types';
import { defaultPartyPreset } from '../core/presets/defaultParty';
import { PartyMemberCard } from './PartyMemberCard';
import { MemberEditor } from './MemberEditor';
import { OrchestrationForge } from '../core/forge';
import { OrchestrationCourier } from '../core/courier';
import type { Platform } from '../core/adapters';

export function TavernUI() {
  const [config, setConfig] = useState<OrchestrationConfig>(defaultPartyPreset);
  const [isCatalogOpen, setIsCatalogOpen] = useState(false);
  const [editingMemberId, setEditingMemberId] = useState<string | null>(null);
  const [pendingMember, setPendingMember] = useState<PartyMember | null>(null);
  const [customResponsibilities, setCustomResponsibilities] = useState<
    Responsibility[]
  >([]);
  const [newDuty, setNewDuty] = useState({ name: '', description: '' });
  const [platform, setPlatform] = useState<Platform>('claude');
  const [isExporting, setIsExporting] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const sharedConfig = urlParams.get('party');
    let loadedConfig = null;

    if (sharedConfig) {
      try {
        const decoded = LZString.decompressFromEncodedURIComponent(sharedConfig);
        if (decoded) {
          loadedConfig = JSON.parse(decoded);
          // Clean up the URL so it doesn't linger
          window.history.replaceState({}, '', window.location.pathname);
        }
      } catch (e) {
        console.error('Failed to parse shared config from URL', e);
      }
    }

    if (!loadedConfig) {
      const saved = localStorage.getItem('party-planner-config');
      if (saved) {
        try {
          loadedConfig = JSON.parse(saved);
        } catch (e) {
          console.error('Failed to parse saved config from localStorage', e);
        }
      }
    }

    if (loadedConfig) {
      setConfig(loadedConfig);
    }
    
    setIsInitialized(true);
  }, []);

  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem('party-planner-config', JSON.stringify(config));
    }
  }, [config, isInitialized]);

  const handleShare = () => {
    const encoded = LZString.compressToEncodedURIComponent(JSON.stringify(config));
    const url = `${window.location.origin}${window.location.pathname}?party=${encoded}`;
    navigator.clipboard.writeText(url).then(() => {
      alert('Party configuration URL copied to clipboard! You can share this link with others.');
    }).catch(err => {
      console.error('Failed to copy link', err);
      alert('Failed to copy link to clipboard.');
    });
  };

  const handleAddDuty = () => {
    if (!newDuty.name || !newDuty.description) return;
    setCustomResponsibilities((prev) => [prev, { newDuty }]);
    setNewDuty({ name: '', description: '' });
  };

  const handleRemoveMember = (id: string) => {
    setConfig((prev) => ({
      prev,
      party: prev.party.filter((m) => m.id !== id),
    }));
    setEditingMemberId(null);
    setPendingMember(null);
  };

  const handleSaveMember = (updatedMember: PartyMember) => {
    if (pendingMember) {
      setConfig((prev) => ({
        prev,
        party: [prev.party, updatedMember],
      }));
      setPendingMember(null);
    } else {
      setConfig((prev) => ({
        prev,
        party: prev.party.map((m) =>
          m.id === updatedMember.id ? updatedMember : m
        ),
      }));
      setEditingMemberId(null);
    }
  };

  const handleRecruitMember = () => {
    const classes = [
      'Ranger',
      'Wizard',
      'Warrior',
      'Warlock',
      'Healer',
      'Bard',
      'Paladin',
      'Rogue',
    ];
    const randomClass = classes[Math.floor(Math.random() * classes.length)];
    const newId = `${randomClass.toLowerCase()}-${Date.now()}`;

    const newMember: PartyMember = {
      id: newId,
      name: `New ${randomClass}`,
      agentClass: randomClass,
      classFantasy: 'A mysterious newcomer to the party.',
      personality: 'Eager to prove their worth and complete the quest.',
      responsibilities: [],
      restrictions: [],
      spawnTriggers: [],
      tools: [],
      relationships: [],
    };

    setPendingMember(newMember);
  };

  const handleExport = async () => {
    try {
      setIsExporting(true);
      const files = OrchestrationForge.forgePackage(config, platform);
      const blob = await OrchestrationCourier.generateZip(files);
      OrchestrationCourier.downloadBlob(
        blob,
        `agent-party-${config.questName.toLowerCase().replace(/\s+/g, '-')}.zip`
      );
    } catch (error) {
      console.error('Failed to export party:', error);
      alert('Failed to generate the party package. Please try again.');
    } finally {
      setIsExporting(false);
    }
  };

  // Derive unique responsibilities available across the current party AND the default setup
  const allResponsibilities = useMemo(() => {
    const map = new Map<string, Responsibility>();
    // Look in the current config
    config.party.forEach((member) => {
      member.responsibilities.forEach((r) => {
        if (!map.has(r.name)) map.set(r.name, r);
      });
    });
    // ALSO look in the default preset to ensure we don't lose core ones
    defaultPartyPreset.party.forEach((member) => {
      member.responsibilities.forEach((r) => {
        if (!map.has(r.name)) map.set(r.name, r);
      });
    });
    // Add custom created ones
    customResponsibilities.forEach((r) => {
      if (!map.has(r.name)) map.set(r.name, r);
    });
    return Array.from(map.values());
  }, [config.party, customResponsibilities]);

  const editingMember = useMemo(
    () => config.party.find((m) => m.id === editingMemberId),
    [config.party, editingMemberId]
  );

  const activeMember = editingMember || pendingMember;

  // Don't render until client-side hydration has checked storage/url to prevent flash of default
  // But to be SEO friendly we should render something. For Astro it's better to render default then swap
  // We just let it render default Party.

  return (
    <section id="the-party" class="py-12 flex flex-col gap-12">
      {/* Member Editor Modal */}
      {
        activeMember && (
          <MemberEditor
            member={activeMember}
            isNew={!!pendingMember}
            allResponsibilities={allResponsibilities}
            otherMembers={config.party
              .filter((m) => m.id !== activeMember.id)
              .map((m) => ({ id: m.id, name: m.name }))}
            onSave={handleSaveMember}
            onRemove={handleRemoveMember}
            onClose={() => {
              setEditingMemberId(null);
              setPendingMember(null);
            }}
          />
        ) /* End Member Editor Modal */
      }

      {/* Header */}
      <div class="border-b border-tavern-800 pb-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <h1 class="text-4xl md:text-5xl font-extrabold text-parchment italic mb-4">
            Assemble Your Party
          </h1>
          <p class="text-slate-400 max-w-2xl">
            Configure your active roster by editing roles, defining relationships,
            and removing agents you don't need.
          </p>
        </div>
        
      </div>

      {/* War Room Callout */}
      <div class="p-5 bg-slate-900/50 border border-gold-600/20 rounded-xl flex flex-col sm:flex-row gap-5 items-start">
        <div class="w-12 h-12 rounded-full bg-gold-900/30 border border-gold-600/50 flex items-center justify-center shrink-0">
          <span class="text-2xl">🏰</span>
        </div>
        <div>
          <h3 class="text-sm font-bold text-gold-500 uppercase tracking-widest mb-1">
            The War Room is Ready
          </h3>
          <p class="text-sm text-slate-300 leading-relaxed">
            Your overarching meta-orchestration is overseen by a fixed, highly-opinionated <strong>War Room</strong> consisting of the <strong class="text-parchment">Game Creator</strong>, the <strong class="text-parchment">Master of Spies</strong>, and the <strong class="text-parchment">Bard</strong>. This meta-layer provides strategic planning, performance evaluation, and engaging recaps, leaving you to focus entirely on customizing the execution Party below.
          </p>
        </div>
      </div>

      {/* Roster Grid */}
      <div>
        <div class="mb-6 flex justify-between items-end">
          <h2 class="text-xl font-bold text-parchment">The Roster</h2>
          <div class="text-sm text-slate-500">
            Members: <span class="text-gold-400">{config.party.length}</span> /
            min {config.constraints.minPartyMembers}
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 items-stretch">
          {config.party.map((member) => {
            const hasAvailableResponsibilities = allResponsibilities.some(
              (r) => !member.responsibilities.some((res) => res.name === r.name)
            );
            return (
              <PartyMemberCard
                key={member.id}
                member={member}
                onEdit={setEditingMemberId}
                hasAvailableResponsibilities={hasAvailableResponsibilities}
              />
            );
          })}

          {/* Add Member Placeholder */}
          <button
            onClick={handleRecruitMember}
            class="border-2 border-dashed border-slate-800 rounded-xl bg-slate-900/50 hover:bg-slate-800/50 transition-colors flex flex-col items-center justify-center min-h-[480px] cursor-pointer group"
          >
            <div class="w-16 h-16 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center group-hover:bg-gold-600/20 group-hover:border-gold-600/50 transition-colors mb-4 shadow-inner">
              <span class="text-3xl text-slate-600 group-hover:text-gold-400 transition-colors">
                +
              </span>
            </div>
            <span class="text-slate-500 font-bold uppercase tracking-widest text-sm group-hover:text-gold-400 transition-colors">
              Recruit Member
            </span>
          </button>
        </div>

        {config.party.length < config.constraints.minPartyMembers && (
          <div class="mt-8 p-4 bg-crimson/10 border border-crimson/20 rounded-lg text-crimson text-sm font-medium flex items-center gap-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                clip-rule="evenodd"
              />
            </svg>
            Warning: Your party must have at least{' '}
            {config.constraints.minPartyMembers} members to proceed on this
            quest.
          </div>
        )}
      </div>

      {/* Responsibilities Catalog */}
      <div class="bg-slate-900 border border-tavern-800 rounded-xl overflow-hidden shadow-lg">
        <button
          onClick={() => setIsCatalogOpen(!isCatalogOpen)}
          class="w-full px-6 py-4 flex justify-between items-center bg-tavern-800/30 hover:bg-tavern-800/50 transition-colors cursor-pointer"
        >
          <div class="flex items-center gap-3">
            <span class="text-gold-400 text-xl">📜</span>
            <h3 class="text-lg font-bold text-parchment tracking-wide">
              Responsibilities Catalog
            </h3>
          </div>
          <span
            class="text-slate-500 transform transition-transform duration-200"
            style={{ transform: isCatalogOpen ? 'rotate(180deg)' : 'none' }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clip-rule="evenodd"
              />
            </svg>
          </span>
        </button>
        {isCatalogOpen && (
          <div class="p-6 border-t border-tavern-800 bg-slate-900/50 space-y-8">
            {/* Create New Duty Form */}
            <div class="bg-slate-950/50 p-6 rounded-xl border border-dashed border-tavern-800">
              <h4 class="text-[10px] font-black uppercase tracking-widest text-gold-500 mb-4">
                Define a New Duty
              </h4>
              <div class="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                <div class="md:col-span-1">
                  <label class="block text-[10px] text-slate-500 mb-1 ml-1">
                    Duty Name
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Code Archeology"
                    value={newDuty.name}
                    onInput={(e) =>
                      setNewDuty({
                        newDuty,
                        name: (e.target as HTMLInputElement).value,
                      })
                    }
                    class="w-full bg-slate-900 border-2 border-tavern-800 rounded-lg px-4 py-2 text-parchment text-sm focus:outline-none focus:border-gold-600/50 transition-colors"
                  />
                </div>
                <div class="md:col-span-1">
                  <label class="block text-[10px] text-slate-500 mb-1 ml-1">
                    Description
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Scans legacy logs for patterns"
                    value={newDuty.description}
                    onInput={(e) =>
                      setNewDuty({
                        newDuty,
                        description: (e.target as HTMLInputElement).value,
                      })
                    }
                    class="w-full bg-slate-900 border-2 border-tavern-800 rounded-lg px-4 py-2 text-parchment text-sm focus:outline-none focus:border-gold-600/50 transition-colors"
                  />
                </div>
                <button
                  onClick={handleAddDuty}
                  disabled={!newDuty.name || !newDuty.description}
                  class="h-[42px] bg-gold-600 hover:bg-gold-500 disabled:opacity-30 disabled:grayscale text-slate-950 font-black uppercase tracking-widest text-[10px] rounded-lg shadow-lg shadow-gold-900/20 transition-all active:scale-95"
                >
                  Add to Catalog
                </button>
              </div>
            </div>

            {/* List of Duties */}
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {allResponsibilities.map((r) => (
                <div
                  key={r.name}
                  class="bg-slate-800 p-4 rounded-lg border border-slate-700 shadow-inner"
                >
                  <h4 class="text-sm font-bold text-gold-400 mb-2 tracking-wide">
                    {r.name}
                  </h4>
                  <p class="text-xs text-slate-400 leading-relaxed">
                    {r.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Export Action Scroll (Pixel Art / Retro RPG Inspo) */}
      <div class="mt-16 mb-24 relative flex justify-center px-6">
        <div class="relative w-full max-w-2xl drop-shadow-[0_15px_15px_rgba(0,0,0,0.5)]">
          {/* Top Roll */}
          <div class="absolute -top-5 left-0 right-0 h-10 bg-gradient-to-b from-[#c8a98a] via-[#af8d6b] to-[#917152] border-[3px] border-[#2c1e16] z-20 flex items-center justify-between">
            {/* Left Spindle */}
            <div class="absolute -left-[20px] flex items-center z-10">
              <div class="w-[8px] h-[12px] bg-[#5c4033] border-y-[3px] border-l-[3px] border-[#2c1e16] rounded-l-[2px]"></div>
              <div class="w-[12px] h-[24px] bg-[#75513f] border-[3px] border-[#2c1e16]"></div>
            </div>
            {/* Right Spindle */}
            <div class="absolute -right-[20px] flex items-center z-10">
              <div class="w-[12px] h-[24px] bg-[#75513f] border-[3px] border-[#2c1e16]"></div>
              <div class="w-[8px] h-[12px] bg-[#5c4033] border-y-[3px] border-r-[3px] border-[#2c1e16] rounded-r-[2px]"></div>
            </div>
            {/* Roll details */}
            <div class="w-full h-full flex flex-col justify-evenly py-[6px] opacity-40">
              <div class="w-full h-[3px] bg-[#2c1e16]"></div>
              <div class="w-full h-[3px] bg-[#2c1e16]"></div>
            </div>
          </div>

          {/* Main Scroll Body */}
          <div 
            class="relative bg-[#af8d6b] border-[3px] border-t-0 border-b-0 border-[#2c1e16] text-[#2c1e16] pt-12 pb-16 px-6 md:px-12 z-10"
            style={{
              backgroundImage: `
                linear-gradient(to right, rgba(44, 30, 22, 0.15) 3px, transparent 3px),
                linear-gradient(to bottom, rgba(44, 30, 22, 0.15) 3px, transparent 3px)
              `,
              backgroundSize: '48px 48px',
              backgroundPosition: 'center top'
            }}
          >
            {/* Content Container */}
            <div class="text-center mb-10 relative z-10 bg-[#af8d6b]/90 p-4 rounded border-[3px] border-[#2c1e16]/10">
              <h2 class="text-3xl md:text-4xl font-black uppercase tracking-widest text-[#2c1e16] mb-3 drop-shadow-[2px_2px_0_rgba(200,169,138,0.8)]" style={{ fontFamily: 'monospace' }}>Seal The Pact</h2>
              <p class="text-[#4a3424] font-bold max-w-md mx-auto leading-relaxed">
                Your party is assembled. Choose your orchestration realm, generate the sacred texts, and share your roster.
              </p>
            </div>

            <div class="flex flex-col items-center gap-8 relative z-10 px-2">
              {/* Step 1: Model Picker */}
              <div class="w-full max-w-sm flex flex-col items-center text-center bg-[#c8a98a] border-[3px] border-[#2c1e16] p-5 shadow-[6px_6px_0_#2c1e16] transition-transform hover:-translate-y-1">
                <span class="text-xs font-black text-[#2c1e16] uppercase tracking-widest mb-3 pb-2 w-full border-b-[3px] border-[#2c1e16]/20">I. Select Your Realm</span>
                <div class="relative w-full mt-2">
                  <select
                    value={platform}
                    onInput={(e) => setPlatform((e.target as HTMLSelectElement).value as Platform)}
                    class="appearance-none w-full bg-[#e8dcb8] border-[3px] border-[#2c1e16] text-[#2c1e16] py-3 pl-4 pr-10 focus:outline-none focus:bg-[#fffcf5] cursor-pointer text-sm font-black tracking-wide transition-colors shadow-[4px_4px_0_rgba(44,30,22,0.2)]"
                  >
                    <option value="claude">Claude (Anthropic)</option>
                    <option value="gemini">Gemini (Google)</option>
                    <option value="openai">ChatGPT (OpenAI)</option>
                    <option value="other">Other Agents</option>
                    <option value="markdown">Raw Markdown</option>
                  </select>
                  <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-[#2c1e16]">
                    <svg class="w-6 h-6 stroke-[3px]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="square" stroke-linejoin="miter" d="M19 9l-7 7-7-7"></path></svg>
                  </div>
                </div>
              </div>

              {/* Step 2: Generate */}
              <div class="w-full max-w-sm flex flex-col items-center text-center bg-[#c8a98a] border-[3px] border-[#2c1e16] p-5 shadow-[6px_6px_0_#2c1e16] transition-transform hover:-translate-y-1">
                <span class="text-xs font-black text-[#2c1e16] uppercase tracking-widest mb-3 pb-2 w-full border-b-[3px] border-[#2c1e16]/20">II. Forge The Documents</span>
                <button
                  onClick={handleExport}
                  disabled={isExporting}
                  class="w-full bg-[#b93838] hover:bg-[#a12e2e] text-white uppercase tracking-widest text-sm py-4 font-black disabled:opacity-50 disabled:cursor-not-allowed transition-all active:translate-y-[4px] active:translate-x-[4px] active:shadow-[0_0_0_#2c1e16] border-[3px] border-[#2c1e16] shadow-[4px_4px_0_#2c1e16] mt-2"
                >
                  {isExporting ? 'Scribing Scrolls' : 'Generate My Party'}
                </button>
              </div>

              {/* Step 3: Share */}
              <div class="w-full max-w-sm flex flex-col items-center text-center bg-[#c8a98a] border-[3px] border-[#2c1e16] p-5 shadow-[6px_6px_0_#2c1e16] transition-transform hover:-translate-y-1">
                <span class="text-xs font-black text-[#2c1e16] uppercase tracking-widest mb-3 pb-2 w-full border-b-[3px] border-[#2c1e16]/20">III. Spread The Word</span>
                <button
                  onClick={handleShare}
                  class="flex items-center justify-center gap-3 w-full bg-[#e8dcb8] hover:bg-[#fffcf5] text-[#2c1e16] uppercase tracking-widest text-sm py-4 font-black transition-all active:translate-y-[4px] active:translate-x-[4px] active:shadow-[0_0_0_#2c1e16] border-[3px] border-[#2c1e16] shadow-[4px_4px_0_#2c1e16] mt-2"
                >
                  <svg class="w-5 h-5 stroke-[3px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="square" stroke-linejoin="miter" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"></path>
                  </svg>
                  Copy Roster Link
                </button>
              </div>
            </div>
          </div>

          {/* Bottom Roll */}
          <div class="absolute -bottom-5 left-0 right-0 h-10 bg-gradient-to-t from-[#c8a98a] via-[#af8d6b] to-[#917152] border-[3px] border-[#2c1e16] z-20 flex items-center justify-between shadow-[0_10px_10px_rgba(0,0,0,0.3)]">
            {/* Left Spindle */}
            <div class="absolute -left-[20px] flex items-center z-10">
              <div class="w-[8px] h-[12px] bg-[#5c4033] border-y-[3px] border-l-[3px] border-[#2c1e16] rounded-l-[2px]"></div>
              <div class="w-[12px] h-[24px] bg-[#75513f] border-[3px] border-[#2c1e16]"></div>
            </div>
            {/* Right Spindle */}
            <div class="absolute -right-[20px] flex items-center z-10">
              <div class="w-[12px] h-[24px] bg-[#75513f] border-[3px] border-[#2c1e16]"></div>
              <div class="w-[8px] h-[12px] bg-[#5c4033] border-y-[3px] border-r-[3px] border-[#2c1e16] rounded-r-[2px]"></div>
            </div>
            {/* Roll details */}
            <div class="w-full h-full flex flex-col justify-evenly py-[6px] opacity-40">
              <div class="w-full h-[3px] bg-[#2c1e16]"></div>
              <div class="w-full h-[3px] bg-[#2c1e16]"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
