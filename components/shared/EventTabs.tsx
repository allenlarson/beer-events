'use client';

import { IEvent } from '@/lib/database/models/event.model';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { formatDateTime } from '@/lib/utils';
import { useEffect, useState } from 'react';
import { Button } from '../ui/button';
import Link from 'next/link';
import Image from 'next/image';

type FoodTruckProps = {
  data: IEvent[];
};

const EventTabs = ({ data }: FoodTruckProps) => {
  const [category, setCategory] = useState<string>('Food Trucks');

  useEffect(() => {
    category;
  }, []);

  const handleClick = (e: string) => {
    setCategory(e);
    console.log(e);
    console.log(category);
  };
  const today = formatDateTime(new Date()).sameTime;
  const todaysEvents = data.filter(
    event =>
      formatDateTime(event.startDateTime).sameTime === today &&
      event.category.name === category
  );

  return (
    <div className="w-full">
      <div className="flex w-full flex-row gap-4 justify-center whitespace-nowrap overflow-x-auto">
        <Button
          variant="secondary"
          size="square"
          className={`flex flex-col gap-2 ${
            category === 'Food Trucks' ? 'bg-primary-500' : ''
          }`}
          onClick={() => handleClick('Food Trucks')}
        >
          <Image
            src="/assets/icons/foodtruck.svg"
            alt="hero"
            width={50}
            height={50}
            className=""
          />
          Food Trucks
        </Button>
        <Button
          variant="secondary"
          size="square"
          className={`flex flex-col gap-2 ${
            category === 'Music Bingo' ? 'bg-primary-500' : ''
          }`}
          onClick={() => handleClick('Music Bingo')}
        >
          <Image
            src="/assets/icons/musicbingo.svg"
            alt="hero"
            width={50}
            height={50}
            className=""
          />
          Music Bingo
        </Button>
        <Button
          variant="secondary"
          size="square"
          className={`flex flex-col gap-2 ${
            category === 'Trivia' ? 'bg-primary-500' : ''
          }`}
          onClick={() => handleClick('Trivia')}
        >
          <Image
            src="/assets/icons/trivia.svg"
            alt="hero"
            width={50}
            height={50}
            className=""
          />
          Trivia
        </Button>
        <Button
          variant="secondary"
          size="square"
          className={`flex flex-col gap-2 ${
            category === 'Live Music' ? 'bg-primary-500' : ''
          }`}
          onClick={() => handleClick('Live Music')}
        >
          <Image
            src="/assets/icons/livemusic.svg"
            alt="hero"
            width={45}
            height={45}
            className=""
          />
          Live Music
        </Button>
      </div>
      <h3 className="h3-bold p-12 justify-center text-center">{category}</h3>
      <Table className="w-full">
        <TableHeader>
          <TableRow>
            <TableHead className="">Brewery</TableHead>
            <TableHead className="text-right">{category}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {todaysEvents.map(event => (
            <TableRow key={event.brewery.name}>
              <TableCell className="font-medium text-sm md:text-lg">
                <Link href={`brewery/${event.brewery._id}`}>
                  {event.brewery.name}
                </Link>
              </TableCell>

              <TableCell className="text-right text-sm md:text-lg">
                {event.title}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default EventTabs;
