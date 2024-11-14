import { Metadata } from 'next';
import PasswordResetForm from '@/components/PasswordResetForm';
import FormLink from '@/components/Link';
import FormWrapper from '@/components/FormWrapper';

export const metadata: Metadata = {
  title: 'Password reset',
};

export default async function Page() {
  return (
    <FormWrapper h2="Reset your password">
      <PasswordResetForm />
      <p className="mt-10 text-center text-sm text-gray-500">
        <FormLink href="/login">
          Remember your password? Log in instead.
        </FormLink>
      </p>
    </FormWrapper>
  );
}
