'use client';
import FormWrapper from '@/components/FormWrapper';
import FormLink from '@/components/Link';
import RegisterForm from "@/components/RegisterForm";

export default function RegisterView() {

  return (
    <FormWrapper h2="Create new account">
      <RegisterForm />
      <p className="mt-10 text-center text-sm">
        <FormLink href="/login">
          Already have an account? Log in instead.
        </FormLink>
      </p>
    </FormWrapper>
  );
}
