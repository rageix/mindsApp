import FormController from '@/util/FormController';
import { z } from 'zod';
import { ChangeEvent } from 'react';
import { EFieldType, ISection, newIField } from '@/types/DynamicForm';
import { nanoid } from 'nanoid';
import { sectionSchema } from '@/common/DynamicForms';
import FieldController from '@/components/DynamicFormsView/DynamicFormEditor/Field/FieldController';

export interface IForm extends ISection {
  fieldControllers: FieldController[];
}

export function defaultForm(): IForm {
  return {
    key: nanoid(),
    heading: '',
    description: '',
    fields: [],
    fieldControllers: [],
  };
}

const formValidator = () =>
  sectionSchema.extend({
    fieldControllers: z.array(z.never()),
  }) satisfies z.ZodType<IForm>;

export default class SectionController extends FormController<IForm> {
  resetForm = defaultForm();
  defaultForm = this.resetForm;
  formValidator = formValidator;

  onChangeHeading = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    this.onChangeForm({ heading: e.target.value });
  };

  onChangeDescription = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    this.onChangeForm({ description: e.target.value });
  };

  onAddField = (type: EFieldType) => {
    const form = newIField(type);
    const controller = new FieldController(form);
    this.onChangeForm({
      fieldControllers: [...this.form.fieldControllers, controller],
    });
  };

  onRemoveField = (index: number) => {
    this.onChangeForm({
      fieldControllers: this.form.fieldControllers.toSpliced(index, 1),
    });
  };

  load = (section: ISection) => {
    const fieldControllers = (section.fields || []).map((v) => {
      const fieldController = new FieldController();
      fieldController.load(v);
      return fieldController;
    });
    this.reset({ ...section, fieldControllers });
  };

  getValue = (): ISection => {
    return {
      key: this.form.key,
      heading: this.form.heading,
      description: this.form.description,
      fields: this.form.fields,
    };
  };
}
