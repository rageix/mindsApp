export function getDiff(num1: number, num2: number): number {
  if (num1 > num2) {
    return num1 - num2
  } else {
    return num2 - num1
  }
}