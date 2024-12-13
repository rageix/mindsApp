import { IUserCache } from '@/types/UserCache';
import { UserAvatar } from '@/components/UserAvatar';
import useTheme from "@/hooks/UseTheme";
import { cn } from "@/util/Cn";
import { ETheme } from "@/common/Theme";

interface IProps {
  value?: IUserCache;
}

export default function UserInfo({ value }: IProps) {
  const theme = useTheme();
  if (!value) {
    return null;
  }

  return (
    <div className="flex min-w-0 gap-x-4 items-center">
      <div className="h-12 w-12 flex-none rounded-full overflow-hidden bg-gray-500">
        <UserAvatar value={value?.avatar} />
      </div>
      <div className="min-w-0 flex-auto">
        <p className={cn('text-sm font-semibold leading-6',
          theme === ETheme.light ? 'text-gray-900' : null,
          theme === ETheme.dark ? 'text-white' : null,
          )}>
          {value.name}
        </p>
        <p className={cn("mt-1 truncate text-xs leading-5 text-gray-200",
          theme === ETheme.light ? 'text-gray-500' : null,
          theme === ETheme.dark ? 'text-gray-200' : null,)}>
          {value.email}
        </p>
      </div>
    </div>
  );
}
