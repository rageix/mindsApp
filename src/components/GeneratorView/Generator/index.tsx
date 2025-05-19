'use client';

import { IGenerator } from '@/types/Generator';
import { EModel } from '@/types/Model';
import { ReactElement } from 'react';
import Model from '@/components/GeneratorView/Model';

interface IProps {
  value: IGenerator | null;
}

export default function Generator({ value }: IProps) {
  if(!value) {
    return null;
  }

  console.log('value', value);

  const out: ReactElement[] = [];

  for(const [k,v] of Object.entries(value.output)) {
    if(v !== null) {
      out.push(<Model key={k} model={k as EModel} text={v}/>);
    }
  }


  return out;

}
