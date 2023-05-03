import { Avatar, Box, Text } from '@mantine/core';
import { formatPrice } from '../../../utils/formatPrice';

export const colProvidersByProduct = [
  {
    accessor: 'barcode',
    title: 'Código',
    textAlignment: 'center',
    width: 80,
    visibleMediaQuery: (theme) => `(min-width: ${theme.breakpoints.lg}px)`,
  },
  {
    accessor: 'photoURL',
    title: '',
    textAlignment: 'center',
    width: 40,
    visibleMediaQuery: () => `(min-width: 450px)`,
    render: ({ photoURL }) => (
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Avatar src={photoURL} />,
      </Box>
    ),
  },

  {
    accessor: 'description',
    title: 'Descripción',
    ellipsis: true,
    width: 180,
    titleStyle: { textAlign: 'center' },
  },
  {
    accessor: 'cost',
    title: 'P. de costo',
    textAlignment: 'right',
    titleStyle: { textAlign: 'center' },
    width: 80,
    visibleMediaQuery: (theme) => `(min-width: ${theme.breakpoints.md}px)`,
    render: ({ cost }) => <Text>{formatPrice(cost)}</Text>,
  },
  {
    accessor: 'stock',
    title: 'Stock',
    textAlignment: 'center',
    width: 50,
    visibleMediaQuery: (theme) => `(min-width: ${theme.breakpoints.md}px)`,
    render: ({ stock }) => <Text color={stock > 0 ? 'black' : 'red'}>{stock}</Text>,
  },
  {
    accessor: 'price',
    title: 'Precio',
    textAlignment: 'right',
    titleStyle: { textAlign: 'center' },
    width: 80,
    visibleMediaQuery: (theme) => `(min-width: ${theme.breakpoints.sm}px)`,
    render: ({ price }) => <Text>{formatPrice(price)}</Text>,
  },
];
