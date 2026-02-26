import JSZip from 'jszip';
import type { ExportFile } from './adapters';

export class OrchestrationCourier {
  /**
   * Packages the generated files into a ZIP blob ready for download.
   */
  static async generateZip(files: ExportFile[]): Promise<Blob> {
    const zip = new JSZip();

    files.forEach((file) => {
      zip.file(file.path, file.content);
    });

    return await zip.generateAsync({ type: 'blob' });
  }

  /**
   * Triggers a browser download for the given blob.
   */
  static downloadBlob(blob: Blob, filename: string): void {
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }
}
