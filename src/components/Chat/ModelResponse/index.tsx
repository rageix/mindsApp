import { IModelResponse } from '@/types/HistoryItem';
import { BotIcon, UserIcon } from 'lucide-react';
import { ModelContent } from '@/components/Chat/ModelResponse/ModelContent';

interface IProps {
  modelResponse: IModelResponse;
}

export function ModelResponse({ modelResponse }: IProps) {
  return (
    <div className="flex flex-col gap-y-2 relative">
      <div className="flex gap-x-3">
        <div className="shrink-0">
          <div className="rounded-full bg-sky-900 text-white size-10 flex justify-center items-center">
            <UserIcon className="size-5" />
          </div>
        </div>
        <div className="grow rounded bg-sky-50 items-center py-2 px-4">
          <ModelContent content={modelResponse.input} />
        </div>
      </div>
      <div className="flex gap-x-3">
        <div className="shrink-0">
          <div className="rounded-full bg-sky-900 text-white size-10 flex justify-center items-center">
            <BotIcon className="size-5" />
          </div>
        </div>
        <div className="grow rounded bg-sky-100 items-center py-2 px-4">
          <ModelContent content={modelResponse.output} />
        </div>
      </div>
    </div>
  );
}
