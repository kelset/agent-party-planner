import type { ComponentChildren } from 'preact';

export interface LorenzoCommentProps {
  children: ComponentChildren;
  class?: string;
}

export function LorenzoComment({ children, class: className = '' }: LorenzoCommentProps) {
  return (
    <div class={`relative w-full max-w-3xl mx-auto ${className}`}>
      <p class="text-ink-deep font-medium italic text-sm md:text-base leading-relaxed bg-parchment/50 p-4 border-2 border-dashed border-ink-deep/30 rounded-sm w-full text-center m-0">
        {children}
      </p>
      <div class="absolute -bottom-6 -right-6 w-16 h-16 md:w-20 md:h-20 flex items-center justify-center pointer-events-none drop-shadow-sm transition-transform hover:scale-110">
        <img
          src="/images/lorenzo-avatar.png"
          alt="Lorenzo"
          class="w-full h-full object-contain mix-blend-multiply opacity-90"
          style={{ imageRendering: 'pixelated' }}
        />
      </div>
    </div>
  );
}
