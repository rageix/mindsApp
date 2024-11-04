import { DetailedHTMLProps, HTMLAttributes, useMemo } from 'react';

interface Props
  extends DetailedHTMLProps<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement> {
  value: boolean | undefined;
}

export default function FormattedBoolean(props: Props) {
  const label = useMemo(() => (props.value ? 'True' : 'False'), [props.value]);

  if (props.value === undefined) {
    return null;
  }

  return <span {...props}>{label}</span>;
}
