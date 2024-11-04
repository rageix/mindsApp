import { useParams } from 'next/navigation';
import { ITeamIdParams } from '@/types/TeamIdParams';

export default function useTeamId() {
  const params = useParams<ITeamIdParams>();

  return params.teamId;
}
