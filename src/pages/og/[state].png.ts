import type { APIRoute } from 'astro';
import satori from 'satori';
import { html } from 'satori-html';
import { Resvg } from '@resvg/resvg-js';
import LZString from 'lz-string';
import fs from 'node:fs';
import path from 'node:path';
import { defaultPartyPreset } from '../../core/presets/defaultParty';
import type { OrchestrationConfig } from '../../core/types';

// Use path.join to correctly resolve the font path in different environments
const fontPath = path.join(process.cwd(), 'src/assets/fonts/VT323-Regular.ttf');
const fontData = fs.readFileSync(fontPath);

export async function getStaticPaths() {
  return [
    { params: { state: 'default' } },
  ];
}

export const GET: APIRoute = async ({ params }) => {
  const { state } = params;
  let config: OrchestrationConfig | null = null;

  if (state === 'default') {
    config = defaultPartyPreset;
  } else if (state) {
    try {
      const decoded = LZString.decompressFromEncodedURIComponent(state);
      if (decoded) {
        config = JSON.parse(decoded);
      }
    } catch (e) {
      console.error('Failed to parse OG state:', e);
    }
  }

  const questName = config?.questName || 'A New Quest';
  const partyMembers = config?.party || [];

  // Define colors from VISUAL_IDENTITY.md
  const colors = {
    parchment: '#f4e9d8',
    ink: '#2c1e16',
    crimson: '#b93838',
    gold: '#d97706',
    border: '#2c1e16',
  };

  const markup = html`
    <div style="height: 630px; width: 1200px; display: flex; flex-direction: column; align-items: center; justify-content: center; background-color: #0a0908; padding: 40px; font-family: 'VT323';">
      <!-- Outer Decorative Border -->
      <div style="display: flex; flex-direction: column; width: 100%; height: 100%; background-color: ${colors.parchment}; border: 8px solid ${colors.border}; position: relative; padding: 40px; box-shadow: 20px 20px 0px #000;">
        
        <!-- Grid Pattern Overlay -->
        <div style="position: absolute; inset: 0; opacity: 0.1; display: flex; background-image: radial-gradient(${colors.ink} 1px, transparent 1px); background-size: 24px 24px;"></div>

        <!-- Header Banner -->
        <div style="display: flex; background-color: ${colors.crimson}; border: 4px solid ${colors.border}; padding: 15px 40px; align-self: center; margin-bottom: 40px; box-shadow: 8px 8px 0px ${colors.border};">
          <span style="color: white; font-size: 64px; font-weight: 900; text-transform: uppercase; letter-spacing: 4px;">Quest Party Assembled</span>
        </div>

        <!-- Quest Name -->
        <div style="display: flex; flex-direction: column; align-items: center; margin-bottom: 60px;">
          <span style="color: ${colors.ink}; font-size: 40px; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 10px; opacity: 0.7;">Quest Name:</span>
          <span style="color: ${colors.ink}; font-size: 80px; font-weight: 900; border-bottom: 4px solid ${colors.gold}; padding-bottom: 10px; text-align: center;">${questName}</span>
        </div>

        <!-- Party Grid -->
        <div style="display: flex; flex-wrap: wrap; justify-content: center; gap: 30px; width: 100%;">
          ${partyMembers.slice(0, 6).map((m) => `
            <div style="display: flex; flex-direction: column; align-items: center; background-color: #fff; border: 3px solid ${colors.border}; padding: 15px; width: 160px; box-shadow: 4px 4px 0px ${colors.border};">
              <span style="font-size: 60px; margin-bottom: 5px;">
                ${m.agentClass === 'Warrior' ? '⚔️' : 
                  m.agentClass === 'Wizard' ? '🧙‍♂️' : 
                  m.agentClass === 'Ranger' ? '🏹' : 
                  m.agentClass === 'Warlock' ? '🧛‍♂️' : 
                  m.agentClass === 'Healer' ? '🧑‍⚕️' : '👤'}
              </span>
              <span style="color: ${colors.ink}; font-size: 28px; font-weight: 900; text-transform: uppercase; text-align: center;">${m.agentClass}</span>
            </div>
          `).join('')}
          
          ${partyMembers.length > 6 ? `
            <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; background-color: #eee; border: 3px dashed ${colors.border}; padding: 15px; width: 160px;">
              <span style="color: ${colors.ink}; font-size: 32px; font-weight: 900;">+${partyMembers.length - 6} MORE</span>
            </div>
          ` : ''}
        </div>

        <!-- Footer -->
        <div style="position: absolute; bottom: 20px; left: 40px; right: 40px; display: flex; justify-content: space-between; border-top: 2px solid rgba(44,30,22,0.2); padding-top: 10px;">
          <span style="color: ${colors.ink}; font-size: 24px; font-weight: 900; text-transform: uppercase;">agentsparty.dev</span>
          <span style="color: ${colors.ink}; font-size: 24px; font-weight: 900; text-transform: uppercase;">A Retro-Brutalist Orchestrator</span>
        </div>

      </div>
    </div>
  `;

  const svg = await satori(markup, {
    width: 1200,
    height: 630,
    fonts: [
      {
        name: 'VT323',
        data: fontData,
        weight: 400,
        style: 'normal',
      },
    ],
  });

  const resvg = new Resvg(svg, {
    fitTo: {
      mode: 'width',
      value: 1200,
    },
  });

  const pngData = resvg.render();
  const pngBuffer = pngData.asPng();

  return new Response(pngBuffer, {
    headers: {
      'Content-Type': 'image/png',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
};
