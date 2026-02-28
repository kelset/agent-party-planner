import { useState, useEffect } from 'preact/hooks';
import type { PartyMember, Responsibility } from '../core/types';

interface Props {
  member: PartyMember;
  isNew?: boolean;
  allResponsibilities: Responsibility[];
  otherMembers: { id: string; name: string }[];
  onSave: (member: PartyMember) => void;
  onRemove: (id: string) => void;
  onClose: () => void;
}

export function MemberEditor({
  member,
  isNew,
  allResponsibilities,
  otherMembers,
  onSave,
  onRemove,
  onClose,
}: Props) {
  const [editedMember, setEditedMember] = useState<PartyMember>({ ...member });
  const [isClosing, setIsClosing] = useState(false);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(onClose, 500); // Match animation duration
  };

  const handleSave = () => {
    setIsClosing(true);
    setTimeout(() => onSave(editedMember), 500);
  };

  const handleRemove = () => {
    setIsClosing(true);
    setTimeout(() => onRemove(member.id), 500);
  };

  const handleDiscard = () => {
    setIsClosing(true);
    setTimeout(onClose, 500);
  };

  // Handle closing on Escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  const toggleResponsibility = (r: Responsibility) => {
    const hasIt = editedMember.responsibilities.some(
      (res) => res.name === r.name
    );
    setEditedMember((prev) => ({
      ...prev,
      responsibilities: hasIt
        ? prev.responsibilities.filter((res) => res.name !== r.name)
        : [...prev.responsibilities, r],
    }));
  };

  const updateRelationship = (
    targetId: string,
    type: string,
    description: string
  ) => {
    setEditedMember((prev) => {
      const existing = prev.relationships.find(
        (rel) => rel.targetId === targetId
      );
      const others = prev.relationships.filter(
        (rel) => rel.targetId !== targetId
      );

      if (!type && !description) return { ...prev, relationships: others };

      return {
        ...prev,
        relationships: [
          ...others,
          {
            targetId,
            type: type || existing?.type || 'neutral',
            description,
          },
        ],
      };
    });
  };

  // Available agent classes
  const AVAILABLE_CLASSES = [
    'Ranger',
    'Wizard',
    'Warrior',
    'Warlock',
    'Healer',
    'Bard',
    'Paladin',
    'Rogue',
  ];

  const handleCycleClass = (direction: 'prev' | 'next') => {
    const currentIndex = AVAILABLE_CLASSES.indexOf(editedMember.agentClass);
    let nextIndex;
    if (direction === 'next') {
      nextIndex = (currentIndex + 1) % AVAILABLE_CLASSES.length;
    } else {
      nextIndex = (currentIndex - 1 + AVAILABLE_CLASSES.length) % AVAILABLE_CLASSES.length;
    }
    const nextClass = AVAILABLE_CLASSES[nextIndex];

    setEditedMember((prev) => ({
      ...prev,
      agentClass: nextClass,
      // If the name is still the default "New [Class]", update it too
      name: prev.name.startsWith('New ') ? `New ${nextClass}` : prev.name
    }));
  };

  return (
    <div
      class={`fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8 bg-tavern-950/80 backdrop-blur-sm ${
        isClosing ? 'animate-backdrop-fade-reverse' : 'animate-backdrop-fade'
      }`}
      onClick={(e) => e.target === e.currentTarget && handleClose()}
    >
      <div
        class={`relative bg-parchment-base border-[3px] border-ink-deep rounded-sm shadow-[8px_8px_0_var(--color-ink-deep)] w-full max-w-5xl max-h-[90vh] overflow-hidden flex flex-col md:flex-row ${
          isClosing ? 'animate-card-flip-reverse' : 'animate-card-flip'
        }`}
      >
        {/* Left Side: Identity & Personality */}
        <div class="w-full md:w-1/3 p-6 md:p-8 border-b-[3px] md:border-b-0 md:border-r-[3px] border-ink-deep overflow-y-auto bg-parchment">
          <div class="mb-8 flex flex-col items-center gap-4 text-center">
            <div class="relative group mb-2">
              {/* Cycle Buttons */}
              <button
                onClick={() => handleCycleClass('prev')}
                class="absolute left-[-32px] top-1/2 -translate-y-1/2 w-10 h-10 bg-parchment-base border-[3px] border-ink-deep shadow-[3px_3px_0_var(--color-ink-deep)] rounded-sm flex items-center justify-center text-ink-deep hover:bg-gold-400 active:translate-y-[0.5px] active:translate-x-[0.5px] active:shadow-[2.5px_2.5px_0_var(--color-ink-deep)] transition-all z-20 cursor-pointer"
                title="Previous Class"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 stroke-[4px]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="square" stroke-linejoin="miter" d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              <div class="w-[134px] h-[134px] bg-parchment-dark border-[3px] border-ink-deep shadow-[4px_4px_0_var(--color-ink-deep)] relative overflow-hidden"
                   style={{ backgroundImage: `linear-gradient(to right, rgba(44, 30, 22, 0.1) 2px, transparent 2px), linear-gradient(to bottom, rgba(44, 30, 22, 0.1) 2px, transparent 2px)`, backgroundSize: '16px 16px' }}>
                <img
                  src={`/images/roles/${editedMember.agentClass.toLowerCase()}.png`}
                  alt={editedMember.agentClass}
                  class="w-full h-full object-cover transition-transform duration-300"
                  style={{ imageRendering: 'pixelated' }}
                />
              </div>

              <button
                onClick={() => handleCycleClass('next')}
                class="absolute right-[-32px] top-1/2 -translate-y-1/2 w-10 h-10 bg-parchment-base border-[3px] border-ink-deep shadow-[3px_3px_0_var(--color-ink-deep)] rounded-sm flex items-center justify-center text-ink-deep hover:bg-gold-400 active:translate-y-[0.5px] active:translate-x-[0.5px] active:shadow-[2.5px_2.5px_0_var(--color-ink-deep)] transition-all z-20 cursor-pointer"
                title="Next Class"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 stroke-[4px]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="square" stroke-linejoin="miter" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            <div class="w-full mt-2">
              <label class="block text-xs font-black uppercase tracking-widest text-ink-deep mb-2 font-mono drop-shadow-[1px_1px_0_var(--color-parchment-aged)]">
                Agent Name
              </label>
              <input
                type="text"
                value={editedMember.name}
                onInput={(e) =>
                  setEditedMember({
                    ...editedMember,
                    name: (e.target as HTMLInputElement).value,
                  })
                }
                class="w-full bg-parchment-light border-[3px] border-ink-deep rounded-sm px-4 py-2 text-ink-deep font-black focus:outline-none focus:bg-white transition-colors text-center shadow-[inset_2px_2px_0_rgba(44,30,22,0.1)]"
              />
              <div class="mt-2 inline-block px-3 py-1 bg-gold-400 border-2 border-ink-deep text-[10px] font-black uppercase tracking-tighter font-mono shadow-[1px_1px_0_var(--color-ink-deep)]">
                Class: {editedMember.agentClass}
              </div>
            </div>
          </div>

          <div class="space-y-6">
            <div>
              <label class="block text-xs font-black uppercase tracking-widest text-ink-deep mb-2 font-mono">
                Class Fantasy
              </label>
              <textarea
                value={editedMember.classFantasy}
                onInput={(e) =>
                  setEditedMember({
                    ...editedMember,
                    classFantasy: (e.target as HTMLTextAreaElement).value,
                  })
                }
                rows={3}
                class="w-full bg-parchment-light border-[3px] border-ink-deep rounded-sm px-4 py-2 text-ink-faded font-bold text-sm focus:outline-none focus:bg-white transition-colors resize-none shadow-[inset_2px_2px_0_rgba(44,30,22,0.1)]"
              />
            </div>

            <div>
              <label class="block text-xs font-black uppercase tracking-widest text-ink-deep mb-2 font-mono">
                Personality Traits
              </label>
              <textarea
                value={editedMember.personality}
                onInput={(e) =>
                  setEditedMember({
                    ...editedMember,
                    personality: (e.target as HTMLTextAreaElement).value,
                  })
                }
                rows={10}
                class="w-full bg-parchment-light border-[3px] border-ink-deep rounded-sm px-4 py-2 text-ink-faded font-bold text-sm focus:outline-none focus:bg-white transition-colors resize-none leading-relaxed shadow-[inset_2px_2px_0_rgba(44,30,22,0.1)]"
              />
            </div>
          </div>
        </div>

        {/* Middle: Responsibilities */}
        <div class="w-full md:w-1/3 p-6 md:p-8 border-b-[3px] md:border-b-0 md:border-r-[3px] border-ink-deep flex flex-col overflow-hidden bg-parchment-aged relative">
          <div class="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'linear-gradient(to right, #2c1e16 1px, transparent 1px), linear-gradient(to bottom, #2c1e16 1px, transparent 1px)', backgroundSize: '16px 16px' }}></div>
          <h3 class="text-xs font-black uppercase tracking-widest text-ink-deep mb-4 font-mono z-10 drop-shadow-[1px_1px_0_var(--color-parchment-dark)]">
            Responsibilities
          </h3>
          <div class="flex-1 overflow-y-auto pr-2 space-y-3 z-10">
            {allResponsibilities.map((r) => {
              const isAssigned = editedMember.responsibilities.some(
                (res) => res.name === r.name
              );
              return (
                <button
                  key={r.name}
                  onClick={() => toggleResponsibility(r)}
                  class={`p-3 rounded-sm border-[3px] border-ink-deep text-left transition-transform hover:-translate-y-1 w-full group ${
                    isAssigned
                      ? 'bg-gold-400 text-ink-deep shadow-[2px_2px_0_var(--color-ink-deep)]'
                      : 'bg-parchment-base text-ink-faded shadow-[2px_2px_0_rgba(44,30,22,0.3)] hover:shadow-[2px_2px_0_var(--color-ink-deep)] hover:text-ink-deep'
                  }`}
                >
                  <div class="flex justify-between items-center mb-1">
                    <span class="font-black text-xs uppercase tracking-wider font-mono">
                      {r.name}
                    </span>
                    {isAssigned && <span class="text-ink-deep text-lg leading-none font-black">✓</span>}
                  </div>
                  <p class={`text-[10px] leading-tight font-bold ${isAssigned ? 'opacity-90' : 'opacity-70'}`}>
                    {r.description}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Side: Relationships & Actions */}
        <div class="w-full md:w-1/3 p-6 md:p-8 flex flex-col overflow-hidden bg-parchment-dark">
          <h3 class="text-xs font-black uppercase tracking-widest text-ink-deep mb-4 font-mono drop-shadow-[1px_1px_0_var(--color-parchment-aged)]">
            Relationships
          </h3>
          <div class="flex-1 overflow-y-auto pr-2 space-y-4">
            {otherMembers.length === 0 && (
              <p class="text-xs text-ink-deep font-bold italic bg-parchment/30 p-3 border-2 border-dashed border-ink-deep/30">
                No other party members to relate to.
              </p>
            )}
            {otherMembers.map((other) => {
              const rel = editedMember.relationships.find(
                (r) => r.targetId === other.id
              );
              return (
                <div
                  key={other.id}
                  class="p-3 rounded-sm bg-parchment border-[3px] border-ink-deep shadow-[2px_2px_0_var(--color-ink-deep)]"
                >
                  <div class="flex flex-col xl:flex-row justify-between xl:items-center mb-2 gap-2">
                    <span class="text-xs font-black text-ink-deep uppercase tracking-wider font-mono">
                      {other.name}
                    </span>
                    <select
                      value={rel?.type || ''}
                      onInput={(e) =>
                        updateRelationship(
                          other.id,
                          (e.target as HTMLSelectElement).value,
                          rel?.description || ''
                        )
                      }
                      class="bg-parchment-light border-2 border-ink-deep rounded-sm text-[10px] px-1 py-1 text-ink-deep font-bold focus:outline-none shadow-[inset_1px_1px_0_rgba(44,30,22,0.1)] uppercase cursor-pointer"
                    >
                      <option value="">No Bond</option>
                      <option value="cohesion">Cohesion</option>
                      <option value="tension">Tension</option>
                      <option value="neutral">Neutral</option>
                    </select>
                  </div>
                  <textarea
                    placeholder="Describe their dynamic..."
                    value={rel?.description || ''}
                    onInput={(e) =>
                      updateRelationship(
                        other.id,
                        rel?.type || 'neutral',
                        (e.target as HTMLTextAreaElement).value
                      )
                    }
                    rows={2}
                    class="w-full bg-parchment-light border-2 border-ink-deep rounded-sm px-2 py-1 text-[10px] text-ink-faded font-bold focus:outline-none focus:bg-white resize-none shadow-[inset_1px_1px_0_rgba(44,30,22,0.1)]"
                  />
                </div>
              );
            })}
          </div>

          <div class="flex flex-col gap-3 mt-6 pt-4 border-t-[3px] border-ink-deep/20">
            <button
              onClick={handleSave}
              class="w-full py-4 bg-crimson hover:bg-crimson-hover text-white font-black uppercase tracking-widest text-sm rounded-sm shadow-[4px_4px_0_var(--color-ink-deep)] transition-all active:translate-y-[4px] active:translate-x-[4px] active:shadow-[0_0_0_var(--color-ink-deep)] border-[3px] border-ink-deep cursor-pointer"
            >
              {isNew ? 'Confirm Recruitment' : 'Apply Changes'}
            </button>
            <div class="flex gap-3">
              <button
                onClick={isNew ? handleDiscard : handleRemove}
                class="flex-1 py-3 bg-parchment hover:bg-parchment-light text-crimson border-[3px] border-ink-deep font-black uppercase tracking-widest text-xs rounded-sm shadow-[2px_2px_0_var(--color-ink-deep)] transition-all active:translate-y-[2px] active:translate-x-[2px] active:shadow-[0_0_0_var(--color-ink-deep)] cursor-pointer"
              >
                {isNew ? 'Discard Draft' : 'Dismiss Agent'}
              </button>
              <button
                onClick={handleClose}
                class="flex-1 py-3 bg-parchment-aged hover:bg-parchment text-ink-deep border-[3px] border-ink-deep font-black uppercase tracking-widest text-xs rounded-sm shadow-[2px_2px_0_var(--color-ink-deep)] transition-all active:translate-y-[2px] active:translate-x-[2px] active:shadow-[0_0_0_var(--color-ink-deep)] cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>

        {/* Close Button */}
        <button
          onClick={handleClose}
          class="absolute top-4 right-4 w-10 h-10 bg-parchment-base border-[3px] border-ink-deep shadow-[2px_2px_0_var(--color-ink-deep)] rounded-sm flex items-center justify-center text-ink-deep hover:bg-parchment-light active:translate-y-[2px] active:translate-x-[2px] active:shadow-[0_0_0_var(--color-ink-deep)] transition-all z-50 group"
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
