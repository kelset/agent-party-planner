export function generateThroneRoomScript(platform: string): string {
  let command: string;
  switch (platform) {
    case 'gemini':
      command =
        'gemini --permissions read,write -i "Please read the files in the throne-room/ directory. Act as the Game Creator. Let\'s start scaffolding the quest folder."';
      break;
    case 'claude':
      command =
        'claude -p "Please read the files in the throne-room/ directory. Act as the Game Creator. Let\'s start scaffolding the quest folder."';
      break;
    case 'openai':
      command =
        'codex -p "Please read the files in the throne-room/ directory. Act as the Game Creator. Let\'s start scaffolding the quest folder."';
      break;
    default:
      command = `# Add your favorite agent CLI command here
# Check PROMPTS.md for the recommended copy-paste prompt to use.
# e.g., my-agent --prompt throne-room/game-creator.md`;
  }

  return `#!/bin/bash
# Start the Throne Room (Game Creator) Session
# Run this from the orchestration directory.

${command}
`;
}

export function generateQuestScript(platform: string): string {
  let command: string;
  let copyLogic = '';
  let orchestratorFile: string;

  switch (platform) {
    case 'gemini':
      orchestratorFile = 'SKILL.md';
      command = `gemini --permissions read,write -i "Please read the following files from the orchestration directory in this exact order: \\"$(dirname "$0")/${orchestratorFile}\\", \\"$(dirname "$0")/dynamics.md\\", and \\"$(dirname "$0")/quest-brief.md\\". Adopt the persona of the Game Master. Execute your startup procedure and acknowledge when you are ready."`;
      copyLogic = `
# Gemini Experimental Subagents require the .gemini folder to be in the working directory
echo "Syncing .gemini sub-agents to target codebase..."
cp -R "$(dirname "$0")/.gemini" "$TARGET_DIR/"
if ! grep -q "^.gemini/$" "$TARGET_DIR/.gitignore" 2>/dev/null; then
  echo -e "\\n# Agents Party CLI output\\n.gemini/" >> "$TARGET_DIR/.gitignore"
fi
`;
      break;
    case 'claude':
      orchestratorFile = 'orchestrator.md';
      command = `claude -p "Please read the following files from the orchestration directory in this exact order: \\"$(dirname "$0")/${orchestratorFile}\\", \\"$(dirname "$0")/dynamics.md\\", and \\"$(dirname "$0")/quest-brief.md\\". Adopt the persona of the Game Master. Execute your startup procedure and acknowledge when you are ready."`;
      break;
    case 'openai':
      orchestratorFile = 'instructions/gm.txt';
      command = `codex -p "Please read the following files from the orchestration directory in this exact order: \\"$(dirname "$0")/${orchestratorFile}\\", \\"$(dirname "$0")/dynamics.md\\", and \\"$(dirname "$0")/quest-brief.md\\". Adopt the persona of the Game Master. Execute your startup procedure and acknowledge when you are ready."`;
      copyLogic = `
# Codex Multi-Agent requires the .codex config folder to be in the working directory
echo "Syncing .codex sub-agents to target codebase..."
cp -R "$(dirname "$0")/.codex" "$TARGET_DIR/"
if ! grep -q "^.codex/$" "$TARGET_DIR/.gitignore" 2>/dev/null; then
  echo -e "\\n# Agents Party CLI output\\n.codex/" >> "$TARGET_DIR/.gitignore"
fi
`;
      break;
    default:
      command = `# Add your favorite agent CLI command here
# Check PROMPTS.md for the recommended copy-paste prompt to use.
# Make sure your agent reads gm-guide.md, dynamics.md, and quest-brief.md.`;
  }

  return `#!/bin/bash
# Start the Quest (GM Session)
# Usage: ./start-quest.sh [path-to-target-codebase]

TARGET_DIR=\${1:-"."}

if [ ! -d "$TARGET_DIR" ]; then
  echo "Error: $TARGET_DIR is not a directory."
  exit 1
fi
${copyLogic}
cd "$TARGET_DIR"
echo "Launching GM Session in $TARGET_DIR..."

${command}
`;
}
