'use client';
import { useState } from 'react';
import useTeamId from '@/hooks/UseTeamId';
import Loading from '@/components/Loading';
import { useParams, useRouter } from 'next/navigation';
import BackButton from '@/components/BackButton';
import DashboardPageHeader from '@/components/DashboardPageHeader';
import DynamicFormEditorController from '@/components/DynamicFormsView/DynamicFormEditor/DynamicFormEditorController';
import DynamicFormEditor from '@/components/DynamicFormsView/DynamicFormEditor';
import { postApiDynamicForms } from '@/requests/api/dynamicForms';
import { toast } from 'react-toastify';

export default function DynamicFormEditorView() {
  const teamId = useTeamId();
  const router = useRouter();
  const { dynamicFormId } = useParams<{ dynamicFormId: string }>();
  const [controller] = useState(
    new DynamicFormEditorController(dynamicFormId, teamId),
  );

  controller.useController(async (form) => {
    const item = await postApiDynamicForms({ ...form, teamId: teamId });

    if (item) {
      router.replace(`/dashboard/${teamId}/dynamicForms/${item._id}`);
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
    router.push(`/dashboard/${teamId}/dynamicForms`);
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
      <DynamicFormEditor
        controller={controller}
      />
    </>
  );
}
