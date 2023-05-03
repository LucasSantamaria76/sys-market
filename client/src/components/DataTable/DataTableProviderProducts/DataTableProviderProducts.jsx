import { DataTable } from 'mantine-datatable';
import { Text } from '@mantine/core';
import dayjs from 'dayjs';
import { formatPrice } from '../../../utils/formatPrice';

export const DataTableProviderProducts = ({ listProducts, isLoading }) => {
  return (
    <DataTable
      mt={10}
      withColumnBorders
      minHeight={200}
      rowBorderColor='#d4d4d4'
      highlightOnHover
      noRecordsText='No se encontraron productos'
      records={listProducts}
      idAccessor='barcode'
      columns={[
        { accessor: 'barcode', hidden: true },
        {
          accessor: 'description',
          title: 'Descripción del producto',
          titleStyle: { textAlign: 'center' },
        },
        {
          accessor: 'price_cost',
          title: 'Precio de costo',
          textAlignment: 'right',
          titleStyle: { textAlign: 'center' },
          render: ({ price_cost }) => <Text>{formatPrice(price_cost)}</Text>,
        },
        {
          accessor: 'last_purchase',
          title: 'Ultima compra',
          textAlignment: 'center',
          render: ({ last_purchase }) => <Text>{dayjs(last_purchase).format('DD-MM-YYYY')}</Text>,
        },
      ]}
      fetching={isLoading}
    />
  );
};
