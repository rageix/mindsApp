'use client';
import FormWrapper from '@/components/FormWrapper';
import PasswordResetIdForm from '@/components/PasswordResetIdForm';

export default function PasswordResetIdView() {
  return (
    <FormWrapper h2="Enter your new password below">
      <PasswordResetIdForm />
    </FormWrapper>
  );
}
