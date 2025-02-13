import { useEffect } from 'react';

const useLeavePageConfirm = (active = true) => {
  const beforeUnloadListener = (event: any) => {
    event.preventDefault();
    return (event.returnValue = '');
  };

  useEffect(() => {
    if (active) {
      window.addEventListener('beforeunload', beforeUnloadListener);
    } else {
      window.removeEventListener('beforeunload', beforeUnloadListener);
    }

    return () =>
      window.removeEventListener('beforeunload', beforeUnloadListener);
  }, [active]);
};

export default useLeavePageConfirm;
