import { useState } from 'react';
import ChatInputController from '@/components/Chat/ChatInput/ChatInputController';
import { ChatInput } from '@/components/Chat/ChatInput';
import { ModelResponse } from '@/components/Chat/ModelResponse';
import ItemsController from '@/components/Chat/ItemsController';
import { EModel } from '@/types/Model';
import { useParams } from 'next/navigation';

interface IProps {
  model: EModel;
}

export function Chat({ model }: IProps) {
  const { chatId } = useParams<{ chatId?: string }>();
  const [inputController] = useState(new ChatInputController());
  const [itemsController] = useState(new ItemsController(chatId));
  itemsController.useController();

  const { items } = itemsController.state;

  return (
    <div className="h-full flex flex-col gap-y-4">
      <div className="grow overflow-auto flex flex-col gap-y-6">
        {items.map((v) => (
          <ModelResponse
            key={String(v._id)}
            modelResponse={v}
          />
        ))}
      </div>
      <div className="shrink-0">
        <ChatInput
          model={model}
          controller={inputController}
          onSubmit={itemsController.sendInput}
        />
      </div>
    </div>
  );
}
