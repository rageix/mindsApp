import FormController from '@/util/FormController';
import { IRBSectionItem } from '@/types/Resume';
import emitter from '@/util/Emitter';

export default class SectionItemController<
  T extends IRBSectionItem,
> extends FormController<T> {
  isDirty = false;

  constructor(arg?: T) {
    super(arg);
  }

  onChangeForm = (update: Partial<T>, validate = true) => {
    this.isDirty = true;
    emitter.emitResumeUpdated();
    return this._onChangeForm(update, validate);
  };

  onChangeIsExpanded = () => {
    // @ts-ignore
    this.onChangeForm({ isExpanded: !this.form.isExpanded });
  };

  getDragNDropValue = () => {
    return {
      id: this.id,
    };
  };

  onBlurInput = () => {
    if (this.isDirty) {
      emitter.emitSaveResume();
    }
  }
}
