'use client';

import Container from '@/components/Container';
import Card from '@/components/Card';
import CardBody from '@/components/Card/CardBody';
import CardImage from '@/components/VirtualCards/CardImage';
import CalendarItem from '@/components/VirtualCards/CalendarItem';
import { ICalItem } from '@/components/VirtualCards/types';
import { useMemo, useState } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  HashIcon,
  InfoIcon,
  UserRoundIcon,
} from 'lucide-react';
import { Button } from '@headlessui/react';
import { cn } from '@/util/Cn';
import useVCProfile from '@/hooks/UseVCProfile';
import { useParams, useRouter } from 'next/navigation';
import Loading from '@/components/Loading';
import { SocialLink } from '@/components/VirtualCards/Dynamic/SocialLink';

const people = [
  {
    name: 'Leslie Alexander',
    role: 'Co-Founder / CEO',
    imageUrl:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80',
    bio: 'Ultricies massa malesuada viverra cras lobortis. Tempor orci hac ligula dapibus mauris sit ut eu. Eget turpis urna maecenas cras. Nisl dictum.',
    xUrl: '#',
    linkedinUrl: '#',
    phone: '+1 (999) 999-9999',
    email: 'someone@someplace.com',
  },
];

const calItems: ICalItem[] = [
  {
    label: '9:00 AM - 9:30 AM',
  },
  {
    label: '9:30 AM - 10:00 AM',
  },
  {
    label: '10:00 AM - 10:30 AM',
  },
  {
    label: '10:30 AM - 11:00 AM',
  },
  {
    label: '11:00 AM - 11:30 AM',
  },
  {
    label: '11:30 AM - 12:00 PM',
  },
  {
    label: '12:30 PM - 1:00 PM',
  },
  {
    label: '1:00 PM - 1:30 PM',
  },
  {
    label: '1:30 AM - 2:00 PM',
  },
];

type TTab = 'info' | 'socials' | 'calendar';

