import type { PartyMember } from '../core/types';

interface Props {
  member: PartyMember;
  onRemove: (id: string) => void;
}

const colorMap: Record<string, any> = {
  Ranger: {
    ribbon: 'bg-emerald-500',
    ribbonL: 'border-r-emerald-500',
    ribbonR: 'border-l-emerald-500',
  },
  Wizard: {
    ribbon: 'bg-blue-500',
    ribbonL: 'border-r-blue-500',
    ribbonR: 'border-l-blue-500',
  },
  Warrior: {
    ribbon: 'bg-red-500',
    ribbonL: 'border-r-red-500',
    ribbonR: 'border-l-red-500',
  },
  Warlock: {
    ribbon: 'bg-purple-500',
    ribbonL: 'border-r-purple-500',
    ribbonR: 'border-l-purple-500',
  },
  Healer: {
    ribbon: 'bg-amber-500',
    ribbonL: 'border-r-amber-500',
    ribbonR: 'border-l-amber-500',
  },
  default: {
    ribbon: 'bg-slate-500',
    ribbonL: 'border-r-slate-500',
    ribbonR: 'border-l-slate-500',
  },
};

export function PartyMemberCard({ member, onRemove }: Props) {
  const theme = colorMap[member.agentClass] || colorMap.default;

  return (
    <div class="relative pt-3 pb-2 group transition-transform duration-300 hover:-translate-y-2 w-full max-w-[340px] mx-auto flex flex-col">
      {/* Top Cost/Level Circle */}
      <div
        class={`absolute -top-1 -left-2 w-11 h-11 rounded-full border-[3px] border-slate-900 shadow-xl flex items-center justify-center font-black text-xl z-30 bg-slate-300 text-slate-900`}
      >
        {member.responsibilities.length}
      </div>

      {/* Main Card Body (The Frame) */}
      <div class="p-[6px] rounded-xl shadow-2xl relative flex-1 flex flex-col bg-slate-800 border-2 border-slate-950">
        {/* Top Right Remove Button */}
        <button
          onClick={() => onRemove(member.id)}
          class="absolute -top-5 -right-5 w-10 h-10 rounded-full border-[3px] border-slate-900 shadow-xl flex items-center justify-center font-black text-xl z-40 bg-slate-800 text-slate-400 hover:text-white hover:bg-crimson hover:border-crimson transition-all opacity-0 group-hover:opacity-100"
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
              stroke-width="3"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Inner Dark Background */}
        <div class="flex-1 rounded-lg flex flex-col relative border border-slate-900 bg-slate-950">
          {/* Image Area */}
          <div class="h-44 bg-slate-900 relative flex items-center justify-center border-b-2 border-slate-900 shadow-[inset_0_-10px_20px_rgba(0,0,0,0.5)] rounded-t-lg">
            <div class="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent mix-blend-overlay rounded-t-lg"></div>
            <span class="text-slate-700 font-black uppercase tracking-widest text-lg z-10 opacity-50">
              Portrait
            </span>

            {/* Responsibilities Count (Internal) */}
            <div
              class="absolute top-2 left-2 w-9 h-9 rounded-full border-2 border-slate-900 shadow-lg flex items-center justify-center font-black text-base z-20 bg-slate-300 text-slate-900 backdrop-blur-sm opacity-90 hover:opacity-100 transition-opacity cursor-default"
              title={`${member.responsibilities.length} Responsibilities`}
            >
              {member.responsibilities.length}
            </div>
          </div>

          {/* Name Ribbon */}
          <div class="relative flex justify-center -mt-5 mb-2 z-20 drop-shadow-md">
            <div
              class={`relative flex items-center justify-center h-10 px-8 border-y-2 border-slate-900 text-center ${theme.ribbon} min-w-[80%]`}
            >
              {/* Ribbon Ends */}
              <div
                class={`absolute -top-[2px] -left-[20px] w-0 h-0 border-y-[20px] border-y-transparent border-r-[20px] border-r-slate-900`}
              ></div>
              <div
                class={`absolute top-[0px] -left-[18px] w-0 h-0 border-y-[18px] border-y-transparent border-r-[18px] ${theme.ribbonL}`}
              ></div>
              <div
                class={`absolute -top-[2px] -right-[20px] w-0 h-0 border-y-[20px] border-y-transparent border-l-[20px] border-l-slate-900`}
              ></div>
              <div
                class={`absolute top-[0px] -right-[18px] w-0 h-0 border-y-[18px] border-y-transparent border-l-[18px] ${theme.ribbonR}`}
              ></div>

              <h3 class="text-lg font-black text-slate-900 uppercase tracking-widest drop-shadow-sm relative z-10 truncate leading-none mt-0.5">
                {member.name}
              </h3>
            </div>
          </div>

          {/* Content Area */}
          <div class="p-5 pt-3 flex-1 flex flex-col gap-4">
            {/* Class Fantasy */}
            <div
              class={`text-sm text-center italic font-semibold leading-tight text-slate-300`}
            >
              "{member.classFantasy}"
            </div>

            <div class="w-full h-px bg-slate-800 my-2"></div>

            {/* Responsibilities (Pills) */}
            <div class="flex flex-wrap justify-center gap-2 mt-auto pb-2">
              {member.responsibilities.map((r, i) => (
                <div
                  key={i}
                  class="relative bg-slate-900 border border-slate-700 rounded-md shadow-inner px-3 py-1.5 flex items-center justify-center group/pill cursor-help hover:border-slate-500 transition-colors"
                  title={r.description}
                >
                  <span class="text-[10px] font-extrabold tracking-widest uppercase text-slate-300 text-center leading-none mt-0.5">
                    {r.name}
                  </span>
                  <button
                    class="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-slate-800 border border-slate-600 text-slate-400 hover:text-white hover:bg-crimson hover:border-crimson flex items-center justify-center opacity-0 group-hover/pill:opacity-100 transition-all text-xs z-10 shadow-lg"
                    aria-label={`Remove ${r.name}`}
                  >
                    <span class="-mt-0.5 leading-none">×</span>
                  </button>
                </div>
              ))}
              <button class="bg-slate-800/50 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors border border-dashed border-slate-600 rounded-md px-3 py-1.5 text-[10px] font-extrabold tracking-widest uppercase flex items-center justify-center gap-1.5">
                <span class="text-xs leading-none -mt-0.5">+</span>{' '}
                <span class="leading-none mt-0.5">Add</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
