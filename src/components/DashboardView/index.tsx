'use client';
import useCurrentUserTeams from '@/hooks/UseCurrentUserTeams';
import { useRouter } from 'next/navigation';
import { ChevronRightIcon, UsersRoundIcon } from 'lucide-react';
import Link from 'next/link';
import Container from '@/components/Container';
import Card from '@/components/Card';
import CardBody from '@/components/Card/CardBody';
import CardHeader from '@/components/Card/CardHeader';
import CardTitle from '@/components/Card/CardTitle';
import { useEffect, useState } from 'react';
import Loading from '@/components/Loading';

export default function DashboardView() {
  const [loading, setLoading] = useState(true);
  const teams = useCurrentUserTeams();
  const router = useRouter();

  useEffect(() => {
    if (teams.query.isFetched && teams.data) {
      if (teams.data.length === 1) {
        router.push(`/dashboard/${teams.data[0]._id}`);
        return;
      }

      setLoading(false);
    }
  }, [teams.data]);

  if (loading) {
    return (
      <div className="flex h-screen justify-center items-center">
        <Loading size="lg" />
      </div>
    );
  }

  return (
    <div className="flex h-screen items-center">
      <Container size="3xl">
        <Card>
          <CardHeader>
            <CardTitle>Your Teams</CardTitle>
          </CardHeader>
          <CardBody>
            <ul
              role="list"
              className="flex flex-col space-y-3"
            >
              {teams.data.map((item) => (
                <Link
                  key={String(item._id)}
                  href={`/dashboard/${item._id}`}
                >
                  <li className="relative flex py-5 px-4 w-full border border-gray-500 rounded-xl shadow text-gray-400 hover:bg-gray-800 hover:text-white bg-gray-900 hover:border-white">
                    <div className="flex gap-x-4 pr-6 grow">
                      <div className="h-12 w-12 flex-none overflow-hidden rounded-full bg-gray-500 text-black">
                        <UsersRoundIcon className="w-full h-full" />
                      </div>
                      <div className="min-w-0 flex-auto flex items-center">
                        <p className="text-sm font-semibold leading-6 ">
                          <span className="absolute inset-x-0 -top-px bottom-0" />
                          {item.name}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center shrink-0 justify-end gap-x-4 sm:flex-none">
                      <ChevronRightIcon
                        aria-hidden="true"
                        className="h-5 w-5 flex-none "
                      />
                    </div>
                  </li>
                </Link>
              ))}
            </ul>
          </CardBody>
        </Card>
      </Container>
    </div>
  );
}
