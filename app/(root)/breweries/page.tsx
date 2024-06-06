import { getAllBreweries } from '@/lib/actions/brewery.actions';
import { IBrewery } from '@/lib/database/models/brewery.model';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const Breweries = async () => {
  const breweries: IBrewery[] = await getAllBreweries();

  return (
    <>
      <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
        <div className="wrapper flex items-center justify-center sm:justify-between">
          <h3 className="h3-bold text-center sm:text-left">Breweries</h3>
          {/* <Button asChild className="button hidden sm:flex" size="lg">
            <Link href="/#events"></Link>
          </Button> */}
        </div>
      </section>
      <section className="wrapper grid w-full grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:gap-10 my-10">
        {breweries.map(brewery => (
          <div
            className="flex flex-col items-center text-center"
            key={brewery._id}
          >
            <Link href={`/brewery/${brewery._id}`}>
              <Image
                src={`${brewery.imageUrl}`}
                alt={brewery.name}
                width={150}
                height={150}
                className="text-center"
              ></Image>
              {brewery.name}
            </Link>
          </div>
        ))}
      </section>
    </>
  );
};

export default Breweries;
