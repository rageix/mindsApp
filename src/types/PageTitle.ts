export function pageTitle(arg: string): string {
  const out = 'Hobort';

  if(arg) {
    return out + ' - ' + arg;
  }

  return out;
}