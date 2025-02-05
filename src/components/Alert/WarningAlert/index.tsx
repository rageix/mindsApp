import { PropsWithChildren } from 'react';
import { TriangleAlert } from 'lucide-react';
import Alert from '@/components/Alert';

interface Props extends PropsWithChildren {
  className?: string;
  onClick?: () => void;
}

export default function WarningAlert({ className, onClick, children }: Props) {
  return (
    <Alert
      variant="yellow"
      onClick={onClick}
      className={className}
    >
      <div className="flex">
        <div className="flex-shrink-0">
          <TriangleAlert
            aria-hidden="true"
            className="h-5 w-5 text-yellow-600"
          />
        </div>
        <div className="ml-3 grow">
          <p className="text-sm text-yellow-800">{children}</p>
        </div>
      </div>
    </Alert>
  );
}
