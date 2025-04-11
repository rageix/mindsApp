import DashboardPageHeader from '@/components/DashboardPageHeader';
import ChatsList from './ChatsList';
import { useRouter } from 'next/navigation';

export default function MyChatsView() {
  const router = useRouter();

  return (
    <>
      <div className="max-w-3xl m-auto">
        <DashboardPageHeader title="My Chats" />
        <ChatsList
          onNew={() => router.push('/chat')}
          onOpenId={(_id) => router.push('/chat/' + _id)}
        />
      </div>
    </>
  );
}
