import { useState, useEffect } from 'preact/hooks';
import type { PartyMember, Responsibility } from '../core/types';

interface Props {
  member: PartyMember;
  allResponsibilities: Responsibility[];
  otherMembers: { id: string; name: string }[];
  onSave: (member: PartyMember) => void;
  onRemove: (id: string) => void;
  onClose: () => void;
}

export function MemberEditor({
  member,
  allResponsibilities,
  otherMembers,
  onSave,
  onRemove,
  onClose,
}: Props) {
  const [editedMember, setEditedMember] = useState<PartyMember>({ ...member });

  // Handle closing on Escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

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

  return (
    <div
      class="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8 animate-in fade-in duration-300"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div class="absolute inset-0 bg-slate-950/80 backdrop-blur-md"></div>

      <div class="relative bg-slate-900 border-2 border-tavern-800 rounded-2xl shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-hidden flex flex-col md:flex-row animate-in zoom-in-95 duration-300">
        {/* Left Side: Identity & Personality */}
        <div class="w-full md:w-1/3 p-6 md:p-8 border-b md:border-b-0 md:border-r border-tavern-800 overflow-y-auto bg-slate-900">
          <div class="mb-8 flex flex-col items-center gap-4 text-center">
            <div class="w-32 h-32 rounded-2xl bg-slate-800 border-2 border-slate-950 overflow-hidden shadow-lg relative group">
              <img
                src={`/images/roles/${editedMember.agentClass.toLowerCase()}.png`}
                alt={editedMember.agentClass}
                class="w-full h-full object-cover"
              />
            </div>
            <div class="w-full">
              <label class="block text-[10px] font-black uppercase tracking-widest text-gold-500 mb-1">
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
                class="w-full bg-slate-950 border-2 border-tavern-800 rounded-lg px-4 py-2 text-parchment font-bold focus:outline-none focus:border-gold-600/50 transition-colors text-center"
              />
            </div>
          </div>

          <div class="space-y-6">
            <div>
              <label class="block text-[10px] font-black uppercase tracking-widest text-gold-500 mb-2">
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
                rows={2}
                class="w-full bg-slate-950 border-2 border-tavern-800 rounded-lg px-4 py-2 text-slate-300 text-sm focus:outline-none focus:border-gold-600/50 transition-colors resize-none"
              />
            </div>

            <div>
              <label class="block text-[10px] font-black uppercase tracking-widest text-gold-500 mb-2">
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
                rows={4}
                class="w-full bg-slate-950 border-2 border-tavern-800 rounded-lg px-4 py-2 text-slate-300 text-sm focus:outline-none focus:border-gold-600/50 transition-colors resize-none leading-relaxed"
              />
            </div>
          </div>
        </div>

        {/* Middle: Responsibilities */}
        <div class="w-full md:w-1/3 p-6 md:p-8 border-b md:border-b-0 md:border-r border-tavern-800 flex flex-col overflow-hidden bg-slate-900/50">
          <h3 class="text-[10px] font-black uppercase tracking-widest text-gold-500 mb-4">
            Responsibilities
          </h3>
          <div class="flex-1 overflow-y-auto pr-2 space-y-2">
            {allResponsibilities.map((r) => {
              const isAssigned = editedMember.responsibilities.some(
                (res) => res.name === r.name
              );
              return (
                <button
                  key={r.name}
                  onClick={() => toggleResponsibility(r)}
                  class={`p-3 rounded-lg border-2 text-left transition-all w-full group ${
                    isAssigned
                      ? 'bg-gold-600/10 border-gold-600/50 text-parchment'
                      : 'bg-slate-950/50 border-tavern-800 text-slate-500 hover:border-slate-700'
                  }`}
                >
                  <div class="flex justify-between items-center mb-1">
                    <span class="font-bold text-xs uppercase tracking-wider">
                      {r.name}
                    </span>
                    {isAssigned && <span class="text-gold-400 text-xs">✓</span>}
                  </div>
                  <p class="text-[10px] leading-tight opacity-70">
                    {r.description}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Side: Relationships & Actions */}
        <div class="w-full md:w-1/3 p-6 md:p-8 flex flex-col overflow-hidden bg-slate-900">
          <h3 class="text-[10px] font-black uppercase tracking-widest text-gold-500 mb-4">
            Relationships
          </h3>
          <div class="flex-1 overflow-y-auto pr-2 space-y-4">
            {otherMembers.length === 0 && (
              <p class="text-xs text-slate-500 italic">
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
                  class="p-3 rounded-lg bg-slate-950/50 border border-tavern-800"
                >
                  <div class="flex justify-between items-center mb-2">
                    <span class="text-xs font-bold text-slate-300 uppercase tracking-wider">
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
                      class="bg-slate-900 border border-tavern-800 rounded text-[10px] px-1 py-0.5 text-gold-400 focus:outline-none"
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
                    class="w-full bg-slate-950 border border-tavern-800 rounded px-2 py-1 text-[10px] text-slate-400 focus:outline-none focus:border-gold-600/30 resize-none"
                  />
                </div>
              );
            })}
          </div>

          <div class="flex flex-col gap-3 mt-6">
            <button
              onClick={() => onSave(editedMember)}
              class="w-full py-4 bg-gold-600 hover:bg-gold-500 text-slate-950 font-black uppercase tracking-[0.2em] text-sm rounded-xl shadow-lg shadow-gold-900/20 transition-all transform active:scale-[0.98]"
            >
              Apply Changes
            </button>
            <div class="flex gap-3">
              <button
                onClick={() => onRemove(member.id)}
                class="flex-1 py-3 bg-crimson/10 hover:bg-crimson/20 text-crimson border-2 border-crimson/30 hover:border-crimson/50 font-bold uppercase tracking-widest text-xs rounded-xl transition-all"
              >
                Dismiss Agent
              </button>
              <button
                onClick={onClose}
                class="flex-1 py-3 bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white border-2 border-slate-700 hover:border-slate-600 font-bold uppercase tracking-widest text-xs rounded-xl transition-all"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          class="absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center text-slate-500 hover:text-white hover:bg-slate-800 transition-all z-50"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
