import { ICustomPerk } from '../index';

export const dummyCustomPerks: ICustomPerk[] = [
  {
    id: 1,
    title: 'Merchandise',
    links: [
      {
        id: 1,
        title: 'Apparel',
        url: 'http://shopify.com',
        description: 'Check out my newest drops and exclusive offers',
      },
    ],
  },
  {
    id: 2,
    title: 'Woodworking',
    links: [
      {
        id: 1,
        title: 'Tables',
        url: 'http://example.com',
        description:
          'A woodworking artist with a modern take on traditional furniture pieces who I get a lot of inspiration from',
      },
      {
        id: 2,
        title: 'Plates',
        url: 'http://example.com',
        description: 'Some of the plates that I have on sale',
      },
    ],
  },
];
