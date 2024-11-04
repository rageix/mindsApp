import { Metadata } from 'next';
import PasswordResetIdForm from '@/components/PasswordResetIdForm';
import FormWrapper from '@/components/FormWrapper';

export const metadata: Metadata = {
  title: 'Password reset',
};

export default async function Page() {
  return (
    <FormWrapper h2="Enter your new password below">
      <PasswordResetIdForm />
    </FormWrapper>
  );
}
