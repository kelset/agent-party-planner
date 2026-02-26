import type { PartyMember } from '../core/types';

interface Props {
  member: PartyMember;
  onEdit: (id: string) => void;
  hasAvailableResponsibilities: boolean;
}

const colorMap: Record<
  string,
  { ribbon: string; ribbonL: string; ribbonR: string }
> = {
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

export function PartyMemberCard({
  member,
  onEdit,
  hasAvailableResponsibilities,
}: Props) {
  const theme = colorMap[member.agentClass] || colorMap.default;

  return (
    <div class="relative pt-3 pb-2 group transition-transform duration-300 hover:-translate-y-2 w-full max-w-[340px] mx-auto flex flex-col">
      {/* Main Card Body (The Frame) */}
      <div class="p-[6px] rounded-xl shadow-2xl relative flex-1 flex flex-col bg-slate-800 border-2 border-slate-950">
        {/* Top Right Edit Button (The Triple Dot) */}
        <button
          onClick={() => onEdit(member.id)}
          class="absolute -top-5 -right-5 w-10 h-10 rounded-full border-[3px] border-slate-900 shadow-xl flex items-center justify-center font-black text-xl z-40 bg-slate-800 text-slate-400 hover:text-white hover:bg-tavern-700 hover:border-gold-600 transition-all opacity-0 group-hover:opacity-100"
          aria-label={`Edit ${member.name}`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0-6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 12c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
          </svg>
        </button>

        {/* Inner Dark Background */}
        <div class="flex-1 rounded-lg flex flex-col relative border border-slate-900 bg-slate-950">
          {/* Image Area */}
          <div class="h-44 bg-slate-900 relative flex items-center justify-center border-b-2 border-slate-900 shadow-[inset_0_-10px_20px_rgba(0,0,0,0.5)] rounded-t-lg overflow-hidden group/image">
            <span class="text-slate-700 font-black uppercase tracking-widest text-lg z-0 opacity-50 absolute">
              Portrait
            </span>
            <img
              src={`/images/roles/${member.agentClass.toLowerCase()}.png`}
              alt={member.agentClass}
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none';
              }}
              class="absolute inset-0 w-full h-full object-cover opacity-90 group-hover/image:opacity-100 transition-opacity duration-500 z-10"
            />
            <div class="absolute inset-0 opacity-40 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-transparent to-slate-950 pointer-events-none z-20 rounded-t-lg"></div>

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
              {member.responsibilities.map((r, i) => {
                const isLeader = r.name === 'Party Leader';
                return (
                  <div
                    key={i}
                    class={`relative border rounded-md shadow-inner px-3 py-1.5 flex items-center justify-center group/pill cursor-help transition-colors ${
                      isLeader
                        ? 'bg-amber-900/30 border-amber-600/50 hover:border-amber-400'
                        : 'bg-slate-900 border-slate-700 hover:border-slate-500'
                    }`}
                    title={r.description}
                  >
                    {isLeader && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-3 w-3 text-amber-500 mr-1.5 -ml-1 mt-0.5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    )}
                    <span
                      class={`text-[10px] font-extrabold tracking-widest uppercase text-center leading-none mt-0.5 ${isLeader ? 'text-amber-400' : 'text-slate-300'}`}
                    >
                      {r.name}
                    </span>
                    <button
                      class="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-slate-800 border border-slate-600 text-slate-400 hover:text-white hover:bg-crimson hover:border-crimson flex items-center justify-center opacity-0 group-hover/pill:opacity-100 transition-all text-xs z-10 shadow-lg"
                      aria-label={`Remove ${r.name}`}
                    >
                      <span class="-mt-0.5 leading-none">×</span>
                    </button>
                  </div>
                );
              })}
              <button
                onClick={() => onEdit(member.id)}
                disabled={!hasAvailableResponsibilities}
                class={`transition-colors border border-dashed rounded-md px-3 py-1.5 text-[10px] font-extrabold tracking-widest uppercase flex items-center justify-center gap-1.5 ${
                  hasAvailableResponsibilities
                    ? 'bg-slate-800/50 hover:bg-slate-700 text-slate-400 hover:text-white border-slate-600 cursor-pointer'
                    : 'bg-slate-900 text-slate-600 border-slate-800 cursor-not-allowed'
                }`}
                title={
                  hasAvailableResponsibilities
                    ? 'Add more responsibilities'
                    : 'All responsibilities are assigned'
                }
              >
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
