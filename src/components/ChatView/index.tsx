'use client';
import { useState } from 'react';
import { Chat } from '@/components/Chat';
import IdeaBoardController from '@/components/IdeaBoard/IdeaBoardController';
import { IdeaBoard } from '../IdeaBoard';
import { useParams } from 'next/navigation';
import ChatController from '@/components/Chat/ChatController';

export default function ChatView() {
  const { chatId } = useParams<{ chatId?: string }>();
  const [controller] = useState(new ChatController(chatId));
  const [ideaBoardController] = useState(new IdeaBoardController());

  return (
    <div className="absolute h-[calc(100%)] pt-[4.5rem] lg:pt-0 lg:pl-72 w-full top-0 left-0 right-0 z-0">
      <div className="h-full">
        <div className="flex h-full">
          <div className="grow">
            <div className="max-w-2xl mx-auto grow h-full">
              <Chat controller={controller} ideaBoardController={ideaBoardController} />
            </div>
          </div>
          <div className="shrink-0 w-88 flex flex-col gap-y-3 p-3 border-l border-gray-200 bg-white">
            <IdeaBoard controller={ideaBoardController} />
          </div>
        </div>
      </div>
    </div>
  );
}
