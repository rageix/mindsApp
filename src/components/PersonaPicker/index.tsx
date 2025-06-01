import { PropsWithChildren, useState } from 'react';
import PersonaCard from '@/components/PersonaPicker/PersonaCard';
import PersonaPickerController from '@/components/PersonaPicker/PersonaPickerController';
import Input from '@/components/Input';
import { IPersona } from '@/types/Persona';

interface IProps extends PropsWithChildren {
  onClickAdd: (value: IPersona) => void;
}

export default function PersonaPicker({ onClickAdd }: IProps) {
  const [controller] = useState(new PersonaPickerController());
  controller.useController();

  const { state } = controller;

  return (
    <div className="grow">
      <div className="grow flex flex-col gap-y-3">
        <div>
          <Input
            value={state.text}
            onChange={controller.onChangeText}
            isClearable
            onClear={controller.onClickClearText}
            placeholder="Search..."
          />
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {state.filtered.map((v) => (
            <PersonaCard
              key={v.name}
              value={v}
              onClickAdd={() => onClickAdd(v)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
