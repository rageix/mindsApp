import _ from 'lodash';

interface IMergeOption {
  value: string;
  pre?: string;
}

export function generateTemplateTitle(options: IMergeOption[]): string {
  const out: string[] = [];

  for (const option of options) {
    if (!_.isEmpty(option.value)) {
      if (option.pre) {
        out.push(option.pre);
      }

      out.push(option.value);
    }
  }

  return out.join(' ');
}
