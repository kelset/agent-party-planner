import type { Responsibility } from '../types';

export const defaultResponsibilities: Responsibility[] = [
  // War Room: Creator
  {
    name: 'Brainstorm Partner',
    description:
      'Talks directly with the user to outline overarching goals and scope of the quests.',
  },
  {
    name: 'Party Designer',
    description:
      'Helps design the party composition (classes to include/exclude) and sets house rules.',
  },
  {
    name: 'Project Lead',
    description:
      'Translates user intent into the initial parameters that spin up a GM Session.',
  },
  // War Room: Bard
  {
    name: 'Quest Reporter',
    description:
      'Interacts only at the end of a completed quest to synthesize raw data, diffs, and interactions into a cohesive narrative recap.',
  },
  {
    name: 'Translator',
    description:
      'Translates technical achievements (or failures) into a digestible storyline for the user.',
  },
  // War Room: Master of Spies
  {
    name: 'Real-time Analyst',
    description:
      'Critiques the current quest progress and Party performance. Can be consulted at any point.',
  },
  {
    name: 'System Evaluator',
    description:
      'Identifies inefficiencies and proposes actionable changes to rules, roles, or characters to optimize the workflow.',
  },
  // GM
  {
    name: 'Coordinator',
    description:
      'Translates overarching goals into actionable phases and spawns Party Members in the correct sequence.',
  },
  {
    name: 'Reviewer',
    description:
      'Reads journals, evaluates results, and decides who to spawn next.',
  },
  {
    name: 'Safety Enforcer',
    description:
      'Ensures the party adheres to constraints, handles gracefully pausing/aborting, and absorbs mid-flight War Room directives.',
  },
  // Ranger
  {
    name: 'Telemetry & Profiling',
    description:
      'Run profiling tools, benchmarks, and capture baseline/post-work measurements.',
  },
  {
    name: 'Reconnaissance',
    description:
      'Identify bottlenecks during recon and report what the numbers say.',
  },
  // Wizard
  {
    name: 'Party Leader',
    description:
      "The primary contact point for the Game Master. Translates the GM's overarching quest goals into a concrete action plan.",
  },
  {
    name: 'Strategist',
    description:
      'Analyze recon data, research solutions, and create structured attack plans with prioritized targets.',
  },
  {
    name: 'Final Reviewer',
    description:
      'Conduct final strategic reviews of changes to confirm alignment with the plan.',
  },
  // Warrior
  {
    name: 'Implementation',
    description: 'Execute the specific code changes called for in the plan.',
  },
  {
    name: 'Documentation',
    description: 'Describe what was changed and why in the journal.',
  },
  // Warlock
  {
    name: 'Code Review',
    description:
      "Review the warrior's code changes for correctness, style, and unintended side effects.",
  },
  {
    name: 'Feedback',
    description:
      'Write detailed review feedback (approved or changes requested).',
  },
  // Healer
  {
    name: 'Diagnostics & Recovery',
    description:
      'Diagnose failures when other party members hit blockers. Investigate error messages, fix broken environments, or revert bad changes.',
  },
];
