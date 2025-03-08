'use client';
import FormLabel from '@/components/FormLabel';
import Input from '@/components/Input';
import LinkFormController, {
  IForm,
} from '@/components/ResumeBuilder/Builder/Sections/Link/LinkForm/LinkFormController';
import SectionItem from '@/components/ResumeBuilder/Builder/Sections/SectionItem';
import SectionItemHeader from '@/components/ResumeBuilder/Builder/Sections/SectionItemHeader';
import SectionItemBody from '@/components/ResumeBuilder/Builder/Sections/SectionItemBody';
import { useRef } from 'react';
import DraggableItem from '@/components/ResumeBuilder/Builder/Sections/DraggableItem';
import { ERBType } from '@/types/Resume';

interface IProps {
  controller: LinkFormController;
}

export default function LinkForm({ controller }: IProps) {
  controller.useController();
  const dragRef = useRef<HTMLDivElement | null>(null);
  const dragHandleRef = useRef<HTMLButtonElement>(null);

  const { form, state } = controller;

  return (
    <DraggableItem
      dragRef={dragRef}
      dragHandleRef={dragHandleRef}
      controller={controller}
      getValue={() => ({ id: controller.id, type: ERBType.Link })}
    >
      <SectionItem dragRef={dragRef}>
        <SectionItemHeader
          dragHandleRef={dragHandleRef}
          onClickHeader={controller.onChangeIsExpanded}
          menu
          id={controller.id}
        >
          <div>{form.label || '(Not specified)'}</div>
          <div>{form.link || '(Not specified)'}</div>
        </SectionItemHeader>
        <SectionItemBody isExpanded={form.isExpanded}>
          <div>
            <FormLabel<IForm> field="label">Label</FormLabel>
            <Input<IForm>
              field="label"
              errors={state.errors}
              value={form.label}
              onChange={controller.onChangeLabel}
              onBlur={controller.onBlurInput}
            />
          </div>
          <div>
            <FormLabel<IForm> field="link">Link</FormLabel>
            <Input<IForm>
              field="link"
              errors={state.errors}
              value={form.link}
              onChange={controller.onChangeLink}
              onBlur={controller.onBlurInput}
            />
          </div>
        </SectionItemBody>
      </SectionItem>
    </DraggableItem>
  );
}
