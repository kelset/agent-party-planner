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
      <div class="mb-8 flex justify-between items-end">
        <div>
          <h2 class="text-3xl font-bold text-parchment mb-2">The Party</h2>
          <p class="text-slate-400">
            Configure your active roster. Current quest:{' '}
            <span class="text-gold-400 font-semibold">{config.questName}</span>
          </p>
        </div>
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
