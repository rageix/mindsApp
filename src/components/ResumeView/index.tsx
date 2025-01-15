'use client';
import Container from '@/components/Container';
import ResumeController from '@/components/ResumeBuilder/Builder/ResumeController';
import Builder from '@/components/ResumeBuilder';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Loading from '@/components/Loading';

export default function ResumeView() {
  const { resumeId } = useParams<{ resumeId: string }>();
  const [controller] = useState(new ResumeController());
  controller.useController();

  useEffect(() => {
    console.log('useEffect');
    if (resumeId) {
      controller.loadId(resumeId);
      return;
    }
    controller.loadSession();
  }, []);

  // const [builderController] = useState(defaultBuilder);

  // const [loading, setLoading] = useState(true);
  // const [invite, setInvite] = useState<IHasId<IMember>>();
  // const user = useUser();
  // const { inviteId } = useParams<{ inviteId: string }>();
  // const inviteAccept = useInviteAccept(inviteId);
  // const router = useRouter();

  // useEffect(() => {
  //   if (!inviteAccept.loading && !inviteAccept.data) {
  //     router.push('/login');
  //     return;
  //   }
  //   if (!inviteAccept.loading && inviteAccept.data) {
  //     setInvite(inviteAccept.data);
  //     setLoading(false);
  //   }
  // }, [inviteAccept.loading]);

  if (controller.state.isLoading) {
    return (
      <div className="flex h-screen justify-center items-center">
        <Loading size="lg" />
      </div>
    );
  }
  console.log('render', controller.state.controllers);

  // const isLoggedIn = user.isLoggedIn();

  return (
    <div className="min-h-screen h-full flex items-center">
      <Container size="3xl">
        <Builder controller={controller} />
      </Container>
    </div>
  );
}
