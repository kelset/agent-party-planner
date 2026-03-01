import type { Platform } from '../core/adapters';

export interface ExportScrollProps {
  platform: Platform;
  setPlatform: (platform: Platform) => void;
  isExporting: boolean;
  onExport: () => void;
  onShare: () => void;
}

export function ExportScroll({ platform, setPlatform, isExporting, onExport, onShare }: ExportScrollProps) {
  return (
    <div class="mt-16 mb-8 relative flex justify-center px-6">
      <div class="relative w-full max-w-2xl drop-shadow-[0_15px_15px_rgba(0,0,0,0.5)]">
        {/* Top Roll */}
        <div class="absolute -top-5 left-0 right-0 h-10 bg-gradient-to-b from-parchment-aged via-parchment-dark to-[#917152] border-[3px] border-ink-deep z-20 flex items-center justify-between">
          {/* Left Spindle */}
          <div class="absolute -left-[20px] flex items-center z-10">
            <div class="w-[8px] h-[12px] bg-ink-light border-y-[3px] border-l-[3px] border-ink-deep rounded-l-[2px]"></div>
            <div class="w-[12px] h-[24px] bg-[#75513f] border-[3px] border-ink-deep"></div>
          </div>
          {/* Right Spindle */}
          <div class="absolute -right-[20px] flex items-center z-10">
            <div class="w-[12px] h-[24px] bg-[#75513f] border-[3px] border-ink-deep"></div>
            <div class="w-[8px] h-[12px] bg-ink-light border-y-[3px] border-r-[3px] border-ink-deep rounded-r-[2px]"></div>
          </div>
          {/* Roll details */}
          <div class="w-full h-full flex flex-col justify-evenly py-[6px] opacity-40">
            <div class="w-full h-[3px] bg-ink-deep"></div>
            <div class="w-full h-[3px] bg-ink-deep"></div>
          </div>
        </div>

        {/* Main Scroll Body */}
        <div 
          class="relative bg-parchment-dark border-[3px] border-t-0 border-b-0 border-ink-deep text-ink-deep pt-12 pb-16 px-6 md:px-12 z-10"
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
          <div class="text-center mb-10 relative z-10 bg-parchment-dark/90 p-4 rounded border-[3px] border-ink-deep/10">
            <h2 class="text-3xl md:text-4xl font-black uppercase tracking-widest text-ink-deep mb-3 drop-shadow-[2px_2px_0_var(--color-parchment-aged)]" style={{ fontFamily: 'monospace' }}>Seal The Pact</h2>
            <p class="text-ink-faded font-bold max-w-md mx-auto leading-relaxed">
              Your party is assembled. Choose your orchestration realm, generate the sacred texts, and share your roster.
            </p>
          </div>

          <div class="flex flex-col items-center gap-8 relative z-10 px-2">
            {/* Step 1: Model Picker */}
            <div class="w-full max-w-sm flex flex-col items-center text-center bg-parchment-aged border-[3px] border-ink-deep p-5 shadow-[6px_6px_0_var(--color-ink-deep)] transition-transform hover:-translate-y-1">
              <span class="text-xs font-black text-ink-deep uppercase tracking-widest mb-3 pb-2 w-full border-b-[3px] border-ink-deep/20">I. Select Your Realm</span>
              <div class="relative w-full mt-2">
                <select
                  value={platform}
                  onInput={(e) => setPlatform((e.target as HTMLSelectElement).value as Platform)}
                  class="appearance-none w-full bg-parchment-base border-[3px] border-ink-deep text-ink-deep py-3 pl-4 pr-10 focus:outline-none focus:bg-parchment-light cursor-pointer text-sm font-black tracking-wide transition-colors shadow-[4px_4px_0_rgba(44,30,22,0.2)]"
                >
                  <option value="claude">Claude (Anthropic)</option>
                  <option value="gemini">Gemini (Google)</option>
                  <option value="openai">ChatGPT (OpenAI)</option>
                  <option value="other">Other Agents</option>
                  <option value="markdown">Raw Markdown</option>
                </select>
                <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-ink-deep">
                  <svg class="w-6 h-6 stroke-[3px]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="square" stroke-linejoin="miter" d="M19 9l-7 7-7-7"></path></svg>
                </div>
              </div>
            </div>

            {/* Step 2: Generate */}
            <div class="w-full max-w-sm flex flex-col items-center text-center bg-parchment-aged border-[3px] border-ink-deep p-5 shadow-[6px_6px_0_var(--color-ink-deep)] transition-transform hover:-translate-y-1">
              <span class="text-xs font-black text-ink-deep uppercase tracking-widest mb-3 pb-2 w-full border-b-[3px] border-ink-deep/20">II. Forge The Documents</span>
              <button
                onClick={onExport}
                disabled={isExporting}
                class={`w-full bg-crimson hover:bg-crimson-hover text-white uppercase tracking-widest text-sm py-4 font-black transition-all active:translate-y-[4px] active:translate-x-[4px] active:shadow-[0_0_0_var(--color-ink-deep)] border-[3px] border-ink-deep shadow-[4px_4px_0_var(--color-ink-deep)] mt-2 flex items-center justify-center gap-2 ${isExporting ? 'opacity-80 cursor-wait bg-crimson-active' : ''}`}
              >
                {isExporting ? (
                  <>
                    <svg class="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Forging...
                  </>
                ) : (
                  'Generate My Party'
                )}
              </button>
            </div>

            {/* Step 3: Share */}
            <div class="w-full max-w-sm flex flex-col items-center text-center bg-parchment-aged border-[3px] border-ink-deep p-5 shadow-[6px_6px_0_var(--color-ink-deep)] transition-transform hover:-translate-y-1">
              <span class="text-xs font-black text-ink-deep uppercase tracking-widest mb-3 pb-2 w-full border-b-[3px] border-ink-deep/20">III. Spread The Word</span>
              <button
                onClick={onShare}
                class="flex items-center justify-center gap-3 w-full bg-parchment-base hover:bg-parchment-light text-ink-deep uppercase tracking-widest text-sm py-4 font-black transition-all active:translate-y-[4px] active:translate-x-[4px] active:shadow-[0_0_0_var(--color-ink-deep)] border-[3px] border-ink-deep shadow-[4px_4px_0_var(--color-ink-deep)] mt-2"
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
        <div class="absolute -bottom-5 left-0 right-0 h-10 bg-gradient-to-t from-parchment-aged via-parchment-dark to-[#917152] border-[3px] border-ink-deep z-20 flex items-center justify-between shadow-[0_10px_10px_rgba(0,0,0,0.3)]">
          {/* Left Spindle */}
          <div class="absolute -left-[20px] flex items-center z-10">
            <div class="w-[8px] h-[12px] bg-ink-light border-y-[3px] border-l-[3px] border-ink-deep rounded-l-[2px]"></div>
            <div class="w-[12px] h-[24px] bg-[#75513f] border-[3px] border-ink-deep"></div>
          </div>
          {/* Right Spindle */}
          <div class="absolute -right-[20px] flex items-center z-10">
            <div class="w-[12px] h-[24px] bg-[#75513f] border-[3px] border-ink-deep"></div>
            <div class="w-[8px] h-[12px] bg-ink-light border-y-[3px] border-r-[3px] border-ink-deep rounded-r-[2px]"></div>
          </div>
          {/* Roll details */}
          <div class="w-full h-full flex flex-col justify-evenly py-[6px] opacity-40">
            <div class="w-full h-[3px] bg-ink-deep"></div>
            <div class="w-full h-[3px] bg-ink-deep"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
