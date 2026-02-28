import { useState } from 'preact/hooks';
import type { Responsibility } from '../core/types';

export interface ResponsibilitiesCatalogProps {
  isCatalogOpen: boolean;
  setIsCatalogOpen: (open: boolean) => void;
  newDuty: { name: string; description: string };
  setNewDuty: (duty: { name: string; description: string }) => void;
  handleAddDuty: () => void;
  allResponsibilities: Responsibility[];
}

export function ResponsibilitiesCatalog({
  isCatalogOpen,
  setIsCatalogOpen,
  newDuty,
  setNewDuty,
  handleAddDuty,
  allResponsibilities
}: ResponsibilitiesCatalogProps) {
  return (
    <div class="bg-tavern-900 border-2 border-ink-deep rounded shadow-lg">
      <button
        onClick={() => setIsCatalogOpen(!isCatalogOpen)}
        class="w-full px-6 py-4 flex justify-between items-center bg-tavern-800/30 hover:bg-tavern-800/50 transition-colors cursor-pointer"
      >
        <div class="flex items-center gap-3">
          <span class="text-gold-400 text-xl">📜</span>
          <h3 class="text-lg font-bold text-parchment tracking-wide">
            Responsibilities Catalog
          </h3>
        </div>
        <span
          class="text-parchment-dark transform transition-transform duration-200"
          style={{ transform: isCatalogOpen ? 'rotate(180deg)' : 'none' }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
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
        <div class="p-6 border-t-2 border-ink-deep bg-tavern-900/50 space-y-8">
          {/* Create New Duty Form */}
          <div class="bg-tavern-950/50 p-6 rounded border-2 border-dashed border-ink-deep">
            <h4 class="text-[10px] font-black uppercase tracking-widest text-gold-500 mb-4">
              Define a New Duty
            </h4>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
              <div class="md:col-span-1">
                <label class="block text-[10px] text-parchment-dark mb-1 ml-1 font-bold">
                  Duty Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Code Archeology"
                  value={newDuty.name}
                  onInput={(e) =>
                    setNewDuty({
                      ...newDuty,
                      name: (e.target as HTMLInputElement).value,
                    })
                  }
                  class="w-full bg-tavern-900 border-2 border-ink-deep rounded px-4 py-2 text-parchment text-sm focus:outline-none focus:border-gold-600/50 transition-colors shadow-inner"
                />
              </div>
              <div class="md:col-span-1">
                <label class="block text-[10px] text-parchment-dark mb-1 ml-1 font-bold">
                  Description
                </label>
                <input
                  type="text"
                  placeholder="e.g. Scans legacy logs for patterns"
                  value={newDuty.description}
                  onInput={(e) =>
                    setNewDuty({
                      ...newDuty,
                      description: (e.target as HTMLInputElement).value,
                    })
                  }
                  class="w-full bg-tavern-900 border-2 border-ink-deep rounded px-4 py-2 text-parchment text-sm focus:outline-none focus:border-gold-600/50 transition-colors shadow-inner"
                />
              </div>
              <button
                onClick={handleAddDuty}
                disabled={!newDuty.name || !newDuty.description}
                class="h-[42px] bg-gold-600 hover:bg-gold-400 disabled:opacity-30 disabled:grayscale text-ink-deep font-black uppercase tracking-widest text-[10px] rounded shadow-[2px_2px_0_var(--color-ink-deep)] transition-all active:translate-y-[2px] active:translate-x-[2px] active:shadow-[0_0_0_var(--color-ink-deep)] border-2 border-ink-deep"
              >
                Add to Catalog
              </button>
            </div>
          </div>

          {/* List of Duties */}
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {allResponsibilities.map((r) => (
              <div
                key={r.name}
                class="bg-tavern-800 p-4 rounded border-2 border-ink-deep shadow-[2px_2px_0_rgba(0,0,0,0.3)]"
              >
                <h4 class="text-sm font-bold text-gold-400 mb-2 tracking-wide">
                  {r.name}
                </h4>
                <p class="text-xs text-parchment-dark leading-relaxed">
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
