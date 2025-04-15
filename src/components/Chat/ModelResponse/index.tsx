import { IModelResponse } from '@/types/HistoryItem';
import { BotIcon, UserIcon } from 'lucide-react';
import { ModelContent } from '@/components/Chat/ModelResponse/ModelContent';
import Loading from '@/components/Loading';
import { MenuItem } from '@headlessui/react';
import MenuItemButton from '@/components/MenuItemButton';
import EllipsisMenu from '@/components/EllipsisMenu';

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
        <div className="grow rounded bg-blue-50 items-center py-2 px-4 flex">
          <div className="grow">
          {isLoading ? (
            <div>{inputText}</div>
          ) : (
            <ModelContent content={modelResponse?.input || []} />
          )}
        </div>

        <div className="shrink-0">
          <EllipsisMenu>
            <MenuItem>
              <MenuItemButton
                onClick={() => console.log('clicked')}
              >
                Submit Again
              </MenuItemButton>
            </MenuItem>
          </EllipsisMenu>
        </div>
        </div>
      </div>
      <div className="flex gap-x-3">
        <div className="shrink-0">
          <div className="rounded-full bg-blue-900 text-white size-10 flex justify-center items-center">
            <BotIcon className="size-5" />
          </div>
        </div>
        <div className="grow rounded bg-blue-100 items-center py-2 px-4">
          {isLoading ? (
            <div className="p-3 pt-4 flex justify-start">
              <Loading />
            </div>
          ) : (
            <ModelContent content={modelResponse?.output || []} />
          )}
        </div>
      </div>
    </div>
  );
}
