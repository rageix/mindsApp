'use client';
import { Chat } from '@/components/Chat';
import ChatController from '@/components/Chat/ChatController';
import { MenuItem } from '@headlessui/react';
import MenuItemButton from '@/components/MenuItemButton';
import EllipsisMenu from '@/components/EllipsisMenu';
import Button from '@/components/Buttton';
import {
  Maximize2Icon,
  Minimize2Icon,
  PanelTopCloseIcon,
  PanelTopOpenIcon,
} from 'lucide-react';
import { cn } from '@/util/Cn';
import ChatsModal from '@/components/ChatsModal';
import { useRef, useState } from 'react';
import useSize from '@/hooks/UseSize';
import RenameFormController from '@/components/RenameForm/RenameFormController';
import RenameModal from '@/components/RenameModal';

interface IProps {
  controller: ChatController;
  onClickRemove: () => void;
  onClickMaximize: () => void;
  isMaximized?: boolean;
  canRemove: boolean;
  isGlobalSearchVisible: boolean;
  onClickGlobalSearchVisible: () => void;
  onClickNext?: () => void;
  onClickPrev?: () => void;
}

export default function ChatWrapper({
  controller,
  onClickRemove,
  onClickMaximize,
  isMaximized,
  canRemove,
  isGlobalSearchVisible,
  onClickGlobalSearchVisible,
  onClickNext,
  onClickPrev
}: IProps) {
  const ref = useRef(null);
  const size = useSize(ref);
  const [isChatModalVisible, setIsChatModalVisible] = useState(false);
  const [isRenameModalVisible, setIsRenameModalVisible] = useState(false);
  const [renameController] = useState(new RenameFormController());
  controller.useController();
  const { state } = controller;

  return (
    <>
      <div
        ref={ref}
        className={cn(
          'flex flex-col rounded-xl border border-gray-200 bg-white shadow-md h-full overflow-hidden',
          state.maximize ? 'absolute top-0 left-0 right-0 bottom-0' : null,
        )}
      >
        <div className="bg-100 flex px-3 py-2 bg-gray-200 items-center">
          <div className="grow truncate text-base font-semibold text-gray-900">
            {state.name || 'Chat'}
          </div>
          <div className="shink-0 flex gap-x-1">
            <div>
              <Button
                variant="link"
                onClick={onClickGlobalSearchVisible}
                className="!text-gray-500 hover:!text-gray-400"
              >
                {isGlobalSearchVisible ? (
                  <PanelTopCloseIcon className="size-5" />
                ) : (
                  <PanelTopOpenIcon className="size-5" />
                )}
              </Button>
            </div>
            <div>
              <Button
                variant="link"
                onClick={onClickMaximize}
                className="!text-gray-500 hover:!text-gray-400"
              >
                {!isMaximized ? (
                  <Maximize2Icon className="size-5" />
                ) : (
                  <Minimize2Icon className="size-5" />
                )}
              </Button>
            </div>
            <EllipsisMenu>
              <MenuItem>
                <MenuItemButton onClick={controller.onNew}>New</MenuItemButton>
              </MenuItem>
              <MenuItem>
                <MenuItemButton
                  onClick={() => {
                    setIsChatModalVisible(true);
                  }}
                >
                  Open
                </MenuItemButton>
              </MenuItem>
              <MenuItem>
                <MenuItemButton
                  onClick={() => {
                    renameController.defaultForm = { name: state.name };
                    setIsRenameModalVisible(true);
                  }}
                >
                  Rename
                </MenuItemButton>
              </MenuItem>
              <MenuItem>
                <MenuItemButton
                  onClick={onClickRemove}
                  disabled={!canRemove}
                >
                  Remove
                </MenuItemButton>
              </MenuItem>
            </EllipsisMenu>
          </div>
        </div>
        <div className="h-full" style={{ maxHeight: size?.height ? size.height - 49 : '100%' }}>
          <Chat
            controller={controller}
            isMaximized={isMaximized}
            onClickNext={onClickNext}
            onClickPrev={onClickPrev}
          />
        </div>
      </div>
      <ChatsModal
        open={isChatModalVisible}
        onClose={() => setIsChatModalVisible(false)}
        onOpenId={(_id) => {
          setIsChatModalVisible(false);
          controller.loadId(_id);
        }}
      />
      <RenameModal
        controller={renameController}
        open={isRenameModalVisible}
        onClose={() => setIsRenameModalVisible(false)}
        onSubmit={(name: string) => {
          controller.onChangeName(name);
          setIsRenameModalVisible(false);
        }}
      />
    </>
  );
}
