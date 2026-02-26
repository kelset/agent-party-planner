import type { OrchestrationConfig } from './types';
import { generateGMPrompt } from '../templates/gm';
import { generatePartyMemberPrompt } from '../templates/member';
import { generateWarRoomPrompt } from '../templates/warRoom';

export type Platform = 'markdown' | 'gemini' | 'claude';

export interface ExportFile {
  path: string;
  content: string;
}

export interface PlatformAdapter {
  generate(config: OrchestrationConfig): ExportFile[];
}

export class MarkdownAdapter implements PlatformAdapter {
  generate(config: OrchestrationConfig): ExportFile[] {
    const files: ExportFile[] = [];

    // War Room
    files.push({
      path: 'war-room.md',
      content: generateWarRoomPrompt(config),
    });

    // GM Guide
    files.push({
      path: 'gm-guide.md',
      content: generateGMPrompt(config),
    });

    // Party Members
    config.party.forEach((member) => {
      files.push({
        path: `party/${member.agentClass.toLowerCase()}.md`,
        content: generatePartyMemberPrompt(member),
      });
    });

    return files;
  }
}

export class GeminiAdapter implements PlatformAdapter {
  generate(config: OrchestrationConfig): ExportFile[] {
    const files: ExportFile[] = [];

    files.push({
      path: 'war_room.md',
      content: generateWarRoomPrompt(config),
    });

    files.push({
      path: 'SKILL.md',
      content:
        generateGMPrompt(config) +
        '\n\n## Sub-Agents (Party)\n' +
        config.party.map((p) => `- ${p.name}: ${p.classFantasy}`).join('\n'),
    });

    config.party.forEach((member) => {
      files.push({
        path: `roles/${member.agentClass.toLowerCase()}_system_prompt.txt`,
        content: generatePartyMemberPrompt(member),
      });
    });

    return files;
  }
}

export class ClaudeAdapter implements PlatformAdapter {
  generate(config: OrchestrationConfig): ExportFile[] {
    const files: ExportFile[] = [];

    files.push({
      path: 'meta/war-room.md',
      content: generateWarRoomPrompt(config),
    });

    files.push({
      path: 'orchestrator.md',
      content: generateGMPrompt(config),
    });

    config.party.forEach((member) => {
      files.push({
        path: `agents/${member.agentClass.toLowerCase()}.md`,
        content: generatePartyMemberPrompt(member),
      });
    });

    return files;
  }
}

export function getAdapter(platform: Platform): PlatformAdapter {
  switch (platform) {
    case 'gemini':
      return new GeminiAdapter();
    case 'claude':
      return new ClaudeAdapter();
    case 'markdown':
    default:
      return new MarkdownAdapter();
  }
}
