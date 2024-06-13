import { IEvent } from '@/lib/database/models/event.model';
import Pagination from './Pagination';
import OtherEvents from './OtherEvents';

type CollectionProps = {
  data: IEvent[];
  emptyTitle: string;
  emptyStateSubtext: string;
  limit: number;
  page: number | string;
  totalPages?: number;
  urlParamName?: any;
};

const HomeCollection = ({
  data,
  emptyTitle,
  emptyStateSubtext,
  page,
  totalPages = 0,
  urlParamName,
}: CollectionProps) => {
  const otherEvents = data.filter(other => other.category.name === 'Other');

  return (
    <>
      {data.length > 0 ? (
        <div className="flex items-center gap-10">
          <ul className="flex flex-col w-full">
            {otherEvents.map(event => {
              return (
                <li key={event._id} className="flex justify-center">
                  <OtherEvents event={event} />
                </li>
              );
            })}
          </ul>

          {totalPages > 1 && (
            <Pagination
              urlParamName={urlParamName}
              page={page}
              totalPages={totalPages}
            />
          )}
        </div>
      ) : (
        <div className="flex-center wrapper min-h-[200px] w-full flex-col gap-3 rounded-[14px] bg-grey-50 py-28 text-center">
          <h3 className="p-bold-20 md:h5-bold">{emptyTitle}</h3>
          <p className="p-regular-14">{emptyStateSubtext}</p>
        </div>
      )}
    </>
  );
};

export default HomeCollection;
