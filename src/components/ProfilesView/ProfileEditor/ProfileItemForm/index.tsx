import FormLabel from '@/components/FormLabel';
import BaseProfileItemFormController, {
  IForm,
} from '@/components/ProfilesView/ProfileEditor/ProfileItemForm/BaseProfileItemFormController';
import { useMemo } from 'react';
import { EProfileItemType } from '@/types/Profile';
import Input from '@/components/Input';
import FormErrors from '@/components/FormErrors';
import Switch from '@/components/Switch';
import { cn } from '@/util/Cn';

interface IProps {
  controller: BaseProfileItemFormController;
}

export default function ProfileItemForm({ controller }: IProps) {
  controller.useController();
  const { form, state } = controller;

  const label = useMemo(() => {
    switch (form.type) {
      case EProfileItemType.Email:
        return 'Email';
      case EProfileItemType.Phone:
        return 'Phone Number';
      case EProfileItemType.Url:
        return 'Url';
    }
  }, [form.type]);

  return (
    <div className="col-span-full">
      <div className="flex justify-between">
        <FormLabel>{label}</FormLabel>
        {form.canDisable && (
          <Switch
            checked={form.enabled}
            onChange={controller.onChangeEnabled}
          />
        )}
      </div>
      <div
        className={cn(
          'flex',
          form.type === EProfileItemType.Url ? 'gap-x-3 mt-2' : 'flex-col',
        )}
      >
        <div className={cn(form.type === EProfileItemType.Url ? 'w-1/2' : '')}>
          {form.type === EProfileItemType.Url && (
            <FormLabel<IForm> field="label">Href</FormLabel>
          )}
          <div className="mt-2">
            <Input<IForm>
              field="value"
              errors={state.errors}
              value={form.value}
              onChange={controller.onChangeValue}
            />
          </div>
          <FormErrors<IForm>
            field="value"
            errors={state.errors}
          />
        </div>
        {form.type === EProfileItemType.Url && (
          <div
            className={cn(form.type === EProfileItemType.Url ? 'w-1/2' : '')}
          >
            <FormLabel<IForm> field="label">Label</FormLabel>
            <div className="mt-2">
              <Input<IForm>
                field="value"
                errors={state.errors}
                value={form.label}
                onChange={controller.onChangeLabel}
              />
            </div>
            <FormErrors<IForm>
              field="label"
              errors={state.errors}
            />
          </div>
        )}
      </div>
    </div>
  );
}
