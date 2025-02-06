'use client';
import FormWrapper from '@/components/FormWrapper';
import RegisterForm from '@/components/RegisterForm';
import Button from '@/components/Buttton';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import _ from 'lodash';

export default function RegisterView() {
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get('redirectTo');
  const redirect = !_.isEmpty(redirectTo)
    ? '?redirectTo=' + encodeURIComponent(String(redirectTo))
    : '';
  const loginUrl = '/login' + redirect;

  return (
    <FormWrapper h2="Create new account">
      <RegisterForm />
      <p className="mt-4 text-center text-sm">
        <Link href={loginUrl}>
          <Button variant="link">
            Already have an account? Login instead.
          </Button>
        </Link>
      </p>
    </FormWrapper>
  );
}
