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
import { ResponsibilitiesCatalog } from './ResponsibilitiesCatalog';
import { ExportScroll } from './ExportScroll';
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
      <div class="border-b-[3px] border-ink-deep/30 pb-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <h1 class="text-4xl md:text-6xl font-black uppercase tracking-widest text-parchment-light mb-4 drop-shadow-[4px_4px_0_var(--color-ink-deep)] font-mono">
            Assemble Your Party
          </h1>
          <p class="text-parchment-dark font-bold max-w-2xl text-lg">
            Configure your active roster by editing roles, defining relationships,
            and removing agents you don't need.
          </p>
        </div>
      </div>

      {/* War Room Callout */}
      <div class="p-6 bg-parchment-aged border-[3px] border-ink-deep shadow-[6px_6px_0_var(--color-ink-deep)] rounded-sm flex flex-col sm:flex-row gap-6 items-start relative overflow-hidden">
        <div class="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'linear-gradient(to right, #2c1e16 1px, transparent 1px), linear-gradient(to bottom, #2c1e16 1px, transparent 1px)', backgroundSize: '16px 16px' }}></div>
        <div class="w-16 h-16 rounded-sm bg-parchment-base border-[3px] border-ink-deep flex items-center justify-center shrink-0 shadow-[2px_2px_0_var(--color-ink-deep)] z-10">
          <span class="text-3xl drop-shadow-sm">🏰</span>
        </div>
        <div class="z-10">
          <h3 class="text-base font-black text-ink-deep uppercase tracking-widest mb-2 font-mono">
            The War Room is Ready
          </h3>
          <p class="text-sm font-medium text-ink-deep leading-relaxed">
            Your overarching meta-orchestration is overseen by a fixed, highly-opinionated <strong>War Room</strong> consisting of the <strong class="text-crimson">Game Creator</strong>, the <strong class="text-crimson">Master of Spies</strong>, and the <strong class="text-crimson">Bard</strong>. This meta-layer provides strategic planning, performance evaluation, and engaging recaps, leaving you to focus entirely on customizing the execution Party below.
          </p>
        </div>
      </div>

      {/* Roster Grid */}
      <div>
        <div class="mb-8 flex justify-between items-end border-b-[3px] border-ink-deep/20 pb-4">
          <h2 class="text-2xl font-black text-parchment-light uppercase tracking-widest drop-shadow-[2px_2px_0_var(--color-ink-deep)] font-mono">The Roster</h2>
          <div class="text-sm font-bold text-ink-faded bg-parchment-aged px-3 py-1 border-[3px] border-ink-deep shadow-[4px_4px_0_var(--color-ink-deep)] rounded-sm">
            Members: <span class="text-ink-deep font-black">{config.party.length}</span> / min {config.constraints.minPartyMembers}
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
            class="border-[3px] border-dashed border-ink-deep/50 rounded-sm bg-parchment-dark/10 hover:bg-parchment-dark/30 hover:border-ink-deep hover:-translate-y-2 transition-all duration-300 flex flex-col items-center justify-center min-h-[360px] h-full cursor-pointer group shadow-[inset_0_0_20px_rgba(44,30,22,0.1)] p-6"
          >
            <div class="w-16 h-16 rounded-sm bg-parchment-base border-[3px] border-ink-deep/50 flex items-center justify-center group-hover:bg-gold-400 group-hover:border-ink-deep transition-colors mb-4 shadow-[2px_2px_0_rgba(44,30,22,0.2)] group-hover:shadow-[4px_4px_0_var(--color-ink-deep)]">
              <span class="text-3xl font-black text-ink-deep/50 group-hover:text-ink-deep transition-colors">
                +
              </span>
            </div>
            <span class="text-ink-deep/60 font-black uppercase tracking-widest text-sm group-hover:text-ink-deep transition-colors font-mono">
              Recruit Member
            </span>
          </button>
        </div>

        {config.party.length < config.constraints.minPartyMembers && (
          <div class="mt-8 p-4 bg-crimson border-[3px] border-ink-deep rounded-sm text-parchment-light text-sm font-black uppercase tracking-widest flex items-center gap-3 shadow-[4px_4px_0_var(--color-ink-deep)]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6 stroke-[3px]"
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
            {config.constraints.minPartyMembers} members to proceed.
          </div>
        )}
      </div>

      {/* Responsibilities Catalog */}
      <ResponsibilitiesCatalog
        isCatalogOpen={isCatalogOpen}
        setIsCatalogOpen={setIsCatalogOpen}
        newDuty={newDuty}
        setNewDuty={setNewDuty}
        handleAddDuty={handleAddDuty}
        allResponsibilities={allResponsibilities}
      />

      {/* Export Action Scroll */}
      <ExportScroll
        platform={platform}
        setPlatform={setPlatform}
        isExporting={isExporting}
        onExport={handleExport}
        onShare={handleShare}
      />
    </section>
  );
}
