'use client';
import ResumeController from '@/components/ResumeBuilder/Builder/ResumeController';
import Builder from '@/components/ResumeBuilder';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Loading from '@/components/Loading';
import Renderer from '@/components/ResumeBuilder/Renderer';
import ResumeContext from '@/components/ResumeBuilder/Builder/ResumeContext';
import useUser from '@/hooks/UseUser';
import Alert from '@/components/Alert';
import LoginButton from '@/components/LoginButton';

export default function ResumeView() {
  const user = useUser();
  const { resumeId } = useParams<{ resumeId: string }>();
  const [controller] = useState(new ResumeController());
  controller.useController();

  useEffect(() => {
    if (resumeId) {
      controller.loadId(resumeId);
      return;
    }
    controller
      .loadSession()
      .then((id) => window.history.pushState(null, '', '/resumes/' + id));
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

  // const isLoggedIn = user.isLoggedIn();

  return (
    <>
      <div className="flex flex-col gap-y-3 mb-3">
        {!user.isLoggedIn() && (
          <Alert variant="yellow">
            <div className="flex gap-x-2 items-baseline">
              <div>
                You are not logged in. To make sure you can access your resume
                in the future:
              </div>
              <div>
                <LoginButton label="Login to your account" />
              </div>
            </div>
          </Alert>
        )}
      </div>
      <ResumeContext.Provider value={controller}>
        <div className="min-h-screen h-full flex">
          <div className="flex-1">
            <div className="max-w-3xl">
              <Builder controller={controller} />
            </div>
          </div>
          <div className="flex-1 min-h-screen h-full relative">
            <Renderer controller={controller} />
          </div>
        </div>
      </ResumeContext.Provider>
    </>
  );
}
