import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { IHasId } from '@/types/HasId';
import { IPaginatedResponse } from '@/types/Pagination';
import { MongoId } from '@/types/MongoDocument';
import { IMemberFilters } from '@/requests/api/members/paginated/schema';
import { EMemberRole, IMember } from '@/types/Member';
import { postApiMembersPaginated } from '@/requests/api/members/paginated';
import { deleteApiMembers } from '@/requests/api/members';
import { postApiMembersEnabled } from '@/requests/api/members/enabled';
import { postApiMembersResendInvite } from '@/requests/api/members/resendInvite';
import { postApiMembersRole } from '@/requests/api/members/role';

export default function useMembers(filters: IMemberFilters, key?: string) {
  const [data, setData] = useState<IPaginatedResponse<IHasId<IMember>>>();
  const [initLoad, setInitLoad] = useState(false);
  const [loading, setLoading] = useState(true);

  const query = useQuery({
    queryKey: ['/api/members/paginated', filters, key],
    queryFn: () => {
      setLoading(true);
      return postApiMembersPaginated(filters);
    },
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (query.isFetched) {
      setData(query.data || undefined);
      setLoading(false);
      setInitLoad(true);
    }
  }, [query.data]);

  async function deleteItems(ids: MongoId[], teamId: MongoId) {
    await deleteApiMembers({ ids, teamId });
    query.refetch();
  }

  async function enableItem(memberId: MongoId, enabled: boolean) {
    const response = await postApiMembersEnabled({ memberId, enabled });
    query.refetch();
    return response;
  }

  async function changeRole(memberId: MongoId, role: EMemberRole) {
    const response = await postApiMembersRole({ memberId, role });
    query.refetch();
    return response;
  }

  async function resendInvite(memberId: MongoId) {
    const response = await postApiMembersResendInvite({ memberId });
    query.refetch();
    return response;
  }

  return {
    data,
    query,
    deleteItems,
    loading,
    initLoad,
    enableItem,
    resendInvite,
    changeRole,
  };
}
