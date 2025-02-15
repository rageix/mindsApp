export interface ILinkEditor {
  url: string
}

export function newILinkEditor(): ILinkEditor {
  return {
    url: ''
  }
}