// import FormController from '@/util/FormController';
// import { z } from 'zod';
// import { zTinyTextValidator } from '@/util/Validation';
// import { ChangeEvent } from 'react';
// import { Team } from '@/types/Team';
//
// interface Form extends Team {}
//
// export function defaultForm(): Form {
//   return {
//     name: 'Your Group',
//     image: '',
//   };
// }
//
// const formValidator = () =>
//   z.object({
//     name: zTinyTextValidator,
//     image: z.string().optional().default(''),
//   });
//
// export default class TeamFormController extends FormController<Form> {
//   defaultForm = defaultForm();
//   formValidator = formValidator;
//
//   onChangeName = (e: ChangeEvent<HTMLInputElement>) => {
//     this.onChangeForm({ name: e.target.value });
//   };
//
//   onChangeImage = (ids: string[]) => {
//     this.onChangeForm({ image: ids[0] });
//   };
// }
