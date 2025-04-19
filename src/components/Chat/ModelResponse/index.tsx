import { IModelResponse } from '@/types/HistoryItem';
import { Clipboard, Repeat2Icon } from 'lucide-react';
import { ModelContent } from '@/components/Chat/ModelResponse/ModelContent';
import Loading from '@/components/Loading';
import Button from '@/components/Buttton';
import ElementTooltip from '@/components/ElementTooltip';
import { useRef } from 'react';

interface IProps {
  modelResponse?: IModelResponse;
  inputText?: string;
  isLoading?: boolean;
  onClickRepeat?: () => void;
}

export function ModelResponse({
  modelResponse,
  inputText,
  isLoading = false,
  onClickRepeat,
}: IProps) {
  const outputRef = useRef<HTMLDivElement>(null);

  return (
    <div className="flex flex-col gap-y-2 relative">
      <div className="flex gap-x-3">
        <div className="grow rounded-xl bg-blue-50 items-center py-2 px-4">
          {isLoading ? (
            <div>{inputText}</div>
          ) : (
            <ModelContent content={modelResponse?.input || []} />
          )}
        </div>
      </div>
      <div className="flex gap-x-3">
        <div
          ref={outputRef}
          className="grow rounded items-center "
        >
          {isLoading ? (
            <div className="p-3 pt-4 flex justify-start">
              <Loading />
            </div>
          ) : (
            <ModelContent content={modelResponse?.output || []} />
          )}
        </div>
      </div>
      {!isLoading && (
        <div className="flex gap-x-3">
          <div className="grow truncate text-sm text-gray-500 flex items-end">
            {modelResponse?.modelVersion || modelResponse?.model}
          </div>
          <div className="flex gap-x-2 shrink-0">
            {onClickRepeat && (
              <ElementTooltip tooltip="Repeat">
                <Button
                  variant="link"
                  className="!text-sm"
                  isInline
                  onClick={onClickRepeat}
                >
                  <span className="sr-only">Repeat</span>
                  <Repeat2Icon />
                </Button>
              </ElementTooltip>
            )}
            <ElementTooltip tooltip="Copy">
              <Button
                variant="link"
                className="!text-sm"
                isInline
                onClick={() =>
                  navigator.clipboard.writeText(
                    outputRef.current?.innerText || '',
                  )
                }
              >
                <span className="sr-only">Copy To Clipboard</span>
                <Clipboard />
              </Button>
            </ElementTooltip>
          </div>
        </div>
      )}
    </div>
  );
}
