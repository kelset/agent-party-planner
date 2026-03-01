import { useState, useMemo, useEffect } from 'preact/hooks';
import LZString from 'lz-string';
import type {
  OrchestrationConfig,
  Responsibility,
  PartyMember,
} from '../core/types';
import { defaultPartyPreset } from '../core/presets/defaultParty';
import { defaultResponsibilities } from '../core/presets/responsibilities';
import { PartyMemberCard } from './PartyMemberCard';
import { MemberEditor } from './MemberEditor';
import { ResponsibilitiesCatalog } from './ResponsibilitiesCatalog';
import { ExportScroll } from './ExportScroll';
import { ExportSuccessModal } from './ExportSuccessModal';
import { LorenzoComment } from './LorenzoComment';
import { OrchestrationForge } from '../core/forge';
import { OrchestrationCourier } from '../core/courier';
import { sanitizeConfig } from '../core/sanitizer';
import type { Platform } from '../core/adapters';

import { HeroBanner } from './HeroBanner';

export function TavernUI() {
  const [config, setConfig] = useState<OrchestrationConfig>(defaultPartyPreset);
  const [isCatalogOpen, setIsCatalogOpen] = useState(false);
  const [editingMemberId, setEditingMemberId] = useState<string | null>(null);
  const [pendingMember, setPendingMember] = useState<PartyMember | null>(null);
  const [customResponsibilities, setCustomResponsibilities] = useState<
    Responsibility[]
  >(defaultResponsibilities);
  const [newDuty, setNewDuty] = useState({ name: '', description: '' });
  const [platform, setPlatform] = useState<Platform>('claude');
  const [isExporting, setIsExporting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const sharedConfig = urlParams.get('party');
    let loadedConfig = null;

    if (sharedConfig) {
      try {
        const decoded = LZString.decompressFromEncodedURIComponent(sharedConfig);
        if (decoded) {
          loadedConfig = sanitizeConfig(JSON.parse(decoded));
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
          loadedConfig = sanitizeConfig(JSON.parse(saved));
        } catch (e) {
          console.error('Failed to parse saved config from localStorage', e);
        }
      }
    }

    if (loadedConfig) {
      // Migrate legacy warRoom configs to throneRoom
      if ((loadedConfig as any).warRoom && !loadedConfig.throneRoom) {
        loadedConfig.throneRoom = (loadedConfig as any).warRoom;
        delete (loadedConfig as any).warRoom;
      }
      setConfig(loadedConfig);
    }

    // Load custom responsibilities from localStorage if they exist
    const savedResponsibilities = localStorage.getItem('party-planner-responsibilities');
    if (savedResponsibilities) {
      try {
        setCustomResponsibilities(sanitizeConfig(JSON.parse(savedResponsibilities)));
      } catch (e) {
        console.error('Failed to parse saved responsibilities', e);
      }
    }
    
    setIsInitialized(true);
  }, []);

  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem('party-planner-config', JSON.stringify(config));
      localStorage.setItem('party-planner-responsibilities', JSON.stringify(customResponsibilities));
    }
  }, [config, customResponsibilities, isInitialized]);

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
    if (customResponsibilities.some(r => r.name === newDuty.name)) {
      alert('A duty with this name already exists in the catalog.');
      return;
    }
    setCustomResponsibilities((prev) => [...prev, { ...newDuty, category: 'party' }]);
    setNewDuty({ name: '', description: '' });
  };

  const handleRemoveDuty = (name: string) => {
    // Check if it's currently used by any member
    const isUsed = config.party.some(m => m.responsibilities.some(r => r.name === name));
    if (isUsed) {
      alert('This responsibility is currently assigned to a party member and cannot be removed.');
      return;
    }
    setCustomResponsibilities((prev) => prev.filter(r => r.name !== name));
  };

  const handleRemoveUnassigned = () => {
    const assignedNames = new Set(
      config.party.flatMap(m => m.responsibilities.map(r => r.name))
    );
    
    setCustomResponsibilities(prev => 
      prev.filter(r => 
        // Keep if it's assigned
        assignedNames.has(r.name) || 
        // OR if it's NOT a party level one (keep meta/gm ones as they are hidden infrastructure)
        r.category !== 'party'
      )
    );
  };

  const handleResetResponsibilities = () => {
    setCustomResponsibilities((prev) => {
      const names = new Set(prev.map(r => r.name));
      // Only restore party-level defaults
      const missing = defaultResponsibilities.filter(r => r.category === 'party' && !names.has(r.name));
      return [...prev, ...missing];
    });
  };

  const handleRemoveMember = (id: string) => {
    setConfig((prev) => ({
      ...prev,
      party: prev.party.filter((m) => m.id !== id),
    }));
    setEditingMemberId(null);
    setPendingMember(null);
  };

  const handleSaveMember = (updatedMember: PartyMember) => {
    if (pendingMember) {
      setConfig((prev) => ({
        ...prev,
        party: [...prev.party, updatedMember],
      }));
      setPendingMember(null);
    } else {
      setConfig((prev) => ({
        ...prev,
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
      setShowSuccessModal(true);
    } catch (error) {
      console.error('Failed to export party:', error);
      alert('Failed to generate the party package. Please try again.');
    } finally {
      setIsExporting(false);
    }
  };

  // Derive unique responsibilities available across the current party AND the custom/default ones
  const allResponsibilities = useMemo(() => {
    const map = new Map<string, Responsibility>();
    // Start with custom/default ones as baseline
    customResponsibilities.forEach((r) => {
      if (!map.has(r.name)) map.set(r.name, r);
    });
    // Add any that are currently in the party (in case they were deleted from catalog but still on a member)
    config.party.forEach((member) => {
      member.responsibilities.forEach((r) => {
        if (!map.has(r.name)) map.set(r.name, r);
      });
    });
    return Array.from(map.values());
  }, [config.party, customResponsibilities]);

  const catalogResponsibilities = useMemo(() => {
    // Only show "party" level ones in the catalog (or ones without a category, which we'll treat as party)
    return allResponsibilities.filter(r => !r.category || r.category === 'party');
  }, [allResponsibilities]);

  const editingMember = useMemo(
    () => config.party.find((m) => m.id === editingMemberId),
    [config.party, editingMemberId]
  );

  const activeMember = editingMember || pendingMember;

  // Don't render until client-side hydration has checked storage/url to prevent flash of default
  // But to be SEO friendly we should render something. For Astro it's better to render default then swap
  // We just let it render default Party.

  return (
    <section id="the-party" class="flex flex-col gap-12">
      {/* Member Editor Modal */}
      {
        activeMember && (
          <MemberEditor
            member={activeMember}
            isNew={!!pendingMember}
            allResponsibilities={catalogResponsibilities}
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
      <div class="mb-8 flex flex-col items-center text-center gap-6 w-full">
        <div class="w-full flex flex-col items-center">
          <HeroBanner />
          <LorenzoComment>
            I had an idea for an Agent Orchestrator. I could have just made a GitHub Gist, but <br class="hidden md:block" /> instead I built a whole website for it. Play with it, assemble your roster, and have fun!<br class="hidden md:block" /> <span class="italic opacity-80 mt-2 block">(psst: did I mention it's all OSS?!? <a href="https://github.com/kelset/agent-party-planner" class="underline hover:text-crimson transition-colors" target="_blank" rel="noopener noreferrer">the repo is here</a>)</span>
          </LorenzoComment>
        </div>
      </div>

      {/* Throne Room Callout */}
      <div class="p-6 bg-parchment-base border-[3px] border-ink-deep shadow-[4px_4px_0_var(--color-ink-deep)] rounded-sm flex flex-col sm:flex-row gap-6 items-start relative overflow-hidden">
        <div class="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'linear-gradient(to right, #2c1e16 1px, transparent 1px), linear-gradient(to bottom, #2c1e16 1px, transparent 1px)', backgroundSize: '16px 16px' }}></div>
        <div class="w-16 h-16 rounded-sm bg-parchment border-[3px] border-ink-deep flex items-center justify-center shrink-0 shadow-[2px_2px_0_var(--color-ink-deep)] z-10">
          <span class="text-3xl drop-shadow-sm">🏰</span>
        </div>
        <div class="z-10">
          <h3 class="text-base font-black text-ink-deep uppercase tracking-widest mb-2 font-mono">
            The Throne Room is Ready
          </h3>
          <p class="text-sm font-bold text-ink-faded leading-relaxed">
            Your overarching meta-orchestration is overseen by a fixed, highly-opinionated <strong>Throne Room</strong> consisting of the <strong class="text-crimson">Game Creator</strong>, the <strong class="text-crimson">Master of Spies</strong>, and the <strong class="text-crimson">Bard</strong>. This meta-layer provides strategic planning, performance evaluation, and engaging recaps, leaving you to focus entirely on customizing the execution Party below.
          </p>
        </div>
      </div>

      {/* Roster Grid */}
      <div>
        <div class="mb-8 flex justify-between items-end border-b-[3px] border-ink-deep/20 pb-4 mt-8">
          <h2 class="text-2xl font-black text-parchment-light uppercase tracking-widest drop-shadow-[2px_2px_0_var(--color-ink-deep)] font-mono">The Roster</h2>
          <div class="text-sm font-bold text-ink-faded bg-parchment-base px-3 py-1 border-[3px] border-ink-deep shadow-[4px_4px_0_var(--color-ink-deep)] rounded-sm">
            Members: <span class="text-ink-deep font-black">{config.party.length}</span> / min {config.constraints.minPartyMembers}
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 items-stretch">
          {config.party.map((member, index) => {
            const hasAvailableResponsibilities = allResponsibilities.some(
              (r) => !member.responsibilities.some((res) => res.name === r.name)
            );
            return (
              <PartyMemberCard
                key={member.id}
                member={member}
                onEdit={setEditingMemberId}
                hasAvailableResponsibilities={hasAvailableResponsibilities}
                index={index}
              />
            );
          })}

          {/* Add Member Placeholder */}
          <div class="relative pt-3 pb-2 w-full max-w-[340px] mx-auto flex flex-col group transition-transform duration-300 hover:-translate-y-2 animate-card-entry opacity-0" style={{ animationFillMode: 'forwards', animationDelay: `${config.party.length * 0.1}s` }}>
            <button
              onClick={handleRecruitMember}
              class="border-[3px] border-dashed border-ink-deep/50 rounded-sm bg-parchment-dark/10 hover:bg-parchment-dark/30 hover:border-ink-deep transition-all duration-300 flex flex-col items-center justify-center min-h-[300px] flex-1 cursor-pointer shadow-[6px_6px_0_var(--color-ink-deep)] p-6"
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
        allResponsibilities={catalogResponsibilities}
        onRemoveDuty={handleRemoveDuty}
        onRemoveUnassigned={handleRemoveUnassigned}
        onReset={handleResetResponsibilities}
      />

      {/* Export Action Scroll */}
      <ExportScroll
        platform={platform}
        setPlatform={setPlatform}
        isExporting={isExporting}
        onExport={handleExport}
        onShare={handleShare}
      />

      {/* Success Modal */}
      <ExportSuccessModal 
        isOpen={showSuccessModal} 
        onClose={() => setShowSuccessModal(false)} 
      />
    </section>
  );
}
