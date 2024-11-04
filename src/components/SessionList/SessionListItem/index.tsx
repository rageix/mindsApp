import { ReactElement } from 'react';

interface IProps {
  label: string;
  value: string | ReactElement;
}

export default function SessionListItem({ label, value }: IProps) {
  return (
    <div className="text-sm">
      <label className="font-medium text-blue-300">{label}</label>
      <p className="mt-1 text-white">{value}</p>
    </div>
  );
}
