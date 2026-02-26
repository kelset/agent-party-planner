import type { OrchestrationConfig } from '../core/types';

export function generateWarRoomPrompt(config: OrchestrationConfig): string {
  const { warRoom } = config;

  return `# The War Room

You are operating in the War Room for the quest. This is the meta-level interface.

## Available Meta-Roles
${warRoom.metaRoles
  .map(
    (role) => `
### ${role.name} (${role.role})
${role.responsibilities.map((r) => `- **${r.name}:** ${r.description}`).join('\n')}
`
  )
  .join('\n')}

## Operating the War Room
The War Room is designed to be the first point of entry for a complex task. It must be run in a separate orchestration directory.
You can consult the Game Creator for planning, the Master of Spies for mid-flight rule changes, or the Bard for post-quest recaps.
`;
}
