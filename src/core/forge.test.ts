import { describe, expect, it } from 'bun:test';
import { OrchestrationForge } from './forge';
import { defaultPartyPreset } from './presets/defaultParty';

describe('OrchestrationForge', () => {
  it('should generate markdown files correctly', () => {
    const files = OrchestrationForge.forgePackage(
      defaultPartyPreset,
      'markdown'
    );

    // Should have 3 Throne Room meta agents, 1 GM Guide, 5 party members, 1 README, and 2 scripts
    expect(files.length).toBe(3 + 1 + 5 + 1 + 2);

    const paths = files.map((f) => f.path);
    expect(paths).toContain('throne-room/game-creator.md');
    expect(paths).toContain('throne-room/bard.md');
    expect(paths).toContain('throne-room/spies.md');
    expect(paths).toContain('gm-guide.md');
    expect(paths).toContain('party/ranger.md');
    expect(paths).toContain('README.md');
    expect(paths).toContain('start-throne-room.sh');
    expect(paths).toContain('start-quest.sh');

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
    expect(paths).toContain('.gemini/agents/ranger_1.md');
    expect(paths).toContain('.gemini/agents/meta_bard.md');
    expect(paths).toContain('README.md');
    expect(paths).toContain('start-throne-room.sh');
  });

  it('should generate Claude platform specific files', () => {
    const files = OrchestrationForge.forgePackage(defaultPartyPreset, 'claude');

    const paths = files.map((f) => f.path);
    expect(paths).toContain('orchestrator.md');
    expect(paths).toContain('meta/game-creator.md');
    expect(paths).toContain('meta/bard.md');
    expect(paths).toContain('agents/ranger.md');
    expect(paths).toContain('README.md');
  });

  it('should generate OpenAI platform specific files', () => {
    const files = OrchestrationForge.forgePackage(defaultPartyPreset, 'openai');

    const paths = files.map((f) => f.path);
    expect(paths).toContain('instructions/gm.txt');
    expect(paths).toContain('.codex/config.toml');
    expect(paths).toContain('.codex/agents/ranger-1.toml');
    expect(paths).toContain('README.md');
  });

  it('should generate "Other" platform specific files', () => {
    const files = OrchestrationForge.forgePackage(defaultPartyPreset, 'other');

    const paths = files.map((f) => f.path);
    expect(paths).toContain('README.md');
    expect(paths).toContain('start-throne-room.sh');

    const scriptContent = files.find(
      (f) => f.path === 'start-throne-room.sh'
    )?.content;
    expect(scriptContent).toContain(
      '# Add your favorite agent CLI command here'
    );
  });
});
