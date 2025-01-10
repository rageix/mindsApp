'use client';
import { PropsWithChildren } from 'react';

interface IProps extends PropsWithChildren {
}

export default function SectionItemBody({ children }: IProps) {
  return <div >{children}</div>;
}
