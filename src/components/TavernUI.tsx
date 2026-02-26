import { useState, useMemo } from 'preact/hooks';
import type { OrchestrationConfig, Responsibility } from '../core/types';
import { defaultPartyPreset } from '../core/presets/defaultParty';
import { PartyMemberCard } from './PartyMemberCard';
import { OrchestrationForge } from '../core/forge';
import { OrchestrationCourier } from '../core/courier';
import type { Platform } from '../core/adapters';

export function TavernUI() {
  const [config, setConfig] = useState<OrchestrationConfig>(defaultPartyPreset);
  const [isCompendiumOpen, setIsCompendiumOpen] = useState(false);
  const [platform, setPlatform] = useState<Platform>('claude');
  const [isExporting, setIsExporting] = useState(false);

  const handleRemoveMember = (id: string) => {
    setConfig((prev) => ({
      ...prev,
      party: prev.party.filter((m) => m.id !== id),
    }));
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

  // Derive unique responsibilities available across the default setup
  const allResponsibilities = useMemo(() => {
    const map = new Map<string, Responsibility>();
    config.party.forEach((member) => {
      member.responsibilities.forEach((r) => {
        if (!map.has(r.name)) map.set(r.name, r);
      });
    });
    return Array.from(map.values());
  }, [config.party]);

  return (
    <section id="the-party" class="py-12 flex flex-col gap-12">
      {/* Header */}
      <div class="border-b border-tavern-800 pb-8">
        <h1 class="text-4xl md:text-5xl font-extrabold text-parchment italic mb-4">
          Assemble Your Party
        </h1>
        <p class="text-slate-400 max-w-2xl">
          Configure your active roster by editing roles, defining relationships,
          and removing agents you don't need.
        </p>
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
          {config.party.map((member) => (
            <PartyMemberCard
              key={member.id}
              member={member}
              onRemove={handleRemoveMember}
            />
          ))}

          {/* Add Member Placeholder */}
          <div class="border-2 border-dashed border-slate-800 rounded-xl bg-slate-900/50 hover:bg-slate-800/50 transition-colors flex flex-col items-center justify-center min-h-[480px] cursor-pointer group">
            <div class="w-16 h-16 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center group-hover:bg-gold-600/20 group-hover:border-gold-600/50 transition-colors mb-4 shadow-inner">
              <span class="text-3xl text-slate-600 group-hover:text-gold-400 transition-colors">
                +
              </span>
            </div>
            <span class="text-slate-500 font-bold uppercase tracking-widest text-sm group-hover:text-gold-400 transition-colors">
              Recruit Member
            </span>
          </div>
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

      {/* Responsibilities Compendium */}
      <div class="bg-slate-900 border border-tavern-800 rounded-xl overflow-hidden shadow-lg">
        <button
          onClick={() => setIsCompendiumOpen(!isCompendiumOpen)}
          class="w-full px-6 py-4 flex justify-between items-center bg-tavern-800/30 hover:bg-tavern-800/50 transition-colors cursor-pointer"
        >
          <div class="flex items-center gap-3">
            <span class="text-gold-400 text-xl">📜</span>
            <h3 class="text-lg font-bold text-parchment tracking-wide">
              Responsibilities Compendium
            </h3>
          </div>
          <span
            class="text-slate-500 transform transition-transform duration-200"
            style={{ transform: isCompendiumOpen ? 'rotate(180deg)' : 'none' }}
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
        {isCompendiumOpen && (
          <div class="p-6 border-t border-tavern-800 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 bg-slate-900/50">
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
        )}
      </div>

      {/* Export Action Bar */}
      <div class="pt-8 border-t border-tavern-800 flex flex-col sm:flex-row items-center justify-end gap-4">
        <div class="relative w-full sm:w-64">
          <select
            value={platform}
            onInput={(e) =>
              setPlatform((e.target as HTMLSelectElement).value as Platform)
            }
            class="appearance-none w-full bg-slate-900 border-2 border-tavern-800 text-slate-200 py-4 pl-4 pr-10 rounded-lg focus:outline-none focus:border-gold-600/50 cursor-pointer text-sm font-bold tracking-wide h-[56px] shadow-inner"
          >
            <option value="claude">Claude (Anthropic)</option>
            <option value="gemini">Gemini (Google)</option>
            <option value="openai">ChatGPT (OpenAI)</option>
            <option value="other">Other Agents</option>
            <option value="markdown">Raw Markdown</option>
          </select>
          <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-400">
            <svg
              class="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 9l-7 7-7-7"
              ></path>
            </svg>
          </div>
        </div>
        <button
          onClick={handleExport}
          disabled={isExporting}
          class="dnd-button-primary uppercase tracking-widest text-sm w-full sm:w-auto px-10 h-[56px] shadow-lg shadow-gold-600/20 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isExporting ? 'Generating...' : 'Generate My Party'}
        </button>
      </div>
    </section>
  );
}
