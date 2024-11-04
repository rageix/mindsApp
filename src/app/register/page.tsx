import RegisterForm from '@/components/RegisterForm';
import { Metadata } from 'next';
import FormLink from '@/components/Link';
import FormWrapper from '@/components/FormWrapper';

export const metadata: Metadata = {
  title: 'Register',
};

export default function Page() {
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
