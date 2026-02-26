import { describe, expect, it } from 'bun:test';
import { OrchestrationForge } from './forge';
import { defaultPartyPreset } from './presets/defaultParty';

describe('OrchestrationForge', () => {
  it('should generate markdown files correctly', () => {
    const files = OrchestrationForge.forgePackage(
      defaultPartyPreset,
      'markdown'
    );

    // Should have 1 War Room, 1 GM Guide, and files for each party member (5)
    expect(files.length).toBe(1 + 1 + 5);

    const paths = files.map((f) => f.path);
    expect(paths).toContain('war-room.md');
    expect(paths).toContain('gm-guide.md');
    expect(paths).toContain('party/ranger.md');

    const rangerContent = files.find(
      (f) => f.path === 'party/ranger.md'
    )?.content;
    expect(rangerContent).toContain('Role: Ranger (Ranger)');
    expect(rangerContent).toContain('The scout who maps the terrain');
  });

  it('should generate Gemini platform specific files', () => {
    const files = OrchestrationForge.forgePackage(defaultPartyPreset, 'gemini');

    const paths = files.map((f) => f.path);
    expect(paths).toContain('SKILL.md');
    expect(paths).toContain('roles/ranger_system_prompt.txt');
  });

  it('should generate Claude platform specific files', () => {
    const files = OrchestrationForge.forgePackage(defaultPartyPreset, 'claude');

    const paths = files.map((f) => f.path);
    expect(paths).toContain('orchestrator.md');
    expect(paths).toContain('meta/war-room.md');
    expect(paths).toContain('agents/ranger.md');
  });
});
