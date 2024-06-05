import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useEffect, useState } from 'react';
import { getAllBreweries } from '@/lib/actions/brewery.actions';
import { IBrewery } from '@/lib/database/models/brewery.model';

type DropdownProps = {
  value?: string;
  onChangeHandler: () => void;
};

const BreweryDropdown = ({ value, onChangeHandler }: DropdownProps) => {
  const [breweries, setBreweries] = useState<IBrewery[]>([]);

  useEffect(() => {
    const getCategories = async () => {
      const breweryList = await getAllBreweries();

      breweryList && setBreweries(breweryList as IBrewery[]);
    };

    getCategories();
  }, []);

  return (
    <Select onValueChange={onChangeHandler} defaultValue={value}>
      <SelectTrigger className="select-field">
        <SelectValue placeholder="Select Brewery" />
      </SelectTrigger>
      <SelectContent>
        {breweries.length > 0 &&
          breweries.map(brewery => (
            <SelectItem
              key={brewery._id}
              value={brewery._id}
              className="select-item p-regular-14"
            >
              {brewery.name}
            </SelectItem>
          ))}
      </SelectContent>
    </Select>
  );
};

export default BreweryDropdown;
