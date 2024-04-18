import { getBreweryById } from '@/lib/actions/brewery.actions';
import { formatDateTime } from '@/lib/utils';
import { SearchBreweryParamProps } from '@/types';
import { Link } from 'next-view-transitions';
import Image from 'next/image';

const BreweryDetails = async ({ params: { id } }: SearchBreweryParamProps) => {
  const brewery = await getBreweryById(id);

  return (
    <>
      <section className="flex justify-center bg-primary-50 bg-dotted-pattern bg-contain">
        <div className="grid grid-cols-1 md:grid-cols-2 2xl:max-w-7xl">
          <Image
            src={brewery.imageUrl}
            alt={`${brewery.name} logo`}
            width={1000}
            height={1000}
            className="h-full min-h-[300px] object-cover object-center"
          />

          <div className="flex w-full flex-col gap-8 p-5 md:p-10">
            <div className="flex flex-col gap-6">
              <h2 className="h2-bold">{brewery.name}</h2>
            </div>

            <div className="flex flex-col">
              <div className="flex gap-2 md:gap-3">
                <div className="p-medium-16 lg:p-regular-20 flex flex-wrap items-center"></div>
              </div>

              <div className="p-regular-20 flex items-center gap-3">
                <Image
                  src="/assets/icons/location.svg"
                  alt="location"
                  width={32}
                  height={32}
                />
                <p className="p-medium-16 lg:p-regular-20">
                  {brewery.location}
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <p className="p-bold-20 text-grey-600">About {brewery.name}:</p>
              <p className="p-medium-16 lg:p-regular-18">
                {brewery.description}
              </p>
              <p className="p-medium-16 lg:p-regular-18 truncate text-primary-500 underline">
                <Link href={brewery.url} target="_blank">
                  {brewery.url}
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default BreweryDetails;
