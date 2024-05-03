import BreweryForm from '@/components/shared/BreweryForm';
import { getBreweryById } from '@/lib/actions/brewery.actions';
import { auth } from '@clerk/nextjs';

type UpdateEventProps = {
  params: {
    id: string;
  };
};

const UpdateBrewery = async ({ params: { id } }: UpdateEventProps) => {
  const { sessionClaims } = auth();

  const userId = sessionClaims?.userId as string;
  const brewery = await getBreweryById(id);

  return (
    <>
      <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
        <h3 className="wrapper h3-bold text-center sm:text-left">
          Update Event
        </h3>
      </section>

      <div className="wrapper my-8">
        <BreweryForm
          brewery={brewery}
          breweryId={brewery._id}
          type="Update"
          userId={userId}
        />
      </div>
    </>
  );
};

export default UpdateBrewery;
