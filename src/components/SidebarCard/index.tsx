import { PropsWithChildren, ReactElement } from 'react';

interface IProps extends PropsWithChildren {
  title: string;
  actionElement?: ReactElement;
}

export default function SidebarCard({
  title,
  actionElement,
  children,
}: IProps) {
  return (
    <div className="">
      <div className="flex flex-wrap items-center justify-between sm:flex-nowrap">
        <div className="">
          <h3 className="text-base font-semibold leading-6">{title}</h3>
        </div>
        {actionElement && (
          <div className="ml-2 flex-shrink-0">{actionElement}</div>
        )}
      </div>
      {children}
    </div>
  );
}
