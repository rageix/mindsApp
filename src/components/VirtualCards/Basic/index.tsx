'use client';

import Container from '@/components/Container';
import Card from '@/components/Card';
import CardBody from '@/components/Card/CardBody';
import CardImage from '@/components/VirtualCards/CardImage';
import CalendarItem from '@/components/VirtualCards/CalendarItem';
import { ICalItem } from '@/components/VirtualCards/types';
import { useState } from 'react';
import {
  CalendarIcon,
  ChevronLeft,
  ChevronRight,
  InfoIcon,
  UserRoundIcon,
} from 'lucide-react';
import { Button } from '@headlessui/react';
import { cn } from '@/util/Cn';

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

type TTab = 'info' | 'calendar';

export default function VirtualCardBasic() {
  const [tab, _setTab] = useState<TTab>('calendar');
  const person = people[0];

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
                    src={person.imageUrl}
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
                    <li className="w-10 h-10">
                      <Button
                        className="w-full h-full flex justify-center items-center rounded-full bg-gray-700 hover:bg-gray-600"
                        onClick={() => _setTab('calendar')}
                      >
                        <CalendarIcon size={20} />
                      </Button>
                    </li>
                  </ul>
                </div>
              </div>
              {tab === 'info' && (
                <div className="max-w-xl flex-auto">
                  <h1 className="text-2xl font-bold leading-8 tracking-tight text-white">
                    {person.name}
                  </h1>
                  <p className="text-base leading-7 text-gray-200">
                    {person.role}
                  </p>
                  <div className="mt-6">
                    <p className="text-base leading-7 text-gray-200">
                      {person.phone}
                    </p>
                    <p className="text-base leading-7 text-gray-200">
                      {person.email}
                    </p>
                    <p className="mt-3 text-base leading-7 text-gray-400">
                      {person.bio}
                    </p>
                  </div>

                  <ul
                    role="list"
                    className="mt-6 flex gap-x-6"
                  >
                    <li>
                      <a
                        href={person.xUrl}
                        className="text-gray-400 hover:text-gray-500"
                      >
                        <span className="sr-only">X</span>
                        <svg
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          aria-hidden="true"
                          className="h-5 w-5"
                        >
                          <path d="M11.4678 8.77491L17.2961 2H15.915L10.8543 7.88256L6.81232 2H2.15039L8.26263 10.8955L2.15039 18H3.53159L8.87581 11.7878L13.1444 18H17.8063L11.4675 8.77491H11.4678ZM9.57608 10.9738L8.95678 10.0881L4.02925 3.03974H6.15068L10.1273 8.72795L10.7466 9.61374L15.9156 17.0075H13.7942L9.57608 10.9742V10.9738Z" />
                        </svg>
                      </a>
                    </li>
                    <li>
                      <a
                        href={person.linkedinUrl}
                        className="text-gray-400 hover:text-gray-500"
                      >
                        <span className="sr-only">LinkedIn</span>
                        <svg
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          aria-hidden="true"
                          className="h-5 w-5"
                        >
                          <path
                            d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z"
                            clipRule="evenodd"
                            fillRule="evenodd"
                          />
                        </svg>
                      </a>
                    </li>
                  </ul>
                </div>
              )}
              {tab === 'calendar' && (
                <div className="max-w-xl flex-auto">
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
                  <li className="w-10 h-10">
                    <Button
                      className={cn(
                        'w-full h-full flex justify-center items-center rounded-full hover:bg-gray-600 hover:text-white',
                        tab === 'calendar'
                          ? 'text-white bg-gray-600'
                          : 'text-gray-200 bg-gray-700',
                      )}
                      onClick={() => _setTab('calendar')}
                    >
                      <CalendarIcon size={20} />
                    </Button>
                  </li>
                </ul>
              </div>
            </div>
          </CardBody>
        </Card>
      </Container>
    </div>
  );
}
