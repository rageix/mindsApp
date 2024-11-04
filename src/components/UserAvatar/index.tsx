import { UserRoundIcon } from 'lucide-react';
import { MongoId } from '@/types/MongoDocument';
import ProtectedImage from '@/components/ProtectedImage';

interface IProps {
  value?: MongoId;
}

export function UserAvatar({ value }: IProps) {
  if (!value) {
    return <UserRoundIcon className="w-full h-full" />;
  }

  return (
    <ProtectedImage
      key={String(value)}
      _id={value}
      alt="User Avatar"
      width="0"
      height="0"
      sizes="100vw"
      className="w-full h-full"
    />
  );
}
