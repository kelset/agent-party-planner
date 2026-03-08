export function generateThroneRoomScript(platform: string): string {
  let command: string;
  switch (platform) {
    case 'gemini':
      command =
        'gemini --permissions read,write -i "Please read these rules carefully and adopt the persona of the Game Creator. Acknowledge when you are ready to begin:\n\n$(cat throne_room/game-creator.md)"';
      break;
    case 'claude':
      command =
        'claude -p "Please read these rules carefully and adopt the persona of the Game Creator. Acknowledge when you are ready to begin:\n\n$(cat throne_room/game-creator.md)"';
      break;
    case 'openai':
      // Fallback for OpenAI/Codex using standard string piping
      command =
        'codex -p "Please read these rules carefully and adopt the persona of the Game Creator. Acknowledge when you are ready to begin:\n\n$(cat throne_room/game-creator.md)"';
      break;
    default:
      command = `# Add your favorite agent CLI command here
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
  switch (platform) {
    case 'gemini':
      command =
        'gemini --permissions read,write -i "Please read these rules carefully and adopt the persona of the Game Master. Acknowledge when you are ready to begin coordinating the party:\n\n$(cat SKILL.md)"';
      break;
    case 'claude':
      command =
        'claude -p "Please read these rules carefully and adopt the persona of the Game Master. Acknowledge when you are ready to begin coordinating the party:\n\n$(cat orchestrator.md)"';
      break;
    case 'openai':
      command =
        'codex -p "Please read these rules carefully and adopt the persona of the Game Master. Acknowledge when you are ready to begin coordinating the party:\n\n$(cat orchestrator.md)"';
      break;
    default:
      command = `# Add your favorite agent CLI command here
# e.g., my-agent --prompt gm-guide.md`;
  }

  return `#!/bin/bash
# Start the Quest (GM Session)
# Usage: ./start-quest.sh [path-to-target-codebase]

TARGET_DIR=\${1:-"."}

if [ ! -d "$TARGET_DIR" ]; then
  echo "Error: $TARGET_DIR is not a directory."
  exit 1
fi

cd "$TARGET_DIR"
echo "Launching GM Session in $TARGET_DIR..."

${command}
`;
}
