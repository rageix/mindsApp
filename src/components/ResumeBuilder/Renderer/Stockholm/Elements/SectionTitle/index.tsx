import { PropsWithChildren } from 'react';

interface IProps extends PropsWithChildren{
}

export default function SectionTitle({children}: IProps) {

  return (
    <h2>
      {children}
    </h2>
  )
}