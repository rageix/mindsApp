import { EModel } from '@/types/Model';

export function modelToLabel(model: EModel): string {

  switch (model) {
    case EModel.ChatGPT4o:
      return 'ChatGpt 4o';
    case EModel.Gemini2:
      return 'Gemini 2.0';
    case EModel.Claude37Sonnet:
      return 'Claude 3.7 Sonnet';
    case EModel.NovaPro:
      return 'Amazon Nova Pro';
  }

  return '';
}