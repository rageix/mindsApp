export function pageTitle(arg: string): string {
  const out = 'minds';

  if(arg) {
    return out + ' - ' + arg;
  }

  return out;
}