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

type FoodTruckProps = {
  data: IEvent[];
};

const FoodTrucks = ({ data }: FoodTruckProps) => {
  const today = formatDateTime(new Date()).sameTime;
  const todaysEvents = data.filter(
    event =>
      formatDateTime(event.startDateTime).sameTime === today &&
      event.category.name === 'Music Bingo'
  );

  return (
    <div className="flex-col w-full">
      <h3 className="h3-bold pb-8">Food Trucks</h3>
      <Table className="sm:w-[400px]">
        <TableHeader>
          <TableRow>
            <TableHead className="">Brewery</TableHead>
            <TableHead className="text-right">Food Truck</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {todaysEvents.map(event => (
            <TableRow key={event.brewery.name}>
              <TableCell className="font-medium">
                {event.brewery.name}
              </TableCell>

              <TableCell className="text-right">{event.title}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default FoodTrucks;
