'use client';
import LoginForm from '../LoginForm';
import FormWrapper from '@/components/FormWrapper';
import FormLink from '@/components/Link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import userService from '@/services/UserService';
import LoginVerifyForm from '@/components/LoginVerifyForm';
import Alert from '@/components/Alert';

enum EView {
  Login,
  Verify,
}

export default function LoginView() {
  userService.useController();
  const router = useRouter();
  const [view, setView] = useState(EView.Login);
  const [verifyKey, setVerifyKey] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

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

  function onSuccess(verifyKey: string, rememberMe: boolean) {
    setVerifyKey(verifyKey);
    setRememberMe(rememberMe);
    setView(EView.Verify);
  }

  return (
    <FormWrapper
      h2={
        view === EView.Login
          ? 'Login to your account'
          : 'Enter Verification Code'
      }
    >
      {view === EView.Login && (
        <div>
          <LoginForm onSuccess={onSuccess} />
          <p className="mt-10 text-center text-sm">
            <FormLink href="/register">Create a new account</FormLink>
          </p>
        </div>
      )}
      {view === EView.Verify && (
        <div>
          <Alert variant="blue">
            We sent an email to the entered email address with a verification
            code, please enter it below. The code is only good for 5 minutes.
          </Alert>
          <div className="mt-4">
            <LoginVerifyForm
              verifyKey={verifyKey}
              rememberMe={rememberMe}
            />
          </div>
        </div>
      )}
    </FormWrapper>
  );
}
