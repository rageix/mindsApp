import { cn } from '@/util/Cn';
import { ReactElement } from 'react';
import Button from '@/components/Buttton';

interface IProps {
  title: string;
  icon: ReactElement;
  onClick: () => void;
  isActive: boolean;
}

export default function ControlBarIcon({
  title,
  icon,
  onClick,
  isActive,
}: IProps) {
  return (
    <Button
      variant="blue"
      className={cn('!w-16 !h-16 !flex !flex-col', isActive ? '!bg-blue-800' : '')}
      onClick={onClick}
    >
      {/*<div*/}
      {/*  className={cn(*/}
      {/*    'flex flex-col justify-center items-center w-16 h-16 rounded-md text-sm font-semibold leading-6 shadow-sm focus-visible:outline focus-visible:outline-2 bg-indigo-700 hover:bg-indigo-600 active:bg-indigo-800 focus-visible:outline-indigo-700',*/}
      {/*    isActive ? '' : '',*/}
      {/*  )}*/}
      {/*  onClick={onClick}*/}
      {/*>*/}
        <div className="w-6 h-6">{icon}</div>
        <div>{title}</div>
      {/*</div>*/}
    </Button>
  );
}
