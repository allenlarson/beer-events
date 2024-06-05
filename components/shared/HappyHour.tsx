import { IBrewery } from '@/lib/database/models/brewery.model';
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

type HappyHourProps = {
  data: IBrewery[];
};

const HappyHour = ({ data }: HappyHourProps) => {
  const dayKeyMap: { [key: string]: keyof IBrewery } = {
    Sunday: 'hhSunday',
    Monday: 'hhMonday',
    Tuesday: 'hhTuesday',
    Wednesday: 'hhWednesday',
    Thursday: 'hhThursday',
    Friday: 'hhFriday',
    Saturday: 'hhSaturday',
  };

  // Get the current day as a string
  const today = new Date().toLocaleString('en-US', { weekday: 'long' });

  // Determine the appropriate key for today's happy hour
  const contentKey = dayKeyMap[today];

  const happyHour = data.filter(brewery => brewery[contentKey] !== '');
  return (
    <>
      <Table className="sm:w-[500px]">
        <TableHeader>
          <TableRow>
            <TableHead className="">Brewery</TableHead>
            <TableHead className="text-right">Time</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {happyHour.map(brewery => (
            <TableRow key={brewery.name}>
              <TableCell className="font-medium">{brewery.name}</TableCell>

              <TableCell className="text-right">
                {brewery[contentKey]}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        {/*       <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Total</TableCell>
          <TableCell className="text-right">$2,500.00</TableCell>
        </TableRow>
      </TableFooter> */}
      </Table>
    </>
  );
};

export default HappyHour;
