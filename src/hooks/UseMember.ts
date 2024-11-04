import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { IHasId } from '@/types/HasId';
import { MongoId } from '@/types/MongoDocument';
import { IMember } from '@/types/Member';
import { postApiMembersFindOne } from '@/requests/api/members/findOne';

export default function useMember(_id: MongoId | undefined, teamId: MongoId) {
  const [data, setData] = useState<IHasId<IMember>>();
  const [initLoad, setInitLoad] = useState(false);
  const [loading, setLoading] = useState(true);

  const query = useQuery({
    queryKey: ['/api/members/findOne', _id, teamId],
    queryFn: _id
      ? () => {
          setLoading(true);
          return postApiMembersFindOne({ _id, teamId });
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

  return { data, query, initLoad, loading };
}
