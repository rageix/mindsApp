import { Metadata } from 'next';
import PasswordResetForm from '@/components/PasswordResetForm';
import FormLink from '@/components/Link';
import React from 'react';
import FormWrapper from '@/components/FormWrapper';

export const metadata: Metadata = {
  title: 'Password reset',
};

export default async function Page() {
  return (
    <FormWrapper h2="Reset your password">
      <PasswordResetForm />
      <p className="mt-10 text-center text-sm text-gray-500">
        <FormLink
          href="/login"
          className="font-semibold leading-6 text-blue-600 hover:text-blue-500"
        >
          Remember your password? Log in instead.
        </FormLink>
      </p>
    </FormWrapper>
  );
}
