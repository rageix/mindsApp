'use client';
import FormLabel from '@/components/FormLabel';
import Input from '@/components/Input';
import ReferenceFormController, {
  IForm,
} from '@/components/ResumeBuilder/Builder/Sections/Reference/ReferenceForm/ReferenceFormController';
import Switch from '@/components/Switch';

interface IProps {
  controller: ReferenceFormController;
}

export default function ReferenceForm({ controller }: IProps) {
  controller.useController();

  const { form, state } = controller;

  return (
    <div>
      <div>{form.byRequestOnly ? 'By request only' : form.name || '(Not specified)'}</div>
      <div className="flex item">
        <Switch
          checked={form.byRequestOnly}
          onChange={controller.onChangeByRequestOnly}
          label="By request only"
        />
        <span className="ms-2">By request only</span>
      </div>
      {!form.byRequestOnly && (
        <>
          <div className="flex flex-col sm:flex-row">
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
          </div>
          <div className="flex flex-col sm:flex-row">
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
          </div>
        </>
      )}
    </div>
  );
}
