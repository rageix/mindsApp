import { useState } from 'react';
import ChatInputController
  from '@/components/Chat/ChatInput/ChatInputController';
import { IModelResponse } from '@/types/HistoryItem';

export function Chat() {
  const [inputController] = useState(new ChatInputController());
  const [items, setItems] = useState<IModelResponse[]>([]);

  return (
    <div>

    </div>
  )
}