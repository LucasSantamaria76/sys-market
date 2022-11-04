import { Avatar, Text } from '@mantine/core';
import { formatPrice } from '../../../utils/formatPrice';

export const colProvidersByProduct = [
  {
    accessor: 'barcode',
    title: 'Código',
    textAlignment: 'center',
    width: 120,
    visibleMediaQuery: (theme) => `(min-width: ${theme.breakpoints.lg}px)`,
  },
  {
    accessor: 'photoURL',
    title: '',
    textAlignment: 'center',
    width: 50,
    render: ({ photoURL }) => <Avatar src={photoURL} />,
  },

  {
    accessor: 'description',
    title: 'Descripción',
    ellipsis: true,
    titleStyle: { textAlign: 'center' },
    visibleMediaQuery: (theme) => `(min-width: ${theme.breakpoints.sm}px)`,
  },
  {
    accessor: 'cost',
    title: 'P. de costo',
    textAlignment: 'right',
    titleStyle: { textAlign: 'center' },
    width: 110,
    visibleMediaQuery: (theme) => `(min-width: ${theme.breakpoints.md}px)`,
    render: ({ cost }) => <Text>{formatPrice(cost)}</Text>,
  },
  {
    accessor: 'stock',
    title: 'Stock',
    textAlignment: 'center',
    width: 80,
    visibleMediaQuery: (theme) => `(min-width: ${theme.breakpoints.md}px)`,
    render: ({ stock }) => <Text color={stock > 0 ? 'black' : 'red'}>{stock}</Text>,
  },
  {
    accessor: 'price',
    title: 'Precio',
    textAlignment: 'right',
    titleStyle: { textAlign: 'center' },
    width: 120,
    visibleMediaQuery: (theme) => `(min-width: ${theme.breakpoints.sm}px)`,
    render: ({ price }) => <Text>{formatPrice(price)}</Text>,
  },
];
