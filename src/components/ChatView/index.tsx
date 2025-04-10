'use client';
import { ISelectOption } from '@/types/SelectOption';
import { EModel } from '@/types/Model';
import { useState } from 'react';
import SidebarItem from '@/components/ChatView/SidebarItem';
import { Chat } from '@/components/Chat';
import IdeaBoardController from '@/components/IdeaBoard/IdeaBoardController';
import Button from '@/components/Buttton';
import { IdeaBoard } from '../IdeaBoard';

const modelOptions: ISelectOption<EModel>[] = [
  {
    key: EModel.ChatGPT4o,
    value: EModel.ChatGPT4o,
    label: 'ChatGPT 4o',
  },
  {
    key: EModel.Gemini2,
    value: EModel.Gemini2,
    label: 'Gemini 2.0',
  },
];

export default function ChatView() {
  const [model, setModel] = useState<EModel>(EModel.ChatGPT4o);
  const [ideaBoardController] = useState(new IdeaBoardController());

  return (
    <div className="absolute h-[calc(100%-64px)] w-full top-[64px] left-0 right-0">
      <div className="max-w-5xl px-3 pt-3 mx-auto h-full">
        <div className="flex gap-x-3 h-full">
          <div className="shrink-0 flex flex-col gap-y-3">
            {modelOptions.map((v) => (
              <SidebarItem
                key={v.value}
                option={v}
                onClick={() => setModel(v.value)}
                isSelected={model === v.value}
              />
            ))}
          </div>
          <div className="grow">
            <Chat
              model={model}
              snippetsController={ideaBoardController}
            />
            {/*  todo: add previous chats to load here */}
          </div>
          <div className="shrink-0 w-88 flex flex-col gap-y-3 p-3 border border-gray-200 mb-3 bg-white">
            <div className="shrink-0">
              <h2>Idea Board</h2>
            </div>
            <div className="flex flex-col gap-y-3 overflow-y-auto grow">
              <IdeaBoard controller={ideaBoardController} />
            </div>
            <div className="shrink-0">
              <Button
                variant="sky"
                onClick={() => ideaBoardController.onAdd('')}
              >
                Add Item
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
