import CategoryFilter from '@/components/shared/CategoryFilter';
import Collection from '@/components/shared/Collection';
import Search from '@/components/shared/Search';
import { Button } from '@/components/ui/button';
import { getAllEvents } from '@/lib/actions/event.actions';
import { SearchParamProps } from '@/types';
import Image from 'next/image';
import { Link } from 'next-view-transitions';
import HappyHour from '@/components/shared/HappyHour';
import { getAllBreweries } from '@/lib/actions/brewery.actions';
import { IBrewery } from '@/lib/database/models/brewery.model';
import FoodTrucks from '@/components/shared/FoodTrucks';

export default async function Home({ searchParams }: SearchParamProps) {
  const page = Number(searchParams?.page) || 1;
  const searchText = (searchParams?.query as string) || '';
  const category = (searchParams?.category as string) || '';

  const events = await getAllEvents({
    query: searchText,
    category: category,
    page: page,
    limit: 6,
  });

  const breweries: IBrewery[] = await getAllBreweries();

  return (
    <>
      <section className="bg-primary-50 bg-dotted-pattern bg-contain py-5 md:py-10">
        <div className="wrapper grid grid-cols-1 gap-5 md:grid-cols-2 2xl:gap-0">
          <div className="flex flex-col justify-center gap-8">
            <h1 className="h1-bold">Hampton Roads Brewery Specials & Events</h1>
            <p className="p-regular-20 md:p-regular-24">
              Find daily happy hours, food trucks and other events at all of
              your favorite hampton roads breweries!
            </p>
            <Button size="lg" asChild className="button w-full sm:w-fit">
              <Link href="#events">Explore Now</Link>
            </Button>
          </div>
          <Image
            src="/assets/images/corgi-beer.webp"
            alt="hero"
            width={1000}
            height={1000}
            className="max-h-[60vh] object-contain object-center 2xl:max-h-[50vh]"
          />
        </div>
      </section>

      <section
        id="events"
        className="wrapper my-8 flex flex-col gap-8 md:gap-12"
      >
        <h2 className="h2-bold">Daily Events</h2>
        <div className="flex w-full flex-col gap-5 md:flex-row">
          <HappyHour data={breweries} />
          <FoodTrucks data={events?.data} />
        </div>
      </section>
      <section
        id="more_events"
        className="wrapper my-8 flex flex-col gap-8 md:gap-12"
      >
        <h2 className="h2-bold">
          Upcomming <br /> Brewery Events
        </h2>
        <div className="flex w-full flex-col gap-5 md:flex-row">
          <Search />
          <CategoryFilter />
        </div>

        <Collection
          data={events?.data}
          emptyTitle="No Events Found"
          emptyStateSubtext="Come back later"
          collectionType="All_Events"
          limit={6}
          page={1}
          totalPages={events?.totalPages}
        />
      </section>
    </>
  );
}
