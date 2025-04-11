import { PropsWithChildren } from 'react';
import { HelpCircleIcon } from 'lucide-react';
import Alert from '@/components/Alert';

interface Props extends PropsWithChildren {
  className?: string;
  onClick?: () => void;
}

export default function InfoAlert({ className, onClick, children }: Props) {
  return (
    <Alert
      variant="sky"
      onClick={onClick}
      className={className}
    >
      <div className="flex">
        <div className="flex-shrink-0">
          <HelpCircleIcon
            aria-hidden="true"
            className="h-5 w-5 text-sky-600"
          />
        </div>
        <div className="ml-3">
          <div className="text-sm text-sky-800">{children}</div>
        </div>
      </div>
    </Alert>
  );
}
