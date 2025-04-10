import { useRef, useState } from 'react';
import ChatInputController from '@/components/Chat/ChatInput/ChatInputController';
import { ChatInput } from '@/components/Chat/ChatInput';
import { ModelResponse } from '@/components/Chat/ModelResponse';
import ItemsController from '@/components/Chat/ItemsController';
import { EModel } from '@/types/Model';
import { useParams } from 'next/navigation';
import SelectionController from '@/components/Chat/SelectionController';
import SelectionPopover from '@/components/Chat/SelectionPopover';
import SnippetsController from '@/components/Snippets/SnippetsController';

interface IProps {
  model: EModel;
  snippetsController: SnippetsController;
}

export function Chat({ model, snippetsController }: IProps) {
  const { chatId } = useParams<{ chatId?: string }>();
  const [inputController] = useState(new ChatInputController());
  const [itemsController] = useState(new ItemsController(chatId));
  itemsController.useController();
  const ref = useRef<HTMLDivElement>(null);
  const [selectionController] = useState(new SelectionController(ref));
  const { items } = itemsController.state;

  return (
    <div className="h-full flex flex-col">
      <div
        ref={ref}
        className="grow overflow-auto flex flex-col gap-y-6"
        onScroll={selectionController.onUpdate}
      >
        {items.map((v) => (
          <ModelResponse
            key={String(v._id)}
            modelResponse={v}
          />
        ))}
        <SelectionPopover
          controller={selectionController}
          onClickMessage={inputController.setText}
          onClickClip={snippetsController.onAdd}
        />
      </div>
      <div className="shrink-0 py-4 relative z-20 bg-white">
        <ChatInput
          model={model}
          controller={inputController}
          onSubmit={itemsController.sendInput}
        />
      </div>
    </div>
  );
}
