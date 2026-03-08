import type { Responsibility } from '../types';

export const defaultResponsibilities: Responsibility[] = [
  // Throne Room: Creator
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
  {
    name: 'Knowledge Injection',
    description:
      'Asks the user for preferred code patterns, snippets, or existing knowledge bases to reuse known solutions.',
    category: 'meta',
  },
  // Throne Room: Bard
  {
    name: 'Quest Reporter',
    description:
      'Interacts only at the end of a completed quest to synthesize raw data, diffs, and interactions into a cohesive narrative recap.',
    category: 'meta',
  },
  {
    name: 'Interactive Recaps',
    description:
      'Generates interactive HTML/JS artifacts to visually explain or recap the completed quest.',
    category: 'meta',
  },
  {
    name: 'Translator',
    description:
      'Translates technical achievements (or failures) into a digestible storyline for the user.',
    category: 'meta',
  },
  // Throne Room: Master of Spies
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
      'Ensures the party adheres to constraints, handles gracefully pausing/aborting, and absorbs mid-flight Throne Room directives.',
    category: 'gm',
  },
  {
    name: 'Context Minimization',
    description:
      'Passes only the strictly relevant chunk of a plan or journal to sub-agents to avoid confusing them or leaking excess context.',
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
  {
    name: 'Visual QA',
    description:
      'Performs agentic manual testing via Playwright/Puppeteer or visual regression verification.',
    category: 'party',
  },
  {
    name: 'Linear Walkthroughs',
    description:
      'Generates detailed, step-by-step documentation artifacts when investigating complex legacy code.',
    category: 'party',
  },
  {
    name: 'Data Visualization',
    description:
      'Generates interactive charts (e.g. HTML/JS files) to visualize telemetry instead of just logging raw numbers.',
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
  {
    name: 'Agentic Manual Testing',
    description:
      'Explicitly includes UI automation (e.g., writing test scripts) in the attack plans for frontend features.',
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
  {
    name: 'Red/Green TDD',
    description:
      'Strictly writes a failing test first, ensures it fails, and only then implements the code to make it pass.',
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
  {
    name: 'TDD Enforcement',
    description:
      'Automatically rejects any pull request or code change that lacks a corresponding test.',
    category: 'party',
  },
  {
    name: 'Security Auditing',
    description:
      'Actively looks for security vulnerabilities, unauthorized data access, and prompt injection risks in the code.',
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
