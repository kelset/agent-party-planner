import type { OrchestrationConfig } from '../core/types';

export function generateWarRoomPrompt(config: OrchestrationConfig): string {
  const { warRoom } = config;

  return `# The War Room

The **War Room** is the highest level of orchestration in the Agents Party for the quest: **${config.questName}**. It serves as the meta-level interface between the human user and the underlying execution layers (the GM Session and the Party).

In the War Room, you don't fight the battles—you plan the campaign, review the outcomes, and adjust the strategy.

## War Room Meta-Roles

To manage this complex responsibility, the War Room features three specialized meta-agents that the user can interact with. Each serves a distinct purpose in shaping the orchestration.

---
${warRoom.metaRoles
  .map(
    (role) => `
### ${role.name} (${role.role})
**Role:** ${role.role}
**Responsibilities:**
${role.responsibilities.map((r) => `- **${r.name}:** ${r.description}`).join('\n')}
`
  )
  .join('\n---')}
---

## Operating the War Room

The War Room is designed to be the first point of entry for a complex task. It must be run in a **separate orchestration directory**, completely outside of the target codebase repository where the actual coding will occur. This prevents the codebase from being cluttered with agent journals and meta-prompts.

### Mid-Flight Rule Changes

Because the War Room session and the GM Session can run in parallel, the user can use the War Room to alter a quest while it is actively being executed by the GM.

To achieve "graceful interruption," when the **Master of Spies** or the Game Creator proposes a rule change, they do not interrupt the GM's terminal process directly. Instead, they write the new constraints to a shared file within the quest folder (e.g., \`active-rules.md\` or \`war-room-directives.md\`). The GM is instructed to read this file before every action it takes. By doing so, the GM naturally absorbs the new instructions on its next loop iteration without breaking the current workflow.

### Using Safety Pauses

There are moments when the GM will naturally pause (e.g., hitting a 36-hour Time-to-Live limit or running low on agent tokens). These forced pauses are the perfect moments for the user to return to the War Room. The user can consult with the Game Creator or the Master of Spies to assess the situation and push new rules to \`active-rules.md\` before telling the GM to resume. Additionally, if the War Room decides a quest is beyond saving, the user can execute an abort command to signal the GM to hard-reset the workspace and terminate.
`;
}
