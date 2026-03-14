import type { ComponentChildren } from 'preact';

export interface LorenzoCommentProps {
  children: ComponentChildren;
  class?: string;
}

export function LorenzoComment({
  children,
  class: className = '',
}: LorenzoCommentProps) {
  return (
    <div class={`relative w-full max-w-3xl mx-auto ${className}`}>
      <div class="text-ink-deep font-medium italic text-sm md:text-base leading-relaxed bg-parchment/50 p-4 border-2 border-dashed border-ink-deep/30 rounded-sm w-full text-center m-0">
        {children}
      </div>
      <a
        href="https://kelset.dev"
        target="_blank"
        rel="noopener noreferrer"
        class="absolute -bottom-4 -right-4 w-11 h-11 md:w-14 md:h-14 flex items-center justify-center drop-shadow-sm transition-transform hover:scale-110 hover:-translate-y-1 z-10"
        title="Say hi to Lorenzo!"
      >
        <img
          src="/images/lorenzo-avatar.png"
          alt="Lorenzo"
          width={56}
          height={56}
          loading="lazy"
          class="w-full h-full object-contain mix-blend-multiply opacity-90"
          style={{ imageRendering: 'pixelated' }}
        />
      </a>
    </div>
  );
}
