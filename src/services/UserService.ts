'use client';
import { useEffect, useState } from 'react';
import { getApiUserCurrent } from '@/requests/api/user/current';
import _ from 'lodash';
import userStore, { IUserStore } from '@/stores/UserStore';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import BasicController from '@/util/BasicController';
import { getApiUserLogout } from '@/requests/api/user/logout';
import tokenService from '@/services/TokenService';
import { IUserCurrentResponse } from '@/types/UserCurrent';

export class UserService extends BasicController<IUserStore> {
  query: UseQueryResult<IUserCurrentResponse | null, Error> | undefined;

  useController = () => {
    // this._useController();
    [this.state, this.updateState] = useState(userStore.get());

    useEffect(() => {
      if (this.updateState) {
        return userStore.subscribe(this.updateState);
      }
    }, []);

    this.query = useQuery({
      queryKey: ['/api/user/current'],
      queryFn: getApiUserCurrent,
      refetchOnWindowFocus: false,
    });

    useEffect(() => {
      // console.log(
      //   'this.query?.isFetched',
      //   this.query?.isFetched,
      //   this.query?.data,
      // );
      if (!this.query?.isFetched) {
        return;
      }

      const data = this.query?.data;

      userStore.set({
        user: data?.user || null,
        loaded: true,
      });

      if (data?.accessToken) {
        tokenService.save(data.accessToken);
      }
    }, [this.query.isFetching]);
  };

  reload = () => {
    if (this.query) {
      this.query.refetch();
    }
  };

  isLoaded = (): boolean => {
    return this.state?.loaded;
  };

  isLoggedIn = (): boolean => {
    return !_.isEmpty(this.state?.user || undefined);
  };

  logout = async () => {
    await getApiUserLogout();
    tokenService.remove();
    // this.reload();
  };
}

const userService = new UserService();
export default userService;
