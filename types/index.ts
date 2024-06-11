// ====== USER PARAMS
export type CreateUserParams = {
  clerkId: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  photo: string;
};

export type UpdateUserParams = {
  firstName: string;
  lastName: string;
  username: string;
  photo: string;
};

// ====== EVENT PARAMS
export type CreateEventParams = {
  userId: string;
  event: {
    title: string;
    description: string;
    location: string;
    imageUrl: string;
    startDateTime: Date;
    endDateTime: Date;
    categoryId: string;
    price: string;
    isFree: boolean;
    url?: string;
    breweryId: string;
  };
  path: string;
};

export type UpdateEventParams = {
  userId: string;
  event: {
    _id: string;
    title: string;
    imageUrl: string;
    description: string;
    location: string;
    startDateTime: Date;
    endDateTime: Date;
    categoryId: string;
    price: string;
    isFree: boolean;
    url?: string;
    breweryId: string;
  };
  path: string;
};

export type DeleteEventParams = {
  eventId: string;
  path: string;
};

export type GetAllEventsParams = {
  query: string;
  category: string;
  limit: number;
  page: number;
};

export type GetHomeEventsParams = {
  category: string;
  limit: number;
  page: number;
};

export type GetEventsByUserParams = {
  userId: string;
  limit?: number;
  page: number;
};

export type GetRelatedEventsByCategoryParams = {
  categoryId: string;
  eventId: string;
  limit?: number;
  page: number | string;
};

export type Event = {
  _id: string;
  title: string;
  description: string;
  price: string;
  isFree: boolean;
  imageUrl: string;
  location: string;
  startDateTime: Date;
  endDateTime: Date;
  url?: string;
  organizer: {
    _id: string;
    firstName: string;
    lastName: string;
  };
  category: {
    _id: string;
    name: string;
  };
  brewery: {
    _id: string;
    name: string;
  };
};

// ====== CATEGORY PARAMS
export type CreateCategoryParams = {
  categoryName: string;
};

// ====== ORDER PARAMS
export type CheckoutOrderParams = {
  eventTitle: string;
  eventId: string;
  price: string;
  isFree: boolean;
  buyerId: string;
};

export type CreateOrderParams = {
  stripeId: string;
  eventId: string;
  buyerId: string;
  totalAmount: string;
  createdAt: Date;
};

export type GetOrdersByEventParams = {
  eventId: string;
  searchString: string;
};

export type GetOrdersByUserParams = {
  userId: string | null;
  limit?: number;
  page: string | number | null;
};

// ====== URL QUERY PARAMS
export type UrlQueryParams = {
  params: string;
  key: string;
  value: string | null;
};

export type RemoveUrlQueryParams = {
  params: string;
  keysToRemove: string[];
};

export type SearchParamProps = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

// ====== BREWERY PARAMS
export type CreateBreweryParams = {
  userId: string;
  brewery: {
    name: string;
    description: string;
    location: string;
    imageUrl: string;
    url: string;
    monday?: string;
    tuesday?: string;
    wednesday?: string;
    thursday?: string;
    friday?: string;
    saturday?: string;
    sunday?: string;
    hhMonday?: string;
    hhTuesday?: string;
    hhWednesday?: string;
    hhThursday?: string;
    hhFriday?: string;
    hhSaturday?: string;
    hhSunday?: string;
    onTapUrl?: string;
    happyHour?: string;
    slug: string;
    facebook: string;
    instagram: string;
    untappd: string;
    city: string;
  };
  path: string;
};

export type UpdateBreweryParams = {
  userId: string;
  brewery: {
    _id: string;
    name: string;
    description: string;
    location: string;
    imageUrl: string;
    url: string;
    monday?: string;
    tuesday?: string;
    wednesday?: string;
    thursday?: string;
    friday?: string;
    saturday?: string;
    sunday?: string;
    hhMonday?: string;
    hhTuesday?: string;
    hhWednesday?: string;
    hhThursday?: string;
    hhFriday?: string;
    hhSaturday?: string;
    hhSunday?: string;
    onTapUrl?: string;
    happyHour?: string;
    slug: string;
    facebook: string;
    instagram: string;
    untappd: string;
    city: string;
  };
  path: string;
};

export type Brewery = {
  _id: string;
  name: string;
  description: string;
  imageUrl: string;
  location: string;
  url: string;
  monday?: string;
  tuesday?: string;
  wednesday?: string;
  thursday?: string;
  friday?: string;
  saturday?: string;
  sunday?: string;
  hhMonday?: string;
  hhTuesday?: string;
  hhWednesday?: string;
  hhThursday?: string;
  hhFriday?: string;
  hhSaturday?: string;
  hhSunday?: string;
  onTapUrl?: string;
  happyHour?: string;
  slug: string;
  facebook: string;
  instagram: string;
  untappd: string;
  city: string;
  organizer: {
    _id: string;
    firstName: string;
    lastName: string;
  };
};

export type SearchBreweryParamProps = {
  params: { id: string };
};

export type GetAllBreweryParams = {
  query: string;
  limit: number;
  page: number;
};
