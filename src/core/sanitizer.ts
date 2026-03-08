/**
 * Basic sanitization to prevent script and HTML injection.
 * This is especially important for shared configurations via URL.
 */
export function sanitizeString(input: string): string {
  if (typeof input !== 'string') return '';

  // Remove any HTML/XML like tags
  return input.replace(/<\/?[^>]+(>|$)/g, '');
}

/**
 * Recursively sanitizes an entire object or array
 */
export function sanitizeConfig<T>(obj: T): T {
  if (typeof obj === 'string') {
    return sanitizeString(obj) as unknown as T;
  }
  if (Array.isArray(obj)) {
    return obj.map((item) => sanitizeConfig(item)) as unknown as T;
  }
  if (typeof obj === 'object' && obj !== null) {
    const sanitizedObj: Record<string, unknown> = {};
    for (const key in obj) {
      sanitizedObj[key] = sanitizeConfig((obj as Record<string, unknown>)[key]);
    }
    return sanitizedObj as T;
  }
  return obj;
}
