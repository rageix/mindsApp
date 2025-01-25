'use client';
import FormLabel from '@/components/FormLabel';
import Input from '@/components/Input';
import LinkFormController, {
  IForm,
} from '@/components/ResumeBuilder/Builder/Sections/Link/LinkForm/LinkFormController';
import SectionItem from '@/components/ResumeBuilder/Builder/Sections/SectionItem';
import SectionItemHeader from '@/components/ResumeBuilder/Builder/Sections/SectionItemHeader';
import SectionItemBody from '@/components/ResumeBuilder/Builder/Sections/SectionItemBody';
import FormRow from '@/components/ResumeBuilder/Builder/Sections/FormRow';
import { useRef } from 'react';
import DraggableItem from '@/components/ResumeBuilder/Builder/Sections/DraggableItem';
import { ERBType } from '@/types/Resume';

interface IProps {
  controller: LinkFormController;
  onDuplicate: () => void;
  onDelete: () => void;
}

export default function LinkForm({
  controller,
  onDuplicate,
  onDelete,
}: IProps) {
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
          isExpanded={form.isExpanded}
          onClickHeader={controller.onChangeIsExpanded}
          onClickDuplicate={onDuplicate}
          onClickDelete={onDelete}
        >
          <div>{form.label || '(Not specified)'}</div>
          <div>{form.link || '(Not specified)'}</div>
        </SectionItemHeader>
        <SectionItemBody isExpanded={form.isExpanded}>
          <FormRow>
            <div className="flex-1">
              <FormLabel<IForm> field="label">Label</FormLabel>
              <Input<IForm>
                field="label"
                errors={state.errors}
                value={form.label}
                onChange={controller.onChangeLabel}
              />
            </div>
            <div className="flex-1">
              <FormLabel<IForm> field="link">Link</FormLabel>
              <Input<IForm>
                field="link"
                errors={state.errors}
                value={form.link}
                onChange={controller.onChangeLink}
              />
            </div>
          </FormRow>
        </SectionItemBody>
      </SectionItem>
    </DraggableItem>
  );
}
