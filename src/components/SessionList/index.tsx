import { ISession } from '@/types/Session';
import Button from '@/components/Buttton';
import SessionListItem from '@/components/SessionList/SessionListItem';
import FormattedDate from '@/components/FormattedDate';
import { MongoId } from '@/types/MongoDocument';
import useTheme from "@/hooks/UseTheme";
import { cn } from "@/util/Cn";
import { ETheme } from "@/common/Theme";

interface IProps {
  items: ISession[];
  onClickDelete: (id: MongoId) => void;
}

export default function SessionList({ items, onClickDelete }: IProps) {
  const theme = useTheme();

  return (
    <ul
      role="list"
      className="space-y-6"
    >
      {items.map((item) => (
        <li
          key={String(item._id)}
          className={cn('py-6 rounded px-4',
            theme === ETheme.light ? 'bg-gray-200' : null,
            theme === ETheme.dark ? 'bg-gray-700' : null,
          )}
        >
          <div className="space-y-6">
            <SessionListItem
              label="Ip"
              value={item.ip}
            />
            <SessionListItem
              label="User Agent"
              value={item.userAgent}
            />
            <SessionListItem
              label="Last Seen"
              value={<FormattedDate value={item.lastSeen} />}
            />
            <div className="flex justify-end">
              <Button
                variant="red"
                onClick={() => onClickDelete(String(item._id))}
                isInline
              >
                Log Out
              </Button>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
