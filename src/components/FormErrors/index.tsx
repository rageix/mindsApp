import { DetailedHTMLProps, HTMLAttributes, useMemo } from 'react';

interface Props<T>
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  field: keyof T;
  errors: Record<keyof T, string[]>;
}

export default function FormErrors<T>(props: Props<T>) {
  const internal = useMemo(() => {
    if (props.field) {
      const field = String(props.field);
      return {
        id: field + 'Errors',
      };
    }
    return {};
  }, [props.field, props.errors]);

  const errors = useMemo(() => props.errors[props.field] || [], [props.errors]);

  return (
    <div
      {...internal}
      {...props}
    >
      {errors.map((v, i) => (
        <p
          key={i}
          className="text-red-400"
        >
          {v}
        </p>
      ))}
    </div>
  );
}
