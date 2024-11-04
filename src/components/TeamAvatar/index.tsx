import ProtectedImage from '@/components/ProtectedImage';
import { UsersRoundIcon } from 'lucide-react';
import { MongoId } from '@/types/MongoDocument';

interface IProps {
  value?: MongoId;
}

export default function TeamAvatar({ value }: IProps) {
  if (!value) {
    return <UsersRoundIcon className="w-full h-full" />;
  }

  return (
    <ProtectedImage
      _id={value}
      alt="Team Avatar"
      width="0"
      height="0"
      sizes="100vw"
      className="w-full h-full"
    />
  );
}
