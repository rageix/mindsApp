'use client';
import Container from '@/components/Container';
import { useState } from 'react';

import BuilderController from '@/components/ResumeBuilder/Builder/BuilderController';
import Builder from '@/components/ResumeBuilder';
import { newIResumeBuilder } from '@/types/ResumeBuilder';

const defaultBuilder = new BuilderController();
defaultBuilder.load(newIResumeBuilder());

export default function ResumeBuilderView() {
  const [builderController] = useState(defaultBuilder);

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

  // if (loading || !user.isLoaded()) {
  //   return (
  //     <div className="flex h-screen justify-center items-center">
  //       <Loading size="lg" />
  //     </div>
  //   );
  // }

  // const isLoggedIn = user.isLoggedIn();

  return (
    <div className="min-h-screen h-full flex items-center">
      <Container size="3xl">
        <Builder controller={builderController} />
      </Container>
    </div>
  );
}
