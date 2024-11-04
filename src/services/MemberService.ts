'use client';
import { useEffect, useState } from 'react';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import BasicController from '@/util/BasicController';
import memberStore, { IMemberStore } from '@/stores/MemberStore';
import { getApiUserCurrentTeamsMember } from '@/requests/api/user/teams/member';
import { useParams } from 'next/navigation';
import { IHasId } from '@/types/HasId';
import { EMemberRole, IMember } from '@/types/Member';

const settingAllow: EMemberRole[] = [EMemberRole.Owner, EMemberRole.Admin];

export class MemberService extends BasicController<IMemberStore> {
  query: UseQueryResult<IHasId<IMember> | null, Error> | undefined;

  useController = () => {
    [this.state, this.updateState] = useState(memberStore.get());
    const { teamId } = useParams<{ teamId: string }>();

    useEffect(() => {
      if (this.updateState) {
        return memberStore.subscribe(this.updateState);
      }
    }, []);

    this.query = useQuery({
      queryKey: ['/api/user/current/teams/member', teamId],
      queryFn: () =>
        !teamId ? null : getApiUserCurrentTeamsMember({ teamId }),
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

      memberStore.set({
        data: this.query?.data || null,
        loaded: true,
      });
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

  canAccessTeamSettings = (): boolean => {
    return settingAllow.findIndex((v) => v === this.state?.data?.role) > -1;
  };
}

const memberService = new MemberService();
export default memberService;
