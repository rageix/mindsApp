import FormController from '@/util/FormController';
import { IRBSectionItem } from '@/types/Resume';

export default class SectionItemController<
  T extends IRBSectionItem,
> extends FormController<T> {

  constructor(arg?: T) {
    super(arg);
  }

  onChangeIsExpanded = () => {
    // @ts-ignore
    this.onChangeForm({ isExpanded: !this.form.isExpanded });
  };
}
