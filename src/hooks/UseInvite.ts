import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { IHasId } from '@/types/HasId';
import { MongoId } from '@/types/MongoDocument';
import { IInvite } from '@/types/Invite';
import { postApiInvitesFindOne } from '@/requests/api/invites/findOne';

export default function useInvite(_id: MongoId | undefined, teamId: MongoId) {
  const [data, setData] = useState<IHasId<IInvite>>();
  const [initLoad, setInitLoad] = useState(false);
  const [loading, setLoading] = useState(true);

  const query = useQuery({
    queryKey: ['/api/invites/findOne', _id, teamId],
    queryFn: _id
      ? () => {
          setLoading(true);
          return postApiInvitesFindOne({ _id, teamId });
        }
      : undefined,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (query.isFetched) {
      setData(query.data || undefined);
      setInitLoad(true);
      setLoading(false);
    }
  }, [query.data]);

  function reload() {
    setData(undefined);
    query.refetch();
  }

  return { data, query, reload, initLoad, loading };
}
