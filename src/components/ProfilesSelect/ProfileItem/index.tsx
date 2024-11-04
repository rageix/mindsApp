import { IHasId } from '@/types/HasId';
import { IProfile } from '@/types/Profile';

interface IProps {
  value: IHasId<IProfile>;
}
export default function ProfileItem({ value }: IProps) {
  return <div>{value.name}</div>;
}
