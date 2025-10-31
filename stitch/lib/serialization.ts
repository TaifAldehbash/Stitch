import { layoutSchema, type Layout } from '@/lib/schema';

export function downloadJSON(filename: string, data: unknown) {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename.endsWith('.json') ? filename : `${filename}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

export function parseLayoutJSON(raw: string): { ok: true; data: Layout } | { ok: false; issues: string } {
    try {
      const json = JSON.parse(raw);
      const parsed = layoutSchema.safeParse(json);
      if (!parsed.success) {
        const issues = parsed.error.issues
          .map((i) => `${i.path.join('.')} — ${i.message}`)
          .join('\n');
        return { ok: false, issues };
      }
      return { ok: true, data: parsed.data };
    } catch (e: any) {
      return { ok: false, issues: e?.message || 'Invalid JSON' };
    }
  }