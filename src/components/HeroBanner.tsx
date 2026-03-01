import { h } from 'preact';

export function HeroBanner() {
  return (
    <div 
      class="flex justify-center mb-10 mt-4 z-10 relative overflow-visible"
      style={{ width: '100vw', marginLeft: 'calc(-50vw + 50%)', marginRight: 'calc(-50vw + 50%)' }}
    >
      <div class="relative w-full flex items-center justify-center drop-shadow-[0_15px_15px_rgba(0,0,0,0.5)]">
        
        {/* Left Tail */}
        <div class="absolute top-6 bottom-[-16px] left-0 w-24 md:w-48 bg-crimson-active border-y-[4px] border-r-[4px] md:border-[4px] border-ink-deep z-0" 
             style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%, 35% 50%)' }}>
        </div>
        
        {/* Right Tail */}
        <div class="absolute top-6 bottom-[-16px] right-0 w-24 md:w-48 bg-crimson-active border-y-[4px] border-l-[4px] md:border-[4px] border-ink-deep z-0" 
             style={{ clipPath: 'polygon(0 0, 100% 0, 65% 50%, 100% 100%, 0 100%)' }}>
        </div>

        {/* Left Fold Shadow */}
        <div class="absolute bottom-[-16px] left-[3rem] md:left-[8rem] w-4 h-4 bg-ink-deep z-0" style={{ clipPath: 'polygon(100% 0, 0 0, 100% 100%)' }}></div>
        
        {/* Right Fold Shadow */}
        <div class="absolute bottom-[-16px] right-[3rem] md:right-[8rem] w-4 h-4 bg-ink-deep z-0" style={{ clipPath: 'polygon(0 0, 100% 0, 0 100%)' }}></div>

        {/* Main Banner */}
        <div class="relative z-10 w-[calc(100vw-4rem)] md:w-[calc(100vw-14rem)] bg-crimson border-[4px] border-ink-deep py-6 md:py-10 flex flex-col items-center justify-center"
             style={{
               backgroundImage: `linear-gradient(to right, rgba(44, 30, 22, 0.15) 4px, transparent 4px), linear-gradient(to bottom, rgba(44, 30, 22, 0.15) 4px, transparent 4px)`,
               backgroundSize: '32px 32px'
             }}>
             
          {/* Inner Gold Trims */}
          <div class="absolute top-1 md:top-2 left-0 right-0 h-1.5 md:h-2 bg-gold-400 border-y-[2px] border-ink-deep opacity-90"></div>
          <div class="absolute bottom-1 md:bottom-2 left-0 right-0 h-1.5 md:h-2 bg-gold-400 border-y-[2px] border-ink-deep opacity-90"></div>

          <h1 class="font-black uppercase tracking-widest text-parchment-light drop-shadow-[4px_4px_0_var(--color-ink-deep)] font-mono leading-none text-center px-4 relative z-20 whitespace-nowrap"
              style={{ fontSize: 'clamp(2rem, 7vw, 10rem)' }}>
            Assemble Your Party
          </h1>
        </div>

      </div>
    </div>
  );
}
