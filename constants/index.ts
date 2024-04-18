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
};

export const breweryDefaultValues = {
  name: '',
  description: '',
  location: '',
  imageUrl: '',
  url: '',
};
