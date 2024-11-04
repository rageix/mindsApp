import { ISession } from '@/types/Session';
import Button from '@/components/Buttton';
import SessionListItem from '@/components/SessionList/SessionListItem';
import FormattedDate from '@/components/FormattedDate';
import { MongoId } from '@/types/MongoDocument';

interface IProps {
  items: ISession[];
  onClickDelete: (id: MongoId) => void;
}

export default function SessionList({ items, onClickDelete }: IProps) {
  return (
    <ul
      role="list"
      className="divide-y divide-gray-700 space-y-6"
    >
      {items.map((item) => (
        <li
          key={String(item._id)}
          className="py-6 rounded bg-gray-700 px-4"
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
            <Button
              variant="red"
              onClick={() => onClickDelete(String(item._id))}
              isInline
            >
              Log Out
            </Button>
          </div>
        </li>
      ))}
    </ul>
  );
}
