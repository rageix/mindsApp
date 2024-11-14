'use client';
import { useParams, useRouter } from 'next/navigation';
import Container from '@/components/Container';
import Card from '@/components/Card';
import CardBody from '@/components/Card/CardBody';
import CardHeader from '@/components/Card/CardHeader';
import CardTitle from '@/components/Card/CardTitle';
import { useEffect, useState } from 'react';
import Loading from '@/components/Loading';
import useInviteAccept from '@/hooks/UseInviteAccept';
import useUser from '@/hooks/UseUser';
import { IHasId } from '@/types/HasId';
import Button from '@/components/Buttton';
import FormLink from '@/components/Link';
import userService from '@/services/UserService';
import TeamAvatar from '@/components/TeamAvatar';
import { IMember } from '@/types/Member';
import { postApiMembersAccept } from '@/requests/api/members/accept';

export default function AcceptInviteView() {
  userService.useController();
  const [loading, setLoading] = useState(true);
  const [invite, setInvite] = useState<IHasId<IMember>>();
  const user = useUser();
  const { inviteId } = useParams<{ inviteId: string }>();
  const inviteAccept = useInviteAccept(inviteId);
  const router = useRouter();

  useEffect(() => {
    if (!inviteAccept.loading && !inviteAccept.data) {
      router.push('/login');
      return;
    }
    if (!inviteAccept.loading && inviteAccept.data) {
      setInvite(inviteAccept.data);
      setLoading(false);
    }
  }, [inviteAccept.loading]);

  async function onAccept() {
    const response = await postApiMembersAccept({ _id: inviteId });

    if (response !== null) {
      router.push(`/dashboard/${invite?.teamId}`);
    }
  }

  if (loading || !user.isLoaded()) {
    return (
      <div className="flex h-screen justify-center items-center">
        <Loading size="lg" />
      </div>
    );
  }

  const isLoggedIn = user.isLoggedIn();

  return (
    <div className="flex h-screen items-center">
      <Container size="3xl">
        <Card>
          <CardHeader>
            <CardTitle>Team Invite</CardTitle>
          </CardHeader>
          <CardBody>
            <div className="flex flex-col justify-center space-y-6">
              <div className="h-36 w-36 flex-none overflow-hidden rounded-full bg-gray-500 m-auto">
                <TeamAvatar value={invite?.team?.avatar} />
              </div>
              <p className="text-lg font-semibold leading-6 text-center">
                {invite?.team?.name || 'Unknown'}
              </p>
              {userService.isLoaded() && !isLoggedIn && (
                <div className="space-y-3 text-center">
                  <p>You must be logged in to accept this invite!</p>
                  <p className="text-center text-sm">
                    <FormLink
                      href="/login"
                      target="_blank"
                    >
                      Already have an account? Log in.
                    </FormLink>
                  </p>
                </div>
              )}
              {userService.isLoaded() && isLoggedIn && (
                <div className="space-y-3 text-center">
                  <p>You have been invited to join this team.</p>
                  <Button
                    type="button"
                    variant="blue"
                    onClick={onAccept}
                  >
                    Accept
                  </Button>
                </div>
              )}
            </div>
          </CardBody>
        </Card>
      </Container>
    </div>
  );
}
