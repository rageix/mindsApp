import { ReactElement } from 'react';

interface IProps {
  title: string;
  icon: ReactElement;
  onClick: () => void;
}

export default function ControlBarIcon({ title, icon, onClick }: IProps) {
  return (
    <div
      className="flex flex-col justify-center items-center w-16 h-16 rounded-md text-sm font-semibold leading-6 shadow-sm focus-visible:outline focus-visible:outline-2 bg-indigo-700 hover:bg-indigo-600 active:bg-indigo-800 focus-visible:outline-indigo-700"
      onClick={onClick}
    >
      <div className="w-6 h-6">{icon}</div>
      <div>{title}</div>
    </div>
  );
}
