// 'use client';
// import FormErrors from '../FormErrors';
// import Input from '../Input';
// import Index from '../Buttons/PrimaryButton';
// import FormLabel from '@/components/FormLabel';
// import { getJson, postJson } from '@/util/Requests';
// import { ResponseType } from '@/types/BackendResponse';
// import { useParams, usePathname, useRouter } from 'next/navigation';
// import { useEffect } from 'react';
// import _ from 'lodash';
// import TeamFormController from '@/components/TeamForm/TeamFormController';
// import ImageUploader from '@/components/ImageUploader/ImageUploader';
// import { ApiTeamsGet, ApiTeamsPost } from '@/app/api/teams/route';
// import { newTeam, Team } from '@/types/Team';
// import { PaginatedResponse } from '@/types/Pagination';
// import { useQuery } from '@tanstack/react-query';
//
// export async function getTeam(query: ApiTeamsGet): Promise<Team | undefined> {
//   if (query.id === '' || query.id === 'new') {
//     return newTeam();
//   }
//
//   const response = await getJson<PaginatedResponse<Team[]>>('/api/teams', {
//     q: JSON.stringify(query),
//   });
//
//   if (response.data?.data.length) {
//     return response.data.data[0];
//   }
// }
//
// const controller = new TeamFormController();
//
// export default function TeamForm() {
//   const router = useRouter();
//   const path = usePathname();
//   const params = useParams<{ id: string }>();
//
//   controller.useController(async (values) => {
//     const response = await postJson<ApiTeamsPost, Team>('/api/teams', values);
//
//     if (response.type === ResponseType.Ok) {
//       router.push('/');
//     }
//   });
//
//   const teamQuery = useQuery({
//     queryKey: ['teams', params.id],
//     queryFn: () => getTeam({ id: params.id }),
//     refetchOnWindowFocus: false,
//   });
//
//   useEffect(() => {
//     if (!teamQuery.data) {
//       return;
//     }
//     controller.reset(teamQuery.data);
//   }, [teamQuery.data]);
//
//   const { form, state } = controller;
//
//   return (
//     <form
//       className="space-y-6"
//       data-testid="teamForm"
//       onSubmit={controller.onSubmitForm}
//     >
//       <div>
//         <FormLabel htmlFor="name">Name</FormLabel>
//         <div className="mt-2">
//           <Input
//             id="name"
//             name="name"
//             data-testid="name"
//             autoComplete="name"
//             aria-describedby="nameErrors"
//             aria-invalid={!_.isEmpty(state.errors.email)}
//             value={form.name}
//             onChange={controller.onChangeName}
//           />
//         </div>
//         <FormErrors
//           field="name"
//           errors={state.errors}
//           id="nameErrors"
//           data-testid="nameErrors"
//         />
//       </div>
//
//       <div>
//         <div>
//           <img
//             src={`/images/${form.image}`}
//             alt="Team Logo"
//           />
//         </div>
//         <ImageUploader
//           onUpload={controller.onChangeImage}
//           maxFiles={1}
//         />
//       </div>
//       <div>
//         <Index
//           type="submit"
//           className="w-full"
//           disabled={!_.isEmpty(state.errors)}
//           data-testid="submitButton"
//         >
//           Sign up
//         </Index>
//       </div>
//     </form>
//   );
// }
