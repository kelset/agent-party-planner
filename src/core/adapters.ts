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
import { generateDynamicsPrompt } from '../templates/dynamics';
import { generatePromptsFile } from '../templates/prompts';

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

    // Party Dynamics
    files.push({
      path: 'dynamics.md',
      content: generateDynamicsPrompt(),
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
      path: 'PROMPTS.md',
      content: generatePromptsFile(config),
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

    files.push({
      path: 'dynamics.md',
      content: generateDynamicsPrompt(),
    });

    let configToml = `[features]\nmulti_agent = true\n\n`;

    config.party.forEach((member) => {
      const roleId = member.id.toLowerCase();

      // Append to the orchestrator config
      configToml += `[agents.${roleId}]\n`;
      configToml += `description = "${member.agentClass} - ${member.classFantasy}"\n`;
      configToml += `config_file = ".codex/agents/${roleId}.toml"\n\n`;

      // Generate the specific agent config
      files.push({
        path: `.codex/agents/${roleId}.toml`,
        content: `[agent]\nname = "${member.name}"\ndeveloper_instructions = """\n${generatePartyMemberPrompt(member)}\n"""\n`,
      });
    });

    files.push({
      path: '.codex/config.toml',
      content: configToml,
    });

    // Extra files
    files.push({
      path: 'README.md',
      content: generateExportReadme(config, 'OpenAI'),
    });
    files.push({
      path: 'PROMPTS.md',
      content: generatePromptsFile(config),
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

    files.push({
      path: 'dynamics.md',
      content: generateDynamicsPrompt(),
    });

    // Generate native experimental subagents for the GM session
    config.party.forEach((member) => {
      const slug = member.id.toLowerCase().replace(/[^a-z0-9]/g, '_');
      const frontmatter = `---
name: ${slug}
description: ${member.agentClass} - ${member.classFantasy}
tools: [run_shell_command, read_file, write_file, replace, grep_search, glob]
---
`;
      files.push({
        path: `.gemini/agents/${slug}.md`,
        content: frontmatter + generatePartyMemberPrompt(member),
      });
    });

    // Inject Throne Room Meta Roles as subagents so the Game Creator can hire them!
    const otherMetaRoles = config.throneRoom.metaRoles.filter(
      (r) => r.id !== 'meta-creator'
    );
    otherMetaRoles.forEach((role) => {
      const slug = role.id.toLowerCase().replace(/[^a-z0-9]/g, '_');
      const frontmatter = `---
name: ${slug}
description: ${role.name} - ${role.role}
tools: [run_shell_command, read_file, write_file, replace, grep_search, glob]
---
`;
      files.push({
        path: `.gemini/agents/${slug}.md`,
        content: frontmatter + generateMetaAgentPrompt(config, role),
      });
    });

    // Extra files
    files.push({
      path: 'README.md',
      content: generateExportReadme(config, 'Gemini'),
    });
    files.push({
      path: 'PROMPTS.md',
      content: generatePromptsFile(config),
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

    files.push({
      path: 'dynamics.md',
      content: generateDynamicsPrompt(),
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
      path: 'PROMPTS.md',
      content: generatePromptsFile(config),
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

    files.push({
      path: 'dynamics.md',
      content: generateDynamicsPrompt(),
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
      path: 'PROMPTS.md',
      content: generatePromptsFile(config),
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
