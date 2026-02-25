export type AgentClass =
  | 'Ranger'
  | 'Wizard'
  | 'Warrior'
  | 'Warlock'
  | 'Healer'
  | string;

export type RelationshipType = 'tension' | 'cohesion' | 'neutral' | string;

export interface AgentRelationship {
  /** The ID of the agent this relationship points to */
  targetId: string;
  /** The nature of the dynamic between these two agents */
  type: RelationshipType;
  /** Detailed description of how they interact (e.g., "The Warlock is highly skeptical of the Wizard's optimistic plans.") */
  description: string;
}

export interface Responsibility {
  /** A short, identifiable name for the responsibility (e.g., 'scout', 'code_review') */
  name: string;
  /** The full, detailed description of what this responsibility entails */
  description: string;
}

export interface PartyMember {
  /** Unique identifier for the agent instance (e.g., 'ranger-1') */
  id: string;
  /** Display name (e.g., 'Ranger') */
  name: string;
  /** The archetype or class of the agent */
  agentClass: AgentClass;
  /** Short flavor text describing their role */
  classFantasy: string;
  /** Description of how the agent behaves and makes decisions */
  personality: string;
  /** Actions the agent is expected to perform */
  responsibilities: Responsibility[];
  /** Actions the agent is explicitly forbidden from doing */
  restrictions: string[];
  /** Conditions or phases when the GM should spawn this agent */
  spawnTriggers: string[];
  /** Specific commands, scripts, or APIs the agent is allowed to use */
  tools: string[];
  /** How this agent interacts with other specific members in the party */
  relationships: AgentRelationship[];
}

export interface WarRoomMetaRole {
  id: string;
  name: string;
  role: string;
  responsibilities: Responsibility[];
}

export interface GlobalConstraints {
  /** Minimum number of party members required to start a quest (default: 2) */
  minPartyMembers: number;
  /** Circuit breaker limit for repetitive agent loops (e.g., Warrior/Warlock fighting) */
  maxLoops: number;
  /** Maximum real-world hours a quest is allowed to run before a forced pause (TTL) */
  timeToLiveHours: number;
  /** Any other custom global rules or constraints defined by the Game Creator */
  customRules: string[];
}

export interface OrchestrationConfig {
  /** The working title of the active quest */
  questName: string;
  /** The meta-level configuration and available agents */
  warRoom: {
    metaRoles: WarRoomMetaRole[];
  };
  /** Configuration for the Game Master coordinator */
  gm: {
    name: string;
    personality: string;
    responsibilities: Responsibility[];
    restrictions: string[];
  };
  /** The active roster of specialized agents available for the quest */
  party: PartyMember[];
  /** Overarching safety limits and execution constraints */
  constraints: GlobalConstraints;
}
