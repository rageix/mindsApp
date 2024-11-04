import { IUserCache } from '@/types/UserCache';
import { UserAvatar } from '@/components/UserAvatar';

interface IProps {
  value?: IUserCache;
}

export default function UserInfo({ value }: IProps) {
  if (!value) {
    return null;
  }

  return (
    <div className="flex min-w-0 gap-x-4 items-center">
      <div className="h-12 w-12 flex-none rounded-full overflow-hidden bg-gray-500">
        <UserAvatar value={value?.avatar} />
      </div>
      <div className="min-w-0 flex-auto">
        <p className="text-sm font-semibold leading-6 text-white">
          {value.name}
        </p>
        <p className="mt-1 truncate text-xs leading-5 text-gray-200">
          {value.email}
        </p>
      </div>
    </div>
  );
}
