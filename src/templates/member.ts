import type { PartyMember } from '../core/types';

export function generatePartyMemberPrompt(member: PartyMember): string {
  return `# Role: ${member.name} (${member.agentClass})

## Class Fantasy
${member.classFantasy}

## Personality
${member.personality}

## Responsibilities
${member.responsibilities.map((r) => `- **${r.name}:** ${r.description}`).join('\n')}

## What You Do NOT Do
${member.restrictions.map((r) => `- ${r}`).join('\n')}

## Tools & Context
You have access to the following tools/context:
${member.tools.map((t) => `- ${t}`).join('\n')}

## Spawn Triggers (When GM calls you)
${member.spawnTriggers.map((t) => `- ${t}`).join('\n')}

${
  member.relationships.length > 0
    ? `## Party Dynamics\n${member.relationships
        .map(
          (rel) =>
            `- **With ${rel.targetId} (${rel.type}):** ${rel.description}`
        )
        .join('\n')}`
    : ''
}
`;
}
