export function formatAsMoney(
  value: number | undefined | null,
  symbol: string = '$',
): string {
  if (!value) {
    value = 0;
  }

  return (
    symbol +
    new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value)
  );
}
