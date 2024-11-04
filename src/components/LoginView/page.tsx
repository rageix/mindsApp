'use client';
import LogInForm from '@/components/LogInForm';
import FormWrapper from '@/components/FormWrapper';
import FormLink from '@/components/Link';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import userService from '@/services/UserService';

export default function LoginView() {
  userService.useController();
  const router = useRouter();

  useEffect(() => {
    if (!userService.isLoaded()) {
      return;
    }

    if (userService.isLoggedIn()) {
      router.push('/dashboard');
    }
  }, [userService.isLoaded()]);

  if (!userService.isLoaded()) {
    return null;
  }

  return (
    <FormWrapper h2="Log in to your account">
      <LogInForm />
      <p className="mt-10 text-center text-sm text-gray-500">
        <FormLink href="/register">Create a new account</FormLink>
      </p>
    </FormWrapper>
  );
}
