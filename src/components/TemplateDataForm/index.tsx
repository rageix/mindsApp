// import FormLabel from '@/components/FormLabel';
// import TemplateDataFormController from '@/components/TemplateDataForm/TemplateDataFormController';
// import Checkbox from '@/components/Checkbox';
// import Label from '@/components/Label/label';
// import Select from 'react-select';
// import { HOUR_OPTIONS, MERIDIAN_OPTIONS, MINUTE_OPTIONS } from '@/types/Time';
//
// interface Props {
//   controller: TemplateDataFormController;
// }
//
// export default function TeamForm({ controller }: Props) {
//   controller.useController();
//
//   const { form } = controller;
//
//   return (
//     <form
//       className="space-y-6"
//       onSubmit={controller.onSubmitForm}
//     >
//       <div>
//         <Checkbox
//           id="active"
//           data-testid="active"
//           name="active"
//           checked={form.active}
//           onChange={controller.onChangeActive}
//         />
//         <Label
//           className="ml-3"
//           htmlFor="active"
//         >
//           Active
//         </Label>
//       </div>
//       <div>
//         <FormLabel htmlFor="name">Start Hour</FormLabel>
//         <div className="mt-2">
//           <Select
//             isClearable={false}
//             isMulti={false}
//             value={
//               HOUR_OPTIONS.find((v) => v?.value === form.startHour) || null
//             }
//             options={HOUR_OPTIONS}
//             onChange={controller.onChangeStartHour}
//           />
//         </div>
//       </div>
//       <div>
//         <FormLabel htmlFor="name">Start Minute</FormLabel>
//         <div className="mt-2">
//           <Select
//             isClearable={false}
//             isMulti={false}
//             value={
//               MINUTE_OPTIONS.find((v) => v?.value === form.startMinute) || null
//             }
//             options={MINUTE_OPTIONS}
//             onChange={controller.onChangeStartMinute}
//           />
//         </div>
//       </div>
//       <div>
//         <FormLabel htmlFor="name">&nbsp;</FormLabel>
//         <div className="mt-2">
//           <Select
//             isClearable={false}
//             isMulti={false}
//             value={
//               MERIDIAN_OPTIONS.find((v) => v?.value === form.startMeridian) ||
//               null
//             }
//             options={MERIDIAN_OPTIONS}
//             onChange={controller.onChangeStartMeridian}
//           />
//         </div>
//       </div>
//       <div>
//         <FormLabel htmlFor="name">End Hour</FormLabel>
//         <div className="mt-2">
//           <Select
//             isClearable={false}
//             isMulti={false}
//             value={HOUR_OPTIONS.find((v) => v?.value === form.endHour) || null}
//             options={HOUR_OPTIONS}
//             onChange={controller.onChangeEndHour}
//           />
//         </div>
//       </div>
//       <div>
//         <FormLabel htmlFor="name">End Minute</FormLabel>
//         <div className="mt-2">
//           <Select
//             isClearable={false}
//             isMulti={false}
//             value={
//               MINUTE_OPTIONS.find((v) => v?.value === form.endMinute) || null
//             }
//             options={MINUTE_OPTIONS}
//             onChange={controller.onChangeEndMinute}
//           />
//         </div>
//       </div>
//       <div>
//         <FormLabel htmlFor="name">&nbsp;</FormLabel>
//         <div className="mt-2">
//           <Select
//             isClearable={false}
//             isMulti={false}
//             value={
//               MERIDIAN_OPTIONS.find((v) => v?.value === form.endMeridian) ||
//               null
//             }
//             options={MERIDIAN_OPTIONS}
//             onChange={controller.onChangeEndMeridian}
//           />
//         </div>
//       </div>
//     </form>
//   );
// }
