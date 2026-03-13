import type { OrchestrationConfig } from '../core/types';

export function generatePromptsFile(config: OrchestrationConfig): string {
  return `# Startup Prompts

Use these copy-paste prompts to bootstrap your sessions if you aren't using the automated shell scripts.

## Throne Room Session
Run this prompt in this orchestration directory to start the planning phase:

> "Please read the rules in the throne-room directory. Act as the Game Creator. We are going to plan the quest: ${config.questName}. Let's start scaffolding the quest folder according to your instructions."

## GM Session (The Quest)
Run this prompt in your target codebase directory (after ensuring the orchestration folder is accessible):

> "Please read the following files from the orchestration directory in this exact order: \`gm-guide.md\`, \`dynamics.md\`, and \`quest-brief.md\`. Adopt the persona of the Game Master. Execute your startup procedure and acknowledge when you are ready to begin coordinating the party."
`;
}
