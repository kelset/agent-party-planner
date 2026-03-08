#!/usr/bin/env node
import { intro, outro, select, text, isCancel, spinner, note } from '@clack/prompts';
import pc from 'picocolors';
import { execSync, spawn } from 'child_process';
import fs from 'fs';
import path from 'path';

import { OrchestrationForge } from '../core/forge';
import { defaultPartyPreset } from '../core/presets/defaultParty';
import type { Platform } from '../core/adapters';

function checkCommand(cmd: string): boolean {
  try {
    execSync(`which ${cmd}`, { stdio: 'ignore' });
    return true;
  } catch {
    return false;
  }
}

async function main() {
  console.clear();
  intro(pc.bgYellow(pc.black(' 👑 Welcome to the Throne Room ')));

  // Simple arg parsing
  const args = process.argv.slice(2);
  let platformArg = args.find((a) => a.startsWith('--platform='))?.split('=')[1] as Platform | 'other' | undefined;
  let customCommand = '';

  if (!platformArg) {
    const hasClaude = checkCommand('claude');
    const hasGemini = checkCommand('gemini');
    const hasOpenAI = checkCommand('openai') || checkCommand('codex'); // Assuming openai or codex CLI

    const platformSelect = await select({
      message: 'Which AI platform do you want to orchestrate?',
      options: [
        {
          value: 'claude',
          label: `Claude ${hasClaude ? pc.green('✅') : pc.red('❌ (not found in PATH)')}`,
          hint: 'Uses @anthropic-ai/claude-code',
        },
        {
          value: 'gemini',
          label: `Gemini ${hasGemini ? pc.green('✅') : pc.red('❌ (not found in PATH)')}`,
          hint: 'Uses @google/gemini-cli',
        },
        {
          value: 'openai',
          label: `OpenAI / Codex ${hasOpenAI ? pc.green('✅') : pc.red('❌ (not found in PATH)')}`,
          hint: 'Uses openai-cli or codex',
        },
        {
          value: 'other',
          label: `Other...`,
          hint: 'Provide a custom CLI command',
        }
      ],
    });

    if (isCancel(platformSelect)) {
      outro(pc.red('Orchestration cancelled.'));
      process.exit(0);
    }
    
    platformArg = platformSelect as Platform | 'other';
  }

  if (platformArg === 'other') {
    const customPrompt = await text({
      message: 'Enter the CLI command you use to launch your agent:',
      placeholder: 'e.g. my-agent --prompt',
      validate(value) {
        if (value.length === 0) return 'Command is required!';
      }
    });

    if (isCancel(customPrompt)) {
      outro(pc.red('Orchestration cancelled.'));
      process.exit(0);
    }
    customCommand = customPrompt as string;
  }

  // Treat 'other' as 'markdown' for file generation purposes to get generic output
  const platform = platformArg === 'other' ? 'markdown' : platformArg as Platform;

  const s = spinner();
  s.start('Forging orchestration files...');

  const orchestrationDir = path.join(process.cwd(), '.orchestration');
  
  if (!fs.existsSync(orchestrationDir)) {
    fs.mkdirSync(orchestrationDir, { recursive: true });
  }

  const files = OrchestrationForge.forgePackage(defaultPartyPreset, platform);
  
  for (const file of files) {
    const filePath = path.join(orchestrationDir, file.path);
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(filePath, file.content, 'utf-8');
  }

  s.stop(pc.green('Orchestration files forged in .orchestration/'));

  note(
    `The Game Creator will now guide you through planning your quest.\nWhen you are ready, they will give you a command to start the GM session.`,
    'Next Steps'
  );

  let command = '';
  let commandArgs: string[] = [];
  const promptPath = '.orchestration/throne_room/game-creator.md';

  let systemPromptContent = '';
  try {
    systemPromptContent = fs.readFileSync(path.join(process.cwd(), promptPath), 'utf-8');
  } catch (e) {
    // Fallback if not found, though it should have just been written
    systemPromptContent = 'You are the Game Creator in the Throne Room.';
  }

  // Build the wrapper string that forces them to adopt the persona immediately
  const initialPrompt = `Please read these rules carefully and adopt the persona of the Game Creator. Acknowledge when you are ready to begin:\n\n${systemPromptContent}`;

  if (platformArg === 'other' && customCommand) {
    const parts = customCommand.trim().split(/\s+/);
    command = parts[0];
    commandArgs = [...parts.slice(1)];
    if (!customCommand.includes('.orchestration')) {
        commandArgs.push(promptPath);
    }
  } else if (platform === 'claude') {
    command = 'claude';
    // Claude accepts -p for the initial message
    commandArgs = ['-p', initialPrompt];
  } else if (platform === 'gemini') {
    command = 'gemini';
    // Gemini CLI uses -i to pass an initial prompt and KEEP the session interactive
    commandArgs = ['-i', initialPrompt];
  } else if (platform === 'openai') {
    command = checkCommand('codex') ? 'codex' : 'openai';
    // Assuming standard prompt passing for now
    commandArgs = ['-p', initialPrompt]; 
  } else {
    outro(pc.red(`Platform ${platform} is not fully supported by the CLI wrapper yet.`));
    process.exit(1);
  }

  if (!checkCommand(command)) {
    outro(pc.red(`Error: '${command}' is not installed globally or not in your PATH.\nPlease install it first to continue.`));
    process.exit(1);
  }

  intro(pc.cyan(`Spawning: ${command} ${commandArgs[0]} "..."`));

  const child = spawn(command, commandArgs, {
    stdio: 'inherit',
    env: { ...process.env },
  });

  child.on('close', (code) => {
    if (code === 0) {
      outro(pc.green('Throne Room session ended successfully.'));
    } else {
      outro(pc.red(`Throne Room session exited with code ${code}`));
    }
  });
}

main().catch(console.error);
