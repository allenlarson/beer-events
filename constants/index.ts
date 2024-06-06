export const headerLinks = [
  {
    label: 'Home',
    route: '/',
  },
  {
    label: 'Breweries',
    route: '/breweries',
  },
  {
    label: 'Create Event',
    route: '/events/create',
  },
  {
    label: 'Create Brewery',
    route: '/brewery/create',
  },
  {
    label: 'My Profile',
    route: '/profile',
  },
];

export const eventDefaultValues = {
  title: '',
  description: '',
  location: '',
  imageUrl: '',
  startDateTime: new Date(),
  endDateTime: new Date(),
  categoryId: '',
  price: '',
  isFree: false,
  url: '',
  breweryId: '',
};

export const breweryDefaultValues = {
  name: '',
  description: '',
  location: '',
  imageUrl: '',
  url: '',
  monday: '',
  tuesday: '',
  wednesday: '',
  thursday: '',
  friday: '',
  saturday: '',
  sunday: '',
  hhMonday: '',
  hhTuesday: '',
  hhWednesday: '',
  hhThursday: '',
  hhFriday: '',
  hhSaturday: '',
  hhSunday: '',
  onTapUrl: '',
  happyHour: '',
  facebook: '',
  instagram: '',
  untappd: '',
  slug: '',
  city: '',
};
