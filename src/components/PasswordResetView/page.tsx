'use client';
import FormWrapper from '@/components/FormWrapper';
import FormLink from '@/components/Link';
import PasswordResetForm from '@/components/PasswordResetForm';

export default function PasswordResetView() {
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
