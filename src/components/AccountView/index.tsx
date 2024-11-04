'use client';
import ImageUploader from '@/components/ImageUploader/ImageUploader';
import userService from '@/services/UserService';
import UserAccountForm from '@/components/UserAccountForm';
import UserProfilePasswordForm from '@/components/UserProfilePasswordForm';
import UserSessionList from '@/components/UserSessionList';
import { toast } from 'react-toastify';
import Card from '@/components/Card';
import CardBody from '@/components/Card/CardBody';
import FormBlock from '@/components/FormBlock';
import FormBlockBody from '@/components/FormBlock/FormBlockBody';
import { UserAvatar } from '@/components/UserAvatar';
import useUser from '@/hooks/UseUser';

export default function AccountView() {
  const user = useUser();

  return (
    <Card>
      <CardBody className="space-y-12">
        <FormBlock
          heading="Avatar"
          description="Change your avatar."
        >
          <FormBlockBody className="flex flex-col gap-6">
            <ImageUploader
              onUpload={() => {
                userService.reload();
                toast.success('Avatar uploaded successfully.');
              }}
              route={'/api/user/current/avatar'}
              maxFileSize={2000000}
            />
            <div className="h-16 w-16 flex-none overflow-hidden rounded-full bg-gray-500 m-auto">
              <UserAvatar value={user?.data?.avatar} />
            </div>
          </FormBlockBody>
        </FormBlock>
        <FormBlock
          heading="Account Details"
          description="Basic information about you."
        >
          <FormBlockBody>
            <UserAccountForm />
          </FormBlockBody>
        </FormBlock>
        <FormBlock
          heading="Password"
          description="Change your password."
        >
          <FormBlockBody>
            <UserProfilePasswordForm />
          </FormBlockBody>
        </FormBlock>
        <FormBlock
          heading="Sessions"
          description="These are all your active sessions. You can disable any or all of them."
        >
          <FormBlockBody>
            <UserSessionList />
          </FormBlockBody>
        </FormBlock>
      </CardBody>
    </Card>
  );
}
