import React, { PropsWithChildren } from 'react';
import Button from '@/components/Buttton';
import { DownloadIcon, PencilIcon } from 'lucide-react';

interface IProps extends PropsWithChildren {
  onClickEdit?: () => void;
  onClickDownload?: () => void;
}

export default function AiResponse({
  onClickEdit,
  onClickDownload,
  children,
}: IProps) {
  return (
    <div>
      <div className="flex">
        <div className="flex flex-1 justify-end space-x-3 items-center">
          {onClickEdit && (
            <Button
              variant="blue"
              onClick={onClickEdit}
            >
              <PencilIcon />
            </Button>
          )}
          {onClickDownload && (
            <Button
              variant="blue"
              onClick={onClickDownload}
            >
              <DownloadIcon />
            </Button>
          )}
        </div>
      </div>
      <div className="flex items-start space-x-4 mt-3">
        <div className="min-w-0 flex-1">
          <div className="relative">
            <div className="overflow-hidden rounded-lg shadow-sm ring-1 ring-inset ring-white/10 focus-within:ring-2 focus-within:ring-blue-500 bg-white/5">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
