'use client';
import IdeaBoardController from '@/components/IdeaBoard/IdeaBoardController';
import { cn } from '@/util/Cn';
import { useState } from 'react';
import RenameFormController from '@/components/RenameForm/RenameFormController';
import RenameModal from '@/components/RenameModal';
import { BreakPoints } from '@/common/BreakPoints';
import { IdeaBoard } from '@/components/IdeaBoard';
import IdeaBoardsModal from '@/components/IdeaBoardsModal';
import useWindowSizes from '@/hooks/UseWindowSizes';
import { MenuItem } from '@headlessui/react';
import MenuItemButton from '@/components/MenuItemButton';
import EllipsisMenu from '@/components/EllipsisMenu';

interface IProps {
  controller: IdeaBoardController;
  isOpen: boolean;
  onHide: () => void;
}

export default function IdeaBoardWrapper({
  controller,
  isOpen,
  onHide,
}: IProps) {
  const windowSizes = useWindowSizes();
  const [isRenameModalVisible, setIsRenameModalVisible] = useState(false);
  const [isOpenModalVisible, setIsOpenModalVisible] = useState(false);
  const [renameController] = useState(new RenameFormController());
  controller.useController();
  const { state } = controller;

  return (
    <>
      <div
        className={cn('relative z-10', !isOpen ? 'hidden' : null)}
        onClick={() => console.log('onclick')}
      >
        {/*<div className="fixed inset-0" />*/}

        {/*<div className="fixed inset-0 overflow-hidden">*/}
        {/*<div>*/}
        <div className="absolute inset-0 overflow-hidden">
          <div className=" fixed inset-y-0 right-0 flex max-w-full">
            <div
              className={cn(
                'pointer-events-auto w-screen max-w-md transform transition duration-500 ease-in-out data-[closed]:translate-x-full sm:duration-700',
                windowSizes.pageWidth < BreakPoints.lg ? 'pt-[72px]' : null,
              )}
            >
              <div className="rounded-l-xl bg-white overflow-hidden shadow-xl h-full border-l border-b border-t border-gray-200">
                <div className="flex h-full flex-col overflow-y-scroll pb-6 ">
                  <div className="bg-gray-200 px-3 py-2">
                    <div className="flex items-center justify-between">
                      <div className="text-base font-semibold text-gray-900">
                        {state?.name || 'Idea Board'}
                      </div>
                      <div className="ml-3 flex h-7 items-center">
                        <EllipsisMenu>
                          <MenuItem>
                            <MenuItemButton onClick={controller.onNew}>
                              New
                            </MenuItemButton>
                          </MenuItem>
                          <MenuItem>
                            <MenuItemButton
                              onClick={() => {
                                setIsOpenModalVisible(true);
                              }}
                            >
                              Open
                            </MenuItemButton>
                          </MenuItem>
                          <MenuItem>
                            <MenuItemButton onClick={() => controller.onSave()}>
                              Save
                            </MenuItemButton>
                          </MenuItem>
                          <MenuItem>
                            <MenuItemButton
                              onClick={() => {
                                renameController.defaultForm = {
                                  name: state.name,
                                };
                                setIsRenameModalVisible(true);
                              }}
                            >
                              Rename
                            </MenuItemButton>
                          </MenuItem>
                          <MenuItem>
                            <MenuItemButton onClick={() => onHide()}>
                              Hide
                            </MenuItemButton>
                          </MenuItem>

                        </EllipsisMenu>
                      </div>
                    </div>
                  </div>
                  <div className="relative mt-6 flex-1 px-4 sm:px-6 h-full">
                    <IdeaBoard controller={controller} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <IdeaBoardsModal
        open={isOpenModalVisible}
        onClose={() => setIsOpenModalVisible(false)}
        onOpenId={(_id) => {
          setIsOpenModalVisible(false);
          controller.loadId(_id);
        }}
        onNew={controller.onNew}
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
