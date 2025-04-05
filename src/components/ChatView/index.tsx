'use client';
import DashboardPageHeader from '@/components/DashboardPageHeader';
import { ISelectOption } from '@/types/SelectOption';
import { EModel } from '@/types/Model';
import { useState } from 'react';
import SidebarItem from '@/components/ChatView/SidebarItem';
import { Chat } from '@/components/Chat';

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

  return (
    <div className="absolute h-[calc(100%-64px)] w-full top-[64px] left-0 right-0">
      <div className="max-w-2xl p-3 mx-auto h-full">
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
            <Chat model={model} />
            {/*  todo: add previous chats to load here */}
          </div>
        </div>
      </div>
    </div>
  );
}
