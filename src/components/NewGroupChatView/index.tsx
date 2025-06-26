'use client';
import { PropsWithChildren, useEffect, useState } from 'react';
import PersonaCard from '@/components/PersonaPicker/PersonaCard';
import { IPersona } from '@/types/Persona';
import NewChatController from '@/components/NewGroupChatView/NewChatController';
import Button from '@/components/Buttton';
import PersonaPicker from '@/components/PersonaPicker';
import DashboardPageHeader from '@/components/DashboardPageHeader';
import { postApiGroupChats } from '@/requests/api/groupChats';
import { useRouter } from 'next/navigation';

interface IProps extends PropsWithChildren {}

export default function NewGroupChatView({}: IProps) {
  const router = useRouter();
  const [showPersonaPicker, setShowPersonaPicker] = useState(true);
  const [controller] = useState(new NewChatController());
  controller.useController();

  const { state } = controller;

  useEffect(() => {
    if (state.selected.length === 0) {
      setShowPersonaPicker(true);
    }
  }, [state.selected]);

  const onClickAdd = (value: IPersona) => {
    setShowPersonaPicker(false);
    controller.onAdd(value);
  };

  const onClickStartChat = async () => {
    const personas = state.selected.map((v) => v.name);
    const response = await postApiGroupChats({ personas });

    if(response) {
      router.push('/dashboard/groupChats/' + response._id);
    }
  }

  if (showPersonaPicker) {
    return (
      <div className="absolute h-[calc(100%)] pt-[4.5rem] lg:pt-0 lg:pl-72 w-full top-0 left-0 right-0 z-0 overflow-hidden">
        <div className="h-full flex flex-col">
          <div className="shrink-0 px-3">
            <DashboardPageHeader title="New Chat" />
          </div>
          <div className="grow overflow-hidden flex flex-col">
            <div className="shrink-0 border-b border-gray-200 pb-5 px-3">
              <h3 className="text-base font-semibold text-gray-900">
                Chose A Persona
              </h3>
            </div>
            <div className="grow flex flex-col p-3 overflow-y-auto">
              <PersonaPicker onClickAdd={onClickAdd} />
            </div>
          </div>
          <div className="shrink-0 flex justify-end gap-x-2 p-3 border-t border-gray-200">
            <Button
              variant="linkRed"
              isInline
              disabled={state.selected.length === 0}
              onClick={() => setShowPersonaPicker(false)}
            >
              Cancel
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="absolute h-[calc(100%)] pt-[4.5rem] lg:pt-0 lg:pl-72 w-full top-0 left-0 right-0 z-0 overflow-hidden">
      <div className="h-full flex flex-col">
        <div className="shrink-0 px-3">
          <DashboardPageHeader title="New Chat" />
        </div>
        <div className="grow flex flex-col overflow-y-auto pb-3">
          <div className="border-b border-gray-200 pb-5 px-3">
            <h3 className="text-base font-semibold text-gray-900">
              Selected Personas
            </h3>
          </div>
          <div className="grow overflow-y-auto pt-3 px-3">
            <div className="grow flex flex-col gap-y-3">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 grow overflow-y-auto pb-3">
                {state.selected.map((v, i) => (
                  <PersonaCard
                    key={`${i}-${v.name}`}
                    value={v}
                    onClickRemove={() => controller.onClickRemove(i)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="shrink-0 flex justify-end gap-x-2 p-3 border-t border-gray-200">
          <Button
            variant="blue"
            isInline
            onClick={() => setShowPersonaPicker(true)}
          >
            Add Another
          </Button>
          <Button
            variant="green"
            isInline
            onClick={onClickStartChat}
          >
            Start Chat
          </Button>
        </div>
      </div>
    </div>
  );
}
