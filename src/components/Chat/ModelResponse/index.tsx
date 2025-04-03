import { IModelResponse } from '@/types/HistoryItem';
import { BotIcon, UserIcon } from 'lucide-react';
import { ModelContent } from '@/components/Chat/ModelResponse/ModelContent';

interface IProps {
  modelResponse: IModelResponse;
}

export function ModelResponse({ modelResponse }: IProps) {
  return (
    <div>
      <div className="flex gap-x-3">
        <div className="shrink-0">
          <div className="rounded-full bg-white size-10">
            <UserIcon className="h-full w-auto" />
          </div>
        </div>
        <div className="grow">
          <ModelContent content={modelResponse.input} />
        </div>
      </div>
      <div className="flex gap-x-3">
        <div className="shrink-0">
          <div className="rounded-full bg-white size-10">
            <BotIcon className="h-full w-auto" />
          </div>
        </div>
        <div className="grow">
          <ModelContent content={modelResponse.output} />
        </div>
      </div>
    </div>
  );
}
