import { PropsWithChildren } from 'react';

interface IProps extends PropsWithChildren {}

export default function SettingsSectionHeader({ children }: IProps) {
  return (
    <div className="">
      <h3 className="text-md font-bold leading-7 text-white sm:truncate sm:text-lg sm:tracking-tight">
        {children}
      </h3>
    </div>
  );
}
