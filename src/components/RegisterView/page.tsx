'use client';
import FormWrapper from '@/components/FormWrapper';
import RegisterForm from '@/components/RegisterForm';
import Button from '@/components/Buttton';
import Link from 'next/link';

export default function RegisterView() {
  return (
    <FormWrapper h2="Create new account">
      <RegisterForm />
      <p className="mt-4 text-center text-sm">
        <Link href="/login">
          <Button variant="link">
            Already have an account? Login instead.
          </Button>
        </Link>
      </p>
    </FormWrapper>
  );
}
