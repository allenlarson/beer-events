import { getBreweryById } from '@/lib/actions/brewery.actions';
import { formatDateTime } from '@/lib/utils';
import { SearchBreweryParamProps } from '@/types';
import { Link } from 'next-view-transitions';
import Image from 'next/image';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

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

              <div className="p-regular-20 flex items-center gap-2">
                <Image
                  src="/assets/icons/location.svg"
                  alt="location"
                  width={32}
                  height={32}
                />
                <p className="p-medium-16 lg:p-regular-16">
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
            <div className="p-regular-20 flex-col items-center">
              <p className="p-bold-20 text-grey-600 pb-3">Follow:</p>
              <div className="flex items-center gap-6">
                <Link
                  href={brewery.facebook}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <Image
                    src="/assets/icons/facebook.svg"
                    alt="location"
                    width={32}
                    height={32}
                    className="filter-primary"
                  />
                </Link>
                <Link href={brewery.instagram} target="_blank">
                  <Image
                    src="/assets/icons/instagram.svg"
                    alt="location"
                    width={32}
                    height={32}
                    className="filter-primary"
                  />
                </Link>
                <Link href={brewery.untappd} target="_blank">
                  <Image
                    src="/assets/icons/untappd.svg"
                    alt="location"
                    width={32}
                    height={32}
                    className="filter-primary"
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="wrapper my-8">
        <div className="flex flex-col gap-6 md:gap-8 md:flex-row justify-center">
          <div className="md:w-[50%] p-8 rounded-xl border-gray-50 border-2">
            <h3 className="h3-bold pb-6">Open Hours</h3>
            <Table className=" ">
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">Monday</TableCell>
                  <TableCell className="text-right">{brewery.monday}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Tuesday</TableCell>
                  <TableCell className="text-right">
                    {brewery.tuesday}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Wednesday</TableCell>
                  <TableCell className="text-right">
                    {brewery.wednesday}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Thursday</TableCell>
                  <TableCell className="text-right">
                    {brewery.thursday}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Friday</TableCell>
                  <TableCell className="text-right">{brewery.friday}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Saturday</TableCell>
                  <TableCell className="text-right">
                    {brewery.saturday}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Sunday</TableCell>
                  <TableCell className="text-right">{brewery.sunday}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
          <div className="md:w-[50%] p-8 rounded-xl border-gray-50 border-2">
            <h3 className="h3-bold pb-6 ">Happy Hours</h3>
            <Table className=" ">
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">Monday</TableCell>
                  <TableCell className="text-right">
                    {brewery.hhMonday}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Tuesday</TableCell>
                  <TableCell className="text-right">
                    {brewery.hhTuesday}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Wednesday</TableCell>
                  <TableCell className="text-right">
                    {brewery.hhWednesday}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Thursday</TableCell>
                  <TableCell className="text-right">
                    {brewery.hhThursday}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Friday</TableCell>
                  <TableCell className="text-right">
                    {brewery.hhFriday}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Saturday</TableCell>
                  <TableCell className="text-right">
                    {brewery.hhSaturday}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Sunday</TableCell>
                  <TableCell className="text-right">
                    {brewery.hhSunday}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </div>
      </section>
      <section className="container pb-16">
        <h3 className="h3-bold pb-6">Brewery Specials</h3>
        <p className="p-medium-16 lg:p-regular-18">{brewery.happyHour}</p>
      </section>
    </>
  );
};

export default BreweryDetails;
