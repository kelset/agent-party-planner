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
    ribbon: 'bg-[#8b5cf6]', // Purple
    ribbonL: 'border-r-[#8b5cf6]',
    ribbonR: 'border-l-[#8b5cf6]',
  },
  Warrior: {
    ribbon: 'bg-crimson',
    ribbonL: 'border-r-crimson',
    ribbonR: 'border-l-crimson',
  },
  Warlock: {
    ribbon: 'bg-[#6b21a8]', // Darker purple
    ribbonL: 'border-r-[#6b21a8]',
    ribbonR: 'border-l-[#6b21a8]',
  },
  Healer: {
    ribbon: 'bg-[#38bdf8]', // Cyan/Cleric blue
    ribbonL: 'border-r-[#38bdf8]',
    ribbonR: 'border-l-[#38bdf8]',
  },
  default: {
    ribbon: 'bg-parchment-aged',
    ribbonL: 'border-r-parchment-aged',
    ribbonR: 'border-l-parchment-aged',
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
      <div class="rounded-sm shadow-[6px_6px_0_var(--color-ink-deep)] relative flex-1 flex flex-col bg-parchment border-[3px] border-ink-deep overflow-visible">
        {/* Top Right Edit Button (The Triple Dot) */}
        <button
          onClick={() => onEdit(member.id)}
          class="absolute -top-4 -right-4 w-10 h-10 rounded-full border-[3px] border-ink-deep shadow-[2px_2px_0_var(--color-ink-deep)] flex items-center justify-center font-black text-xl z-40 bg-parchment-base text-ink-deep hover:bg-parchment-light hover:scale-110 active:translate-y-[2px] active:translate-x-[2px] active:shadow-[0_0_0_var(--color-ink-deep)] transition-all opacity-0 group-hover:opacity-100"
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

        {/* Inner Content Wrapper */}
        <div class="flex-1 flex flex-col relative border-2 border-ink-deep/10 m-1">
          {/* Image Area */}
          <div class="h-44 bg-parchment-dark relative flex items-center justify-center border-b-[3px] border-ink-deep shadow-[inset_0_-10px_20px_rgba(0,0,0,0.3)] overflow-hidden group/image"
               style={{
                 backgroundImage: `linear-gradient(to right, rgba(44, 30, 22, 0.1) 2px, transparent 2px), linear-gradient(to bottom, rgba(44, 30, 22, 0.1) 2px, transparent 2px)`,
                 backgroundSize: '20px 20px'
               }}
          >
            <span class="text-ink-deep font-black uppercase tracking-widest text-lg z-0 opacity-30 absolute font-mono">
              Portrait
            </span>
            <img
              src={`/images/roles/${member.agentClass.toLowerCase()}.png`}
              alt={member.agentClass}
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none';
              }}
              class="absolute inset-0 w-full h-full object-cover opacity-90 group-hover/image:opacity-100 group-hover/image:scale-105 transition-all duration-500 z-10 rendering-pixelated"
              style={{ imageRendering: 'pixelated' }}
            />
            <div class="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-transparent to-ink-deep pointer-events-none z-20"></div>

            {/* Responsibilities Count (Internal) */}
            <div
              class="absolute top-2 left-2 w-8 h-8 rounded-sm border-[3px] border-ink-deep shadow-[2px_2px_0_rgba(0,0,0,0.5)] flex items-center justify-center font-black text-sm z-20 bg-parchment-light text-ink-deep opacity-90 hover:opacity-100 transition-opacity cursor-default"
              title={`${member.responsibilities.length} Responsibilities`}
            >
              {member.responsibilities.length}
            </div>
          </div>

          {/* Name Ribbon */}
          <div class="relative flex justify-center -mt-5 mb-2 z-20 drop-shadow-[0_4px_0_rgba(44,30,22,0.8)]">
            <div
              class={`relative flex items-center justify-center h-10 px-8 border-[3px] border-ink-deep text-center ${theme.ribbon} min-w-[80%]`}
            >
              {/* Ribbon Ends */}
              <div
                class={`absolute -top-[3px] -left-[20px] w-0 h-0 border-y-[18px] border-y-transparent border-r-[20px] border-r-ink-deep`}
              ></div>
              <div
                class={`absolute top-[0px] -left-[16px] w-0 h-0 border-y-[15px] border-y-transparent border-r-[16px] ${theme.ribbonL}`}
              ></div>
              <div
                class={`absolute -top-[3px] -right-[20px] w-0 h-0 border-y-[18px] border-y-transparent border-l-[20px] border-l-ink-deep`}
              ></div>
              <div
                class={`absolute top-[0px] -right-[16px] w-0 h-0 border-y-[15px] border-y-transparent border-l-[16px] ${theme.ribbonR}`}
              ></div>

              <h3 class="text-lg font-black text-parchment-light uppercase tracking-widest drop-shadow-[1px_1px_0_var(--color-ink-deep)] relative z-10 truncate leading-none mt-1 font-mono">
                {member.name}
              </h3>
            </div>
          </div>

          {/* Content Area */}
          <div class="p-4 pt-3 flex-1 flex flex-col gap-4">
            {/* Class Fantasy */}
            <div
              class={`text-sm text-center italic font-bold leading-tight text-ink-faded`}
            >
              "{member.classFantasy}"
            </div>

            <div class="w-full h-[3px] bg-ink-deep/20 my-1"></div>

            {/* Responsibilities (Pills) */}
            <div class="flex flex-wrap justify-center gap-2 mt-auto pb-1">
              {member.responsibilities.map((r, i) => {
                const isLeader = r.name === 'Party Leader';
                return (
                  <div
                    key={i}
                    class={`relative border-[2px] rounded-sm px-2 py-1 flex items-center justify-center group/pill cursor-help transition-transform hover:-translate-y-0.5 shadow-[2px_2px_0_var(--color-ink-deep)] ${
                      isLeader
                        ? 'bg-gold-400 border-ink-deep'
                        : 'bg-parchment-base border-ink-deep'
                    }`}
                    title={r.description}
                  >
                    {isLeader && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-3 w-3 text-ink-deep mr-1 -ml-0.5 mt-0.5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    )}
                    <span
                      class={`text-[10px] font-black tracking-widest uppercase text-center leading-none mt-0.5 text-ink-deep`}
                    >
                      {r.name}
                    </span>
                    <button
                      class="absolute -top-2.5 -right-2.5 w-5 h-5 rounded-sm bg-parchment-light border-2 border-ink-deep text-ink-deep hover:text-white hover:bg-crimson flex items-center justify-center opacity-0 group-hover/pill:opacity-100 transition-all text-xs z-10 shadow-[2px_2px_0_var(--color-ink-deep)]"
                      aria-label={`Remove ${r.name}`}
                    >
                      <span class="-mt-0.5 font-black leading-none text-sm">×</span>
                    </button>
                  </div>
                );
              })}
              <button
                onClick={() => onEdit(member.id)}
                disabled={!hasAvailableResponsibilities}
                class={`transition-all border-2 border-dashed rounded-sm px-2 py-1 text-[10px] font-black tracking-widest uppercase flex items-center justify-center gap-1.5 ${
                  hasAvailableResponsibilities
                    ? 'bg-parchment/50 hover:bg-parchment-base text-ink-faded hover:text-ink-deep border-ink-deep/50 hover:border-ink-deep cursor-pointer'
                    : 'bg-parchment-dark/30 text-ink-light border-ink-deep/20 cursor-not-allowed'
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
