'use client';
import { useState } from 'react';
import useTeamId from '@/hooks/UseTeamId';
import Loading from '@/components/Loading';
import { useParams, useRouter } from 'next/navigation';
import BackButton from '@/components/BackButton';
import DashboardPageHeader from '@/components/DashboardPageHeader';
import FormEditor from './FormEditor';
import { postApiForms } from '@/requests/api/forms';
import { toast } from 'react-toastify';
import FormEditorController
  from "@/components/FormEditorView/FormEditor/FormEditorController";

export default function FormEditorView() {
  const teamId = useTeamId();
  const router = useRouter();
  const { formId } = useParams<{ formId: string }>();
  const [controller] = useState(
    new FormEditorController(formId, teamId),
  );

  controller.useController(async (form) => {
    const item = await postApiForms({ ...form, teamId: teamId });

    if (item) {
      router.replace(`/dashboard/${teamId}/forms/${item._id}`);
      toast.success('Form saved.');
    }
  });

  //   async (form) => {
  //   const item = await postApiDynamicForms(form);
  //   if (item) {
  //     console.log('item');
  //   }
  // }

  // controller.useController(async (form) => {
  //   const item = await postApiCards({ ...form, teamId: teamId });
  //   if (item) {
  //     router.replace(`/dashboard/${teamId}/cards/${item._id}`);
  //     toast.success('Card saved.');
  //   }
  // });

  // useEffect(() => {
  //   if (!controller.state.initLoad) {
  //     controller.loadId(dynamicFormId, teamId);
  //   }
  // }, [controller.state.initLoad]);

  function back() {
    router.push(`/dashboard/${teamId}/forms`);
  }

  function onClickCancel() {
    // if (!controller.state.dirty) {
    //   back();
    //   return;
    // }
    if (confirm('Are you sure? Any unsaved data will be lost!')) {
      back();
    }
  }

  if (!controller.state?.initLoad) {
    return (
      <div className="flex justify-center items-center mt-16">
        <Loading
          size="lg"
          showAfter={2000}
        />
      </div>
    );
  }

  return (
    <>
      <DashboardPageHeader title="Dynamic Form Editor" />
      <BackButton onClick={onClickCancel} />
      <FormEditor
        controller={controller}
      />
    </>
  );
}
