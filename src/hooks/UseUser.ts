'use client';
import { useEffect, useState } from 'react';
import userStore from '@/stores/UserStore';
import userService from '@/services/UserService';
import _ from 'lodash';

export default function useUser() {
  const [data, setData] = useState(userStore.get());

  useEffect(() => {
    return userStore.subscribe(setData);
  }, []);

  function reload() {
    userService.reload();
  }
  //
  // // async function clear() {
  // //   userStore.set({ ...data, user: null });
  // // }
  //
  function isLoaded(): boolean {
    return data.loaded;
  }

  function isLoggedIn(): boolean {
    return !_.isEmpty(data?.user);
  }

  return {
    data: data.user,
    reload,
    // clear,
    // query,
    isLoaded,
    isLoggedIn,
  };
}
