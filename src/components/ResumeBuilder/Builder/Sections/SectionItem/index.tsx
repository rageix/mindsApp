'use client';
import { PropsWithChildren } from 'react';

interface IProps extends PropsWithChildren {
}

export default function SectionItem({ children }: IProps) {
  return <div className="border rounded-md p-3">{children}</div>;
}
