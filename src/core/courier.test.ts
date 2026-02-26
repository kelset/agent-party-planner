import { describe, expect, it } from 'bun:test';
import { OrchestrationCourier } from './courier';
import type { ExportFile } from './adapters';

describe('OrchestrationCourier', () => {
  it('should generate a zip blob from a set of files', async () => {
    const files: ExportFile[] = [
      { path: 'test.md', content: 'hello world' },
      { path: 'folder/test2.md', content: 'hello world 2' },
    ];

    const blob = await OrchestrationCourier.generateZip(files);

    expect(blob).toBeInstanceOf(Blob);
    expect(blob.size).toBeGreaterThan(0);
    expect(blob.type).toBe('application/zip');
  });
});
