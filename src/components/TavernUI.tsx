import { useState } from 'preact/hooks';
import type { OrchestrationConfig } from '../core/types';
import { defaultPartyPreset } from '../core/presets/defaultParty';
import { PartyMemberCard } from './PartyMemberCard';

export function TavernUI() {
  const [config, setConfig] = useState<OrchestrationConfig>(defaultPartyPreset);

  const handleRemoveMember = (id: string) => {
    setConfig((prev) => ({
      ...prev,
      party: prev.party.filter((m) => m.id !== id),
    }));
  };

  return (
    <section id="the-party" class="py-12">
      <div class="mb-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-tavern-800 pb-8">
        <div>
          <h1 class="text-4xl md:text-5xl font-extrabold text-parchment italic mb-4">
            Assemble Your Party
          </h1>
          <p class="text-slate-400 max-w-2xl">
            Configure your active roster by editing roles, defining
            relationships, and removing agents you don't need. Current quest:{' '}
            <span class="text-gold-400 font-semibold">{config.questName}</span>
          </p>
        </div>

        <div class="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
          <div class="relative w-full sm:w-auto">
            <select class="appearance-none w-full sm:w-auto bg-slate-900 border border-tavern-800 text-slate-300 py-3 pl-4 pr-10 rounded-lg focus:outline-none focus:border-gold-600/50 cursor-pointer text-sm font-medium">
              <option value="claude">Claude (Anthropic)</option>
              <option value="gemini">Gemini (Google)</option>
              <option value="openai">ChatGPT (OpenAI)</option>
            </select>
            <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-500">
              <svg
                class="w-4 h-4"
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
          <button class="dnd-button-primary uppercase tracking-widest text-sm w-full sm:w-auto">
            Generate My Party
          </button>
        </div>
      </div>

      <div class="mb-6 flex justify-between items-end">
        <h2 class="text-xl font-bold text-parchment">The Roster</h2>
        <div class="text-sm text-slate-500">
          Members: <span class="text-gold-400">{config.party.length}</span> /
          min {config.constraints.minPartyMembers}
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {config.party.map((member) => (
          <PartyMemberCard
            key={member.id}
            member={member}
            onRemove={handleRemoveMember}
          />
        ))}
      </div>

      {config.party.length < config.constraints.minPartyMembers && (
        <div class="mt-8 p-4 bg-crimson/10 border border-crimson/20 rounded-lg text-crimson text-sm">
          Warning: Your party must have at least{' '}
          {config.constraints.minPartyMembers} members to proceed on this quest.
        </div>
      )}
    </section>
  );
}
