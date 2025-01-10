'use client';
import { PropsWithChildren } from 'react';

interface IProps extends PropsWithChildren {
  onClick: () => void
}

export default function SectionItemHeader({ onClick, children }: IProps) {
  return <div onClick={onClick}>{children}</div>;
}
