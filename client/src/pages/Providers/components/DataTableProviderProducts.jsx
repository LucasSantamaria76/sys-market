import { DataTable } from 'mantine-datatable';
import { useEffect, useState } from 'react';
import { useGetProductsOfProviderQuery } from '../../../redux/apis/productsApi';
import { Grid, Text } from '@mantine/core';
import dayjs from 'dayjs';
import { formatPrice } from './../../../utils/formatPrice';
import { DetailsProvider } from './DetailsProvider';
import { useGetProviderByIdQuery } from '../../../redux/apis/providers';

export const DataTableProviderProducts = ({ providerId }) => {
  const [records, setRecords] = useState([]);
  const { data, isLoading, refetch } = useGetProductsOfProviderQuery(providerId);
  const { data: provider } = useGetProviderByIdQuery(providerId);

  useEffect(() => {
    setRecords(data?.listProducts);
  }, [data?.listProducts]);

  return (
    <Grid>
      <Grid.Col span={12}>
        <DetailsProvider provider={provider} refetch={refetch} />
      </Grid.Col>
      <Grid.Col span={12}>
        <DataTable
          withColumnBorders
          minHeight={200}
          rowBorderColor='#d4d4d4'
          highlightOnHover
          noRecordsText='No se encontraron productos'
          records={records}
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
      </Grid.Col>
    </Grid>
  );
};
