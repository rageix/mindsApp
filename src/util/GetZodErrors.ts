import { SafeParseReturnType } from 'zod';

export function getZodErrors(result: SafeParseReturnType<any, any>): string[] {
  if (!result.success) {
    return result.error.issues.map((v) => v.message);
  }

  return [];
}

export function getZodErrorsObj(
  result: SafeParseReturnType<any, any>,
): Record<string | number, string[]> {
  let out: Record<string | number, string[]> = {};
  if (!result.success) {
    result.error.issues.map((v) => {
      const path = v.path.join('.');
      if (Object.hasOwn(out, path)) {
        out[path].push(v.message);
      } else {
        out[path] = [v.message];
      }
    });
  }

  return out;
}
