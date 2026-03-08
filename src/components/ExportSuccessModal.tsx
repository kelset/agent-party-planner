import { useEffect, useState } from 'preact/hooks';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export function ExportSuccessModal({ isOpen, onClose }: Props) {
  const [isClosing, setIsClosing] = useState(false);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      onClose();
    }, 500); // match animation duration
  };

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) handleClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen]);

  if (!isOpen && !isClosing) return null;

  return (
    <div
      class={`fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8 bg-tavern-950/80 backdrop-blur-sm ${
        isClosing ? 'animate-backdrop-fade-reverse' : 'animate-backdrop-fade'
      }`}
      onClick={(e) => e.target === e.currentTarget && handleClose()}
    >
      <div
        class={`relative bg-parchment-base border-[3px] border-ink-deep rounded-sm shadow-[8px_8px_0_var(--color-ink-deep)] w-full max-w-2xl max-h-[90vh] overflow-y-auto ${
          isClosing ? 'animate-card-flip-reverse' : 'animate-card-flip'
        }`}
      >
        <div class="p-8 md:p-12 text-center flex flex-col items-center">
          <div class="w-20 h-20 bg-parchment-light border-[3px] border-ink-deep rounded-full shadow-[4px_4px_0_var(--color-ink-deep)] flex items-center justify-center mb-6">
            <span class="text-4xl drop-shadow-sm">🎉</span>
          </div>

          <h2 class="text-3xl md:text-4xl font-black uppercase tracking-widest text-ink-deep mb-4 font-mono">
            Party Assembled!
          </h2>

          <p class="text-ink-faded font-bold text-lg leading-relaxed mb-6">
            Congratulations! You've successfully forged your orchestration
            package. Your browser should now be downloading a ZIP file
            containing the characters, rulebooks, and scripts for your agents.
          </p>

          <div class="bg-parchment p-6 rounded-sm border-[3px] border-ink-deep shadow-[inset_2px_2px_0_rgba(44,30,22,0.1)] text-left w-full mb-8 space-y-4">
            <h3 class="font-black uppercase tracking-widest text-ink-deep font-mono text-sm border-b-[2px] border-ink-deep/20 pb-2">
              Next Steps
            </h3>
            <ol class="list-decimal list-inside text-ink-faded font-bold space-y-2 text-sm">
              <li>
                Extract the ZIP folder into a dedicated orchestration directory.
              </li>
              <li>
                Read the included{' '}
                <code class="bg-white px-1.5 py-0.5 rounded-sm border-[2px] border-ink-deep text-xs font-mono">
                  README.md
                </code>{' '}
                for specific startup commands.
              </li>
              <li>
                Tweak the{' '}
                <code class="bg-white px-1.5 py-0.5 rounded-sm border-[2px] border-ink-deep text-xs font-mono">
                  throne-room/
                </code>{' '}
                meta-prompts to further customize the overarching rules.
              </li>
            </ol>
          </div>

          <p class="text-ink-faded text-sm italic font-bold mb-8">
            Have fun exploring the limits of agent orchestration! If you
            encounter issues, have feedback, or want to contribute, feel free to
            open a PR or issue on GitHub.
          </p>

          <button
            onClick={handleClose}
            class="px-8 py-4 bg-crimson hover:bg-crimson-hover text-white font-black uppercase tracking-widest text-sm rounded-sm shadow-[4px_4px_0_var(--color-ink-deep)] transition-all active:translate-y-[4px] active:translate-x-[4px] active:shadow-[0_0_0_var(--color-ink-deep)] border-[3px] border-ink-deep"
          >
            Return to Tavern
          </button>
        </div>

        {/* Close Button */}
        <button
          onClick={handleClose}
          class="absolute top-4 right-4 w-10 h-10 bg-parchment border-[3px] border-ink-deep shadow-[2px_2px_0_var(--color-ink-deep)] rounded-sm flex items-center justify-center text-ink-deep hover:bg-white active:translate-y-[2px] active:translate-x-[2px] active:shadow-[0_0_0_var(--color-ink-deep)] transition-all z-50 group"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6 stroke-[3px] group-hover:scale-110 transition-transform"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="square"
              stroke-linejoin="miter"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
