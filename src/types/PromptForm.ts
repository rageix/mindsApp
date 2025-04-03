export interface IPromptForm {
  prompt: string,
}

export function newIPromptForm(): IPromptForm {
  return {
    prompt: ''
  }
}