export function dotProduct(a: number[], b: number[]): number {
  let product = 0;

  // Loop for calculate dot product
  for (let i = 0, len = a.length; i < len; i++) product = product + a[i] * b[i];
  return product;
}
