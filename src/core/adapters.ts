import type { OrchestrationConfig } from './types';
import { generateGMPrompt } from '../templates/gm';
import { generatePartyMemberPrompt } from '../templates/member';
import {
  generateGameCreatorPrompt,
  generateMetaAgentPrompt,
} from '../templates/throneRoom';
import { generateExportReadme } from '../templates/exportReadme';
import {
  generateThroneRoomScript,
  generateQuestScript,
} from '../templates/scripts';

export type Platform = 'markdown' | 'gemini' | 'claude' | 'openai' | 'other';

export interface ExportFile {
  path: string;
  content: string;
}

export interface PlatformAdapter {
  generate(config: OrchestrationConfig): ExportFile[];
}

function generateThroneRoomFiles(
  config: OrchestrationConfig,
  basePath: string
): ExportFile[] {
  const files: ExportFile[] = [];
  const gameCreator = config.throneRoom.metaRoles.find(
    (r) => r.id === 'meta-creator'
  );
  const otherMetaRoles = config.throneRoom.metaRoles.filter(
    (r) => r.id !== 'meta-creator'
  );

  if (gameCreator) {
    files.push({
      path: `${basePath}game-creator.md`,
      content: generateGameCreatorPrompt(config, gameCreator),
    });
  }

  otherMetaRoles.forEach((role) => {
    files.push({
      path: `${basePath}${role.id.replace('meta-', '')}.md`,
      content: generateMetaAgentPrompt(config, role),
    });
  });

  return files;
}

export class MarkdownAdapter implements PlatformAdapter {
  generate(config: OrchestrationConfig): ExportFile[] {
    const files: ExportFile[] = [];

    // Throne Room
    files.push(...generateThroneRoomFiles(config, 'throne-room/'));

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

    // Extra files
    files.push({
      path: 'README.md',
      content: generateExportReadme(config, 'Markdown'),
    });
    files.push({
      path: 'start-throne-room.sh',
      content: generateThroneRoomScript('markdown'),
    });
    files.push({
      path: 'start-quest.sh',
      content: generateQuestScript('markdown'),
    });

    return files;
  }
}

export class OpenAIAdapter implements PlatformAdapter {
  generate(config: OrchestrationConfig): ExportFile[] {
    const files: ExportFile[] = [];

    // OpenAI Swarm / Agents often use individual instruction files
    files.push(...generateThroneRoomFiles(config, 'meta/'));

    files.push({
      path: 'instructions/gm.txt',
      content: generateGMPrompt(config),
    });

    config.party.forEach((member) => {
      files.push({
        path: `instructions/${member.agentClass.toLowerCase()}.txt`,
        content: generatePartyMemberPrompt(member),
      });
    });

    // Extra files
    files.push({
      path: 'README.md',
      content: generateExportReadme(config, 'OpenAI'),
    });
    files.push({
      path: 'start-throne-room.sh',
      content: generateThroneRoomScript('openai'),
    });
    files.push({
      path: 'start-quest.sh',
      content: generateQuestScript('openai'),
    });

    return files;
  }
}

export class GeminiAdapter implements PlatformAdapter {
  generate(config: OrchestrationConfig): ExportFile[] {
    const files: ExportFile[] = [];

    files.push(...generateThroneRoomFiles(config, 'throne_room/'));

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

    // Extra files
    files.push({
      path: 'README.md',
      content: generateExportReadme(config, 'Gemini'),
    });
    files.push({
      path: 'start-throne-room.sh',
      content: generateThroneRoomScript('gemini'),
    });
    files.push({
      path: 'start-quest.sh',
      content: generateQuestScript('gemini'),
    });

    return files;
  }
}

export class ClaudeAdapter implements PlatformAdapter {
  generate(config: OrchestrationConfig): ExportFile[] {
    const files: ExportFile[] = [];

    files.push(...generateThroneRoomFiles(config, 'meta/'));

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

    // Extra files
    files.push({
      path: 'README.md',
      content: generateExportReadme(config, 'Claude'),
    });
    files.push({
      path: 'start-throne-room.sh',
      content: generateThroneRoomScript('claude'),
    });
    files.push({
      path: 'start-quest.sh',
      content: generateQuestScript('claude'),
    });

    return files;
  }
}

export class OtherAdapter implements PlatformAdapter {
  generate(config: OrchestrationConfig): ExportFile[] {
    // Same as markdown structure but for "Other" platform
    const files: ExportFile[] = [];

    files.push(...generateThroneRoomFiles(config, 'throne-room/'));

    files.push({
      path: 'gm-guide.md',
      content: generateGMPrompt(config),
    });

    config.party.forEach((member) => {
      files.push({
        path: `party/${member.agentClass.toLowerCase()}.md`,
        content: generatePartyMemberPrompt(member),
      });
    });

    // Extra files
    files.push({
      path: 'README.md',
      content: generateExportReadme(config, 'Other'),
    });
    files.push({
      path: 'start-throne-room.sh',
      content: generateThroneRoomScript('other'),
    });
    files.push({
      path: 'start-quest.sh',
      content: generateQuestScript('other'),
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
    case 'openai':
      return new OpenAIAdapter();
    case 'other':
      return new OtherAdapter();
    case 'markdown':
    default:
      return new MarkdownAdapter();
  }
}
