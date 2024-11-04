// import FormController from '@/util/FormController';
// import { newTemplateData, TemplateData } from '@/types/TemplateData';
// import { SelectOption } from '@/util/SelectOptions';
// import { Meridian } from '@/types/Meridian';
// import { SingleValue } from 'react-select';
//
// interface Form extends TemplateData {}
//
// export function defaultForm(): Form {
//   return newTemplateData();
// }
//
// export default class TemplateDataFormController extends FormController<Form> {
//   defaultForm = defaultForm();
//
//   onChangeActive = () => {
//     this.onChangeForm({ active: !this.form.active });
//   };
//
//   onChangeStartHour = (option: SingleValue<SelectOption<number>>) => {
//     this.onChangeForm({ startHour: option?.value });
//   };
//
//   onChangeStartMinute = (option: SingleValue<SelectOption<number>>) => {
//     this.onChangeForm({ startMinute: option?.value });
//   };
//
//   onChangeStartMeridian = (option: SingleValue<SelectOption<Meridian>>) => {
//     this.onChangeForm({ startMeridian: option?.value });
//   };
//
//   onChangeEndHour = (option: SingleValue<SelectOption<number>>) => {
//     this.onChangeForm({ endHour: option?.value });
//   };
//
//   onChangeEndMinute = (option: SingleValue<SelectOption<number>>) => {
//     this.onChangeForm({ endMinute: option?.value });
//   };
//
//   onChangeEndMeridian = (option: SingleValue<SelectOption<Meridian>>) => {
//     this.onChangeForm({ endMeridian: option?.value });
//   };
// }
