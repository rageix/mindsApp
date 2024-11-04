import { PropsWithChildren } from 'react';
import { CircleCheck } from 'lucide-react';
import Alert from '@/components/Alert';

interface Props extends PropsWithChildren {
  className?: string;
  onClick?: () => void;
}

export default function SuccessAlert({ className, onClick, children }: Props) {
  return (
    <Alert
      variant="green"
      onClick={onClick}
      className={className}
    >
      <div className="flex">
        <div className="flex-shrink-0">
          <CircleCheck
            aria-hidden="true"
            className="h-5 w-5 text-green-500"
          />
        </div>
        <div className="ml-3">
          <p className="text-sm text-green-800">{children}</p>
        </div>
      </div>
    </Alert>
  );
}
