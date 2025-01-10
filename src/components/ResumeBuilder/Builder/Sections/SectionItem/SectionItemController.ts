import FormController from '@/util/FormController';
import { IRBSectionItem } from '@/types/ResumeBuilder';

export default class SectionItemController<
  T extends IRBSectionItem,
> extends FormController<T> {
  onChangeIsExpanded = () => {
    // @ts-ignore
    this.onChangeForm({ isExpanded: !this.form.isExpanded });
  };
}
