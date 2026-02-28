import type { Responsibility } from '../types';

export const defaultResponsibilities: Responsibility[] = [
  // War Room: Creator
  {
    name: 'Brainstorm Partner',
    description:
      'Talks directly with the user to outline overarching goals and scope of the quests.',
    category: 'meta',
  },
  {
    name: 'Party Designer',
    description:
      'Helps design the party composition (classes to include/exclude) and sets house rules.',
    category: 'meta',
  },
  {
    name: 'Project Lead',
    description:
      'Translates user intent into the initial parameters that spin up a GM Session.',
    category: 'meta',
  },
  // War Room: Bard
  {
    name: 'Quest Reporter',
    description:
      'Interacts only at the end of a completed quest to synthesize raw data, diffs, and interactions into a cohesive narrative recap.',
    category: 'meta',
  },
  {
    name: 'Translator',
    description:
      'Translates technical achievements (or failures) into a digestible storyline for the user.',
    category: 'meta',
  },
  // War Room: Master of Spies
  {
    name: 'Real-time Analyst',
    description:
      'Critiques the current quest progress and Party performance. Can be consulted at any point.',
    category: 'meta',
  },
  {
    name: 'System Evaluator',
    description:
      'Identifies inefficiencies and proposes actionable changes to rules, roles, or characters to optimize the workflow.',
    category: 'meta',
  },
  // GM
  {
    name: 'Coordinator',
    description:
      'Translates overarching goals into actionable phases and spawns Party Members in the correct sequence.',
    category: 'gm',
  },
  {
    name: 'Reviewer',
    description:
      'Reads journals, evaluates results, and decides who to spawn next.',
    category: 'gm',
  },
  {
    name: 'Safety Enforcer',
    description:
      'Ensures the party adheres to constraints, handles gracefully pausing/aborting, and absorbs mid-flight War Room directives.',
    category: 'gm',
  },
  // Ranger
  {
    name: 'Telemetry & Profiling',
    description:
      'Run profiling tools, benchmarks, and capture baseline/post-work measurements.',
    category: 'party',
  },
  {
    name: 'Reconnaissance',
    description:
      'Identify bottlenecks during recon and report what the numbers say.',
    category: 'party',
  },
  // Wizard
  {
    name: 'Party Leader',
    description:
      "The primary contact point for the Game Master. Translates the GM's overarching quest goals into a concrete action plan.",
    category: 'party',
  },
  {
    name: 'Strategist',
    description:
      'Analyze recon data, research solutions, and create structured attack plans with prioritized targets.',
    category: 'party',
  },
  {
    name: 'Final Reviewer',
    description:
      'Conduct final strategic reviews of changes to confirm alignment with the plan.',
    category: 'party',
  },
  // Warrior
  {
    name: 'Implementation',
    description: 'Execute the specific code changes called for in the plan.',
    category: 'party',
  },
  {
    name: 'Documentation',
    description: 'Describe what was changed and why in the journal.',
    category: 'party',
  },
  // Warlock
  {
    name: 'Code Review',
    description:
      "Review the warrior's code changes for correctness, style, and unintended side effects.",
    category: 'party',
  },
  {
    name: 'Feedback',
    description:
      'Write detailed review feedback (approved or changes requested).',
    category: 'party',
  },
  // Healer
  {
    name: 'Diagnostics & Recovery',
    description:
      'Diagnose failures when other party members hit blockers. Investigate error messages, fix broken environments, or revert bad changes.',
    category: 'party',
  },
];
