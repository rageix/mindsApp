'use client';
import FormLabel from '@/components/FormLabel';
import Input from '@/components/Input';
import ReferenceFormController, {
  IForm,
} from '@/components/ResumeBuilder/Builder/Sections/Reference/ReferenceForm/ReferenceFormController';
import Switch from '@/components/Switch';
import SectionItem from '@/components/ResumeBuilder/Builder/Sections/SectionItem';
import SectionItemHeader from '@/components/ResumeBuilder/Builder/Sections/SectionItemHeader';
import SectionItemBody from '@/components/ResumeBuilder/Builder/Sections/SectionItemBody';
import FormRow from '@/components/ResumeBuilder/Builder/Sections/FormRow';
import { ERBType } from '@/types/Resume';
import DraggableItem from '@/components/ResumeBuilder/Builder/Sections/DraggableItem';
import { useRef } from 'react';

interface IProps {
  controller: ReferenceFormController;
}

export default function ReferenceForm({ controller }: IProps) {
  controller.useController();
  const dragRef = useRef<HTMLDivElement | null>(null);
  const dragHandleRef = useRef<HTMLButtonElement>(null);

  const { form, state } = controller;

  return (
    <DraggableItem
      dragRef={dragRef}
      dragHandleRef={dragHandleRef}
      controller={controller}
      getValue={() => ({ id: controller.id, type: ERBType.Reference })}
    >
      <SectionItem dragRef={dragRef}>
        <SectionItemHeader
          dragHandleRef={dragHandleRef}
          isExpanded={form.isExpanded}
          onClickHeader={controller.onChangeIsExpanded}
          menu
          id={controller.id}
        >
          <div>
            {form.byRequestOnly
              ? 'By request only'
              : form.name || '(Not specified)'}
          </div>
        </SectionItemHeader>
        <SectionItemBody isExpanded={form.isExpanded}>
          <div className="flex item">
            <Switch
              checked={form.byRequestOnly}
              onChange={controller.onChangeByRequestOnly}
              label="By request only"
            >
              By request only
            </Switch>
          </div>
          {!form.byRequestOnly && (
            <>
              <FormRow>
                <div className="flex-1">
                  <FormLabel<IForm> field="name">Name</FormLabel>
                  <Input<IForm>
                    field="name"
                    errors={state.errors}
                    value={form.name}
                    onChange={controller.onChangeName}
                  />
                </div>
                <div className="flex-1">
                  <FormLabel<IForm> field="company">Company</FormLabel>
                  <Input<IForm>
                    field="company"
                    errors={state.errors}
                    value={form.company}
                    onChange={controller.onChangeCompany}
                  />
                </div>
              </FormRow>
              <FormRow>
                <div className="flex-1">
                  <FormLabel<IForm> field="phone">Phone</FormLabel>
                  <Input<IForm>
                    field="phone"
                    errors={state.errors}
                    value={form.phone}
                    onChange={controller.onChangePhone}
                  />
                </div>
                <div className="flex-1">
                  <FormLabel<IForm> field="email">Email</FormLabel>
                  <Input<IForm>
                    field="email"
                    errors={state.errors}
                    value={form.email}
                    onChange={controller.onChangeEmail}
                  />
                </div>
              </FormRow>
            </>
          )}
        </SectionItemBody>
      </SectionItem>
    </DraggableItem>
  );
}