export default function VirtualCardDynamic() {
  const { cardId } = useParams<{ cardId: string }>();
  const vcProfile = useVCProfile(cardId);
  const [tab, _setTab] = useState<TTab>('info');
  const router = useRouter();
  const person = people[0];

  const enabledSocials = useMemo(
    () => (vcProfile.data?.socials || []).filter((v) => v.enabled),
    [vcProfile.data],
  );

  if (!vcProfile.initLoad) {
    return (
      <div className="flex justify-center items-center mt-16">
        <Loading
          size="lg"
          showAfter={2000}
        />
      </div>
    );
  }

  const data = vcProfile.data;

  if (!data) {
    router.push('/404');
    return null;
  }

  return (
    <div className="min-h-screen h-full flex items-center">
      <Container size="3xl">
        <Card rounded="2xl">
          <CardBody>
            <div
              key={person.name}
              className="flex flex-col gap-10 sm:flex-row text-center sm:text-left justify-center sm:justify-normal w-[19.5rem] sm:w-auto sm:h-[17.5rem] rounded-2xl overflow-hidden"
            >
              <div className="w-full sm:w-52 flex flex-col justify-center shrink-0">
                {/*<img*/}
                {/*  alt=""*/}
                {/*  src={person.imageUrl}*/}
                {/*  className="aspect-[4/5] w-52 flex-none rounded-2xl object-cover"*/}
                {/*/>*/}
                <div className="flex justify-center">
                  <CardImage
                    _id={data.avatars[0].value[0]}
                    // className="aspect-[4/5] w-52 flex-none rounded-2xl object-cover"
                  />
                </div>
                <div className="sm:hidden flex-1 mt-4">
                  <ul className="flex space-x-3 justify-center">
                    <li className="w-10 h-10">
                      <Button
                        className="w-full h-full flex justify-center items-center rounded-full bg-gray-700 hover:bg-gray-600"
                        onClick={() => _setTab('info')}
                      >
                        <InfoIcon size={20} />
                      </Button>
                    </li>
                    {enabledSocials.length > 0 && (
                      <li className="w-10 h-10">
                        <Button
                          className="w-full h-full flex justify-center items-center rounded-full bg-gray-700 hover:bg-gray-600"
                          onClick={() => _setTab('socials')}
                        >
                          <HashIcon size={20} />
                        </Button>
                      </li>
                    )}
                    {/*<li className="w-10 h-10">*/}
                    {/*  <Button*/}
                    {/*    className="w-full h-full flex justify-center items-center rounded-full bg-gray-700 hover:bg-gray-600"*/}
                    {/*    onClick={() => _setTab('calendar')}*/}
                    {/*  >*/}
                    {/*    <CalendarIcon size={20} />*/}
                    {/*  </Button>*/}
                    {/*</li>*/}
                  </ul>
                </div>
              </div>
              {tab === 'info' && (
                <div className="max-w-xl flex-auto">
                  <div className="mb-6">
                    <h1 className="text-2xl font-bold leading-8 tracking-tight text-white">
                      {data.fullName.value}
                    </h1>
                    <p className="text-base leading-7 text-gray-200">
                      {data.title.value}
                    </p>
                  </div>
                  {data.items.length > 0 && (
                    <div className="mb-3">
                      {data.items.map((v, i) => (
                        <p
                          key={i}
                          className="text-base leading-7 text-gray-200"
                        >
                          {v.value}
                        </p>
                      ))}
                    </div>
                  )}
                  {data.bio && (
                    <div>
                      <p className="text-base leading-7 text-gray-400">
                        {data.bio.value}
                      </p>
                    </div>
                  )}
                </div>
              )}
              {tab === 'socials' && (
                <div className="max-w-xl sm:w-[36rem] flex-auto">
                  <div className="w-full">
                    {enabledSocials.map((v, i) => (
                      <SocialLink
                        key={i}
                        social={v}
                      />
                    ))}
                  </div>
                </div>
              )}
              {tab === 'calendar' && (
                <div className="max-w-xl sm:w-[36rem] flex-auto">
                  <div className="flex justify-between items-center">
                    <Button className="w-10 h-10 flex justify-center items-center rounded-full bg-gray-700 hover:bg-gray-600 text-gray-200">
                      <ChevronLeft
                        size={20}
                        className="me-1"
                      />
                    </Button>
                    <Button className="h-10 flex justify-center items-center rounded-xl px-4 text-2xl text-gray-200 bg-gray-700 hover:bg-gray-600">
                      <span>Today</span>
                    </Button>
                    <Button className="w-10 h-10 flex justify-center items-center rounded-full bg-gray-700 hover:bg-gray-600 text-gray-200">
                      <ChevronRight
                        size={20}
                        className="ms-1"
                      />
                    </Button>
                  </div>
                  <ul className="flex flex-col space-y-2 mt-4 h-[17rem] sm:h-[14rem] overflow-hidden overflow-y-scroll disable-scrollbars rounded-2xl">
                    {calItems.map((v) => (
                      <CalendarItem
                        key={v.label}
                        item={v}
                      />
                    ))}
                  </ul>
                </div>
              )}
              <div className="w-10 hidden sm:block">
                <ul className="flex flex-col space-y-3">
                  <li className="w-10 h-10">
                    <Button
                      className={cn(
                        'w-full h-full flex justify-center items-center rounded-full hover:bg-gray-600 hover:text-white',
                        tab === 'info'
                          ? 'text-white bg-gray-600'
                          : 'text-gray-200 bg-gray-700',
                      )}
                      onClick={() => _setTab('info')}
                    >
                      <UserRoundIcon size={20} />
                    </Button>
                  </li>
                  {enabledSocials.length > 0 && (
                    <li className="w-10 h-10">
                      <Button
                        className={cn(
                          'w-full h-full flex justify-center items-center rounded-full hover:bg-gray-600 hover:text-white',
                          tab === 'socials'
                            ? 'text-white bg-gray-600'
                            : 'text-gray-200 bg-gray-700',
                        )}
                        onClick={() => _setTab('socials')}
                      >
                        <HashIcon size={20} />
                      </Button>
                    </li>
                  )}
                  {/*<li className="w-10 h-10">*/}
                  {/*  <Button*/}
                  {/*    className={cn(*/}
                  {/*      'w-full h-full flex justify-center items-center rounded-full hover:bg-gray-600 hover:text-white',*/}
                  {/*      tab === 'calendar'*/}
                  {/*        ? 'text-white bg-gray-600'*/}
                  {/*        : 'text-gray-200 bg-gray-700',*/}
                  {/*    )}*/}
                  {/*    onClick={() => _setTab('calendar')}*/}
                  {/*  >*/}
                  {/*    <CalendarIcon size={20} />*/}
                  {/*  </Button>*/}
                  {/*</li>*/}
                </ul>
              </div>
            </div>
          </CardBody>
        </Card>
      </Container>
    </div>
  );
}
