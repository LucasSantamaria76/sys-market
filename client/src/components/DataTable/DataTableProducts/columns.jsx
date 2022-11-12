import { Text } from '@mantine/core';

import dayjs from 'dayjs';
import { formatPrice } from '../../../utils/formatPrice';

export const columns = [
  {
    accessor: 'provider.nameProvider',
    title: 'Proveedor',
    titleStyle: { textAlign: 'center' },
    width: 200,
  },
  {
    accessor: 'price_cost',
    title: 'Precio de costo',
    textAlignment: 'right',
    titleStyle: { textAlign: 'center' },
    width: 100,
    render: ({ price_cost }) => <Text>{formatPrice(price_cost)}</Text>,
  },
  {
    accessor: 'last_purchase',
    title: 'Ultima compra',
    textAlignment: 'center',
    titleStyle: { textAlign: 'center' },
    width: 100,
    render: ({ last_purchase }) => <Text>{dayjs(last_purchase).format('DD-MM-YYYY')}</Text>,
  },
  {
    accessor: 'provider.phone',
    title: 'Teléfono',
    textAlignment: 'center',
    titleStyle: { textAlign: 'center' },
    width: 100,
  },
];
