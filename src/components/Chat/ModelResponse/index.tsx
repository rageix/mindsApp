import { IModelResponse } from '@/types/HistoryItem';
import { BotIcon, Clipboard, Repeat2Icon, UserIcon } from 'lucide-react';
import { ModelContent } from '@/components/Chat/ModelResponse/ModelContent';
import Loading from '@/components/Loading';
import Button from '@/components/Buttton';
import ElementTooltip from '@/components/ElementTooltip';

interface IProps {
  modelResponse?: IModelResponse;
  inputText?: string;
  isLoading?: boolean;
}

export function ModelResponse({
  modelResponse,
  inputText,
  isLoading = false,
}: IProps) {
  return (
    <div className="flex flex-col gap-y-2 relative">
      <div className="flex gap-x-3">
        <div className="shrink-0">
          <div className="rounded-full bg-blue-900 text-white size-10 flex justify-center items-center">
            <UserIcon className="size-5" />
          </div>
        </div>
        <div className="grow rounded-xl bg-blue-50 items-center py-2 px-4">
          {isLoading ? (
            <div>{inputText}</div>
          ) : (
            <ModelContent content={modelResponse?.input || []} />
          )}
        </div>
      </div>
      <div className="flex gap-x-3">
        <div className="shrink-0">
          <div className="rounded-full bg-blue-900 text-white size-10 flex justify-center items-center">
            <BotIcon className="size-5" />
          </div>
        </div>
        <div className="grow rounded items-center ">
          {isLoading ? (
            <div className="p-3 pt-4 flex justify-start">
              <Loading />
            </div>
          ) : (
            <ModelContent content={modelResponse?.output || []} />
          )}
        </div>
      </div>
      <div className="flex justify-end gap-x-2">
        <ElementTooltip tooltip="Repeat">
          <Button
            variant="link"
            className="!text-sm"
            isInline
          >
            <span className="sr-only">Repeat</span>
            <Repeat2Icon />
          </Button>
        </ElementTooltip>
        <ElementTooltip tooltip="Copy">
          <Button
            variant="link"
            className="!text-sm"
            isInline
          >
            <span className="sr-only">Copy To Clipboard</span>
            <Clipboard />
          </Button>
        </ElementTooltip>
      </div>
    </div>
  );
}
