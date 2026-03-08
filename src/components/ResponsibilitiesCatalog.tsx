import type { Responsibility } from '../core/types';
import { sanitizeString } from '../core/sanitizer';

export interface ResponsibilitiesCatalogProps {
  isCatalogOpen: boolean;
  setIsCatalogOpen: (open: boolean) => void;
  newDuty: { name: string; description: string };
  setNewDuty: (duty: { name: string; description: string }) => void;
  handleAddDuty: () => void;
  allResponsibilities: Responsibility[];
  onRemoveDuty: (name: string) => void;
  onRemoveUnassigned: () => void;
  onReset: () => void;
}

export function ResponsibilitiesCatalog({
  isCatalogOpen,
  setIsCatalogOpen,
  newDuty,
  setNewDuty,
  handleAddDuty,
  allResponsibilities,
  onRemoveDuty,
  onRemoveUnassigned,
  onReset,
}: ResponsibilitiesCatalogProps) {
  return (
    <div class="bg-parchment-base border-[3px] border-ink-deep rounded-sm shadow-[6px_6px_0_var(--color-ink-deep)] relative overflow-hidden">
      <div
        class="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(to right, #2c1e16 1px, transparent 1px), linear-gradient(to bottom, #2c1e16 1px, transparent 1px)',
          backgroundSize: '16px 16px',
        }}
      ></div>
      <button
        onClick={() => setIsCatalogOpen(!isCatalogOpen)}
        class="w-full px-6 py-5 flex justify-between items-center bg-transparent hover:bg-parchment-dark/10 transition-colors cursor-pointer relative z-10"
      >
        <div class="flex items-center gap-4">
          <span class="text-3xl drop-shadow-sm">📜</span>
          <h3 class="text-lg font-black text-ink-deep tracking-widest uppercase font-mono drop-shadow-[1px_1px_0_var(--color-parchment-light)]">
            Responsibilities Catalog{' '}
            <span class="text-ink-faded text-sm">
              ({allResponsibilities.length})
            </span>
          </h3>
        </div>
        <span
          class="text-ink-deep transform transition-transform duration-200"
          style={{ transform: isCatalogOpen ? 'rotate(180deg)' : 'none' }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6 stroke-[3px]"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clip-rule="evenodd"
            />
          </svg>
        </span>
      </button>
      {isCatalogOpen && (
        <div class="p-6 border-t-[3px] border-ink-deep bg-parchment relative z-10 space-y-8">
          {/* Create New Duty Form */}
          <div class="bg-parchment-light p-6 rounded-sm border-[3px] border-dashed border-ink-deep/30 shadow-[inset_0_0_10px_rgba(44,30,22,0.05)]">
            <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <h4 class="text-xs font-black uppercase tracking-widest text-ink-deep font-mono">
                Define a New Duty
              </h4>
              <div class="flex gap-2">
                <button
                  onClick={onRemoveUnassigned}
                  class="px-3 py-1.5 bg-crimson/10 hover:bg-crimson border-[2px] border-crimson/50 hover:border-crimson text-crimson hover:text-white font-black uppercase tracking-widest text-[9px] rounded-sm transition-all active:translate-y-[2px] active:translate-x-[2px] font-mono shadow-[2px_2px_0_rgba(185,56,56,0.2)] active:shadow-none"
                >
                  Clear Unassigned
                </button>
                <button
                  onClick={onReset}
                  class="px-3 py-1.5 bg-parchment-base hover:bg-parchment border-[2px] border-ink-deep text-ink-faded hover:text-ink-deep font-black uppercase tracking-widest text-[9px] rounded-sm transition-all active:translate-y-[2px] active:translate-x-[2px] font-mono shadow-[2px_2px_0_var(--color-ink-deep)] active:shadow-none"
                >
                  Restore Defaults
                </button>
              </div>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
              <div class="md:col-span-1">
                <label class="block text-[10px] font-black uppercase tracking-widest text-ink-faded mb-2">
                  Duty Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Code Archeology"
                  value={newDuty.name}
                  onInput={(e) =>
                    setNewDuty({
                      ...newDuty,
                      name: sanitizeString(
                        (e.target as HTMLInputElement).value
                      ),
                    })
                  }
                  class="w-full bg-white border-[3px] border-ink-deep rounded-sm px-4 py-3 text-ink-deep font-bold text-sm focus:outline-none shadow-[inset_2px_2px_0_rgba(44,30,22,0.1)] transition-colors"
                />
              </div>
              <div class="md:col-span-1">
                <label class="block text-[10px] font-black uppercase tracking-widest text-ink-faded mb-2">
                  Description
                </label>
                <input
                  type="text"
                  placeholder="e.g. Scans legacy logs for patterns"
                  value={newDuty.description}
                  onInput={(e) =>
                    setNewDuty({
                      ...newDuty,
                      description: sanitizeString(
                        (e.target as HTMLInputElement).value
                      ),
                    })
                  }
                  class="w-full bg-white border-[3px] border-ink-deep rounded-sm px-4 py-3 text-ink-deep font-bold text-sm focus:outline-none shadow-[inset_2px_2px_0_rgba(44,30,22,0.1)] transition-colors"
                />
              </div>
              <button
                onClick={handleAddDuty}
                disabled={!newDuty.name || !newDuty.description}
                class="h-[48px] bg-gold-400 hover:bg-gold-500 disabled:opacity-50 disabled:grayscale text-ink-deep font-black uppercase tracking-widest text-[11px] rounded-sm shadow-[4px_4px_0_var(--color-ink-deep)] transition-all active:translate-y-[4px] active:translate-x-[4px] active:shadow-[0_0_0_var(--color-ink-deep)] border-[3px] border-ink-deep font-mono"
              >
                Add to Catalog
              </button>
            </div>
          </div>

          {/* List of Duties */}
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allResponsibilities.map((r) => (
              <div
                key={r.name}
                class="bg-parchment-base p-5 rounded-sm border-[3px] border-ink-deep shadow-[4px_4px_0_var(--color-ink-deep)] transition-transform hover:-translate-y-1 relative group"
              >
                <button
                  onClick={() => onRemoveDuty(r.name)}
                  class="absolute top-2 right-2 w-6 h-6 bg-crimson/10 hover:bg-crimson text-crimson hover:text-white border-2 border-crimson/30 hover:border-crimson rounded-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all cursor-pointer"
                  title="Remove from catalog"
                >
                  <span class="text-xs leading-none font-black">×</span>
                </button>
                <h4 class="text-sm font-black text-ink-deep mb-2 tracking-widest uppercase font-mono pr-6">
                  {r.name}
                </h4>
                <p class="text-xs text-ink-faded font-bold leading-relaxed">
                  {r.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
