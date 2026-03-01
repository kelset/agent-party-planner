import { describe, it, expect } from 'bun:test';
import { sanitizeString, sanitizeConfig } from './sanitizer';

describe('Sanitizer', () => {
  describe('sanitizeString', () => {
    it('should leave normal strings untouched', () => {
      expect(sanitizeString('Hello World')).toBe('Hello World');
      expect(sanitizeString('Quest 123')).toBe('Quest 123');
    });

    it('should strip HTML tags', () => {
      expect(sanitizeString('<script>alert(1)</script>')).toBe('alert(1)');
      expect(sanitizeString('<b>Bold</b>')).toBe('Bold');
      expect(sanitizeString('<img src="x" onerror="alert(1)" />')).toBe('');
      expect(sanitizeString('Text with <iframe>iframe</iframe> embedded')).toBe('Text with iframe embedded');
    });

    it('should handle non-string inputs gracefully by returning an empty string', () => {
      expect(sanitizeString(null as any)).toBe('');
      expect(sanitizeString(undefined as any)).toBe('');
      expect(sanitizeString(123 as any)).toBe('');
    });
  });

  describe('sanitizeConfig', () => {
    it('should sanitize nested string properties in objects', () => {
      const input = {
        questName: '<b>My Quest</b>',
        deep: {
          description: '<script>evil()</script>Text',
          number: 42,
        },
      };

      const expected = {
        questName: 'My Quest',
        deep: {
          description: 'evil()Text',
          number: 42,
        },
      };

      expect(sanitizeConfig(input)).toEqual(expected);
    });

    it('should sanitize strings inside arrays', () => {
      const input = ['<p>Paragraph</p>', 'Normal', { html: '<i>Italic</i>' }];
      const expected = ['Paragraph', 'Normal', { html: 'Italic' }];

      expect(sanitizeConfig(input)).toEqual(expected);
    });

    it('should preserve nulls and booleans', () => {
      const input = {
        isValid: true,
        data: null,
        text: '<span>Span</span>',
      };
      const expected = {
        isValid: true,
        data: null,
        text: 'Span',
      };

      expect(sanitizeConfig(input)).toEqual(expected);
    });
  });
});
