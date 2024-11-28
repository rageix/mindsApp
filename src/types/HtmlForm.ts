export interface IHtmlForm<T> {
  dirty: boolean;
  editable: boolean;
  errors: Record<keyof T, string[]>;
}

export function newIHtmlForm<T>(): IHtmlForm<T> {
  return {
    dirty: false,
    editable: true,
    errors: {} as Record<keyof T, string[]>,
  };
}
