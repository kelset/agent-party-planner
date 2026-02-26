import type { OrchestrationConfig } from './types';
import { getAdapter, type Platform, type ExportFile } from './adapters';

export class OrchestrationForge {
  /**
   * Generates the files needed for the orchestration package
   * based on the selected target platform.
   */
  static forgePackage(
    config: OrchestrationConfig,
    platform: Platform = 'markdown'
  ): ExportFile[] {
    const adapter = getAdapter(platform);
    return adapter.generate(config);
  }
}
