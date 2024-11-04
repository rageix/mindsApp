import { PropsWithChildren } from 'react';
import { OctagonAlertIcon } from 'lucide-react';
import Alert from '@/components/Alert';

interface Props extends PropsWithChildren {
  className?: string;
  onClick?: () => void;
}

export default function DangerAlert({ className, onClick, children }: Props) {
  return (
    <Alert
      variant="red"
      onClick={onClick}
      className={className}
    >
      <div className="flex">
        <div className="flex-shrink-0">
          <OctagonAlertIcon
            aria-hidden="true"
            className="h-5 w-5 text-red-500"
          />
        </div>
        <div className="ml-3">
          <p className="text-sm text-red-800">{children}</p>
        </div>
      </div>
    </Alert>
  );
}
