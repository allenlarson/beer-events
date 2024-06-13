import { IEvent } from '@/lib/database/models/event.model';
import { formatDateTime } from '@/lib/utils';
import { auth } from '@clerk/nextjs';
import Image from 'next/image';
import { Link } from 'next-view-transitions';
import React from 'react';
import { DeleteConfirmation } from './DeleteConfirmation';

type CardProps = {
  event: IEvent;
  hasOrderLink?: boolean;
  hidePrice?: boolean;
};

const OtherEvents = ({ event, hasOrderLink, hidePrice }: CardProps) => {
  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string;

  const isEventCreator = userId === event.organizer._id.toString();

  return (
    <div className="w-full flex p-4 border-b border-y-gray-300 py-6 hover:bg-primary-500">
      <div className="flex flex-col  w-[15%] justify-center">
        <p className="uppercase">
          <Link href={`/events/${event._id}`}>
            {formatDateTime(event.startDateTime).dateMonth}
          </Link>
        </p>
        <p className="h2-bold">
          <Link href={`/events/${event._id}`}>
            {formatDateTime(event.startDateTime).dateDay}
          </Link>
        </p>
      </div>
      <div className="flex flex-col w-[65%] justify-center pl-3">
        <Link href={`/events/${event._id}`}>
          <p className="text-xl font-semibold">{event.title}</p>
        </Link>
        <p className="flex text-sm uppercase tracking-wide">
          {event.brewery.name}
        </p>
      </div>
      <div className="flex flex-col w-[20%] justify-center items-center">
        <p className="font-semibold">
          {formatDateTime(event.startDateTime).timeOnly}
        </p>
        {isEventCreator && (
          <div className="flex gap-4 rounded-xl p-3 shadow-sm transition-all">
            <Link href={`/events/${event._id}/update`}>
              <Image
                src="/assets/icons/edit.svg"
                alt="edit"
                width={20}
                height={20}
              />
            </Link>

            <DeleteConfirmation eventId={event._id} />
          </div>
        )}
      </div>
    </div>
  );
};

export default OtherEvents;
