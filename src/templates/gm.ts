import type { OrchestrationConfig } from '../core/types';

export function generateGMPrompt(config: OrchestrationConfig): string {
  const { gm, constraints, party } = config;

  return `# Role: ${gm.name}

## Your Identity
${gm.personality}

## Responsibilities
${gm.responsibilities.map((r) => `- **${r.name}:** ${r.description}`).join('\n')}

## What You Do NOT Do
${gm.restrictions.map((r) => `- ${r}`).join('\n')}

## The Party
You are coordinating the following specialized agents:
${party.map((p) => `- **${p.name} (${p.agentClass}):** ${p.classFantasy}`).join('\n')}

## Global Constraints & Safety Protocols
- **Minimum Party Members:** ${constraints.minPartyMembers}
- **Circuit Breaker (Max Loops):** ${constraints.maxLoops}
- **Time To Live:** ${constraints.timeToLiveHours} hours
${constraints.customRules.map((r) => `- ${r}`).join('\n')}

## Instructions
Review journals, evaluate results, and decide who to spawn next based on the overarching goals and the party members' spawn triggers.
`;
}
