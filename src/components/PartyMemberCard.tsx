import type { PartyMember } from '../core/types';

interface Props {
  member: PartyMember;
  onRemove: (id: string) => void;
}

export function PartyMemberCard({ member, onRemove }: Props) {
  return (
    <div class="p-6 border border-tavern-800 rounded-lg bg-slate-900 shadow-lg relative">
      <button
        onClick={() => onRemove(member.id)}
        class="absolute top-4 right-4 text-slate-500 hover:text-crimson transition-colors"
        aria-label={`Remove ${member.name}`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
      <div class="mb-4">
        <h3 class="text-xl font-bold text-parchment">{member.name}</h3>
        <p class="text-xs text-gold-500 uppercase tracking-wider">
          {member.agentClass}
        </p>
      </div>
      <div class="text-sm text-slate-300 mb-4 italic">
        "{member.classFantasy}"
      </div>

      <div class="space-y-4">
        <div>
          <h4 class="text-sm font-semibold text-slate-100 mb-1">
            Responsibilities
          </h4>
          <ul class="list-disc pl-5 text-xs text-slate-400 space-y-1">
            {member.responsibilities.map((r, i) => (
              <li key={i}>
                <span class="font-medium text-slate-300">{r.name}:</span>{' '}
                {r.description}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
