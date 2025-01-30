import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
// import tokenService from '@/services/TokenService';
import userService from '@/services/UserService';

/*
 * This hook is used to gate off routes that require authentication.
 */
export default function useAuthentication() {
  const router = useRouter();
  const [controller] = useState(userService);
  // const pathname = usePathname();
  controller.useController();
  // console.log('useAuthentication');
  // console.log(controller.state);

  // useEffect(() => {
  //   userService.reload();
  // }, [pathname]);

  useEffect(() => {
    if (controller.isLoaded() && !controller.isLoggedIn()) {
      // console.log('push to login!');
      // tokenService.remove();
      router.push('/login?redirectTo=' + encodeURIComponent(window.location.href));
    }
  }, [controller.isLoaded(), controller.isLoggedIn()]);

  return controller;
}
