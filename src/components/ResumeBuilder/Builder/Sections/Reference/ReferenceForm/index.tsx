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
import { ERBType } from '@/types/Resume';
import DraggableItem from '@/components/ResumeBuilder/Builder/Sections/DraggableItem';
import { useEffect, useRef, useState } from 'react';
import emitter from '@/util/Emitter';

interface IProps {
  controller: ReferenceFormController;
}

export default function ReferenceForm({ controller }: IProps) {
  controller.useController();
  const dragRef = useRef<HTMLDivElement | null>(null);
  const dragHandleRef = useRef<HTMLButtonElement>(null);

  const { form, state } = controller;

  const [init, setInit] = useState(false);

  useEffect(() => {
    if (init) {
      emitter.emitSaveResume();
      return;
    }

    setInit(true);
  }, [form.byRequestOnly]);

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
          <div className="col-span-2 flex item">
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
              <div>
                <FormLabel<IForm> field="name">Name</FormLabel>
                <Input<IForm>
                  field="name"
                  errors={state.errors}
                  value={form.name}
                  onChange={controller.onChangeName}
                  onBlur={controller.onBlurInput}
                />
              </div>
              <div>
                <FormLabel<IForm> field="company">Company</FormLabel>
                <Input<IForm>
                  field="company"
                  errors={state.errors}
                  value={form.company}
                  onChange={controller.onChangeCompany}
                  onBlur={controller.onBlurInput}
                />
              </div>

              <div>
                <FormLabel<IForm> field="phone">Phone</FormLabel>
                <Input<IForm>
                  field="phone"
                  errors={state.errors}
                  value={form.phone}
                  onChange={controller.onChangePhone}
                  onBlur={controller.onBlurInput}
                />
              </div>
              <div>
                <FormLabel<IForm> field="email">Email</FormLabel>
                <Input<IForm>
                  field="email"
                  errors={state.errors}
                  value={form.email}
                  onChange={controller.onChangeEmail}
                  onBlur={controller.onBlurInput}
                />
              </div>
            </>
          )}
        </SectionItemBody>
      </SectionItem>
    </DraggableItem>
  );
}
