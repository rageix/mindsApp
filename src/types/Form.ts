export interface IForm<T> {
  dirty: boolean;
  editable: boolean;
  errors: Record<keyof T, string[]>;
}

export function newIForm<T>(): IForm<T> {
  return {
    dirty: false,
    editable: true,
    errors: {} as Record<keyof T, string[]>,
  };
}
