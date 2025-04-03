export function pageTitle(arg: string): string {
  const out = 'gigabrainai';

  if(arg) {
    return out + ' - ' + arg;
  }

  return out;
}