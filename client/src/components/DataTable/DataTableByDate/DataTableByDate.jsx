import { Avatar } from '@mantine/core';
import { DataTable } from 'mantine-datatable';
import { PAYMENT_METHODS_STRING } from '../../../constants/constants';
import { useStylesDataTable } from '../../../styles/styles';
import { formatPrice } from '../../../utils/formatPrice';

export const DataTableByDate = ({ records, isLoading }) => {
  const { classes } = useStylesDataTable();

  return (
    <DataTable
      withBorder
      withColumnBorders
      classNames={classes}
      highlightOnHover
      noRecordsIcon=' '
      noRecordsText='No hay ventas'
      records={records}
      idAccessor='id'
      sx={{ width: '95vw' }}
      minHeight={100}
      fetching={isLoading}
      columns={[
        {
          accessor: 'quantity',
          title: 'Cant. Art.',
          textAlignment: 'center',
          width: '10%',
          cellsStyle: { fontSize: '1.2rem' },
          render: ({ items }) => items?.length,
        },
        {
          accessor: 'paymentMethod',
          title: 'Metodo de pagó',
          textAlignment: 'center',
          cellsStyle: { fontSize: '1.2rem' },
          width: '50%',
          render: ({ paymentMethod }) => PAYMENT_METHODS_STRING[paymentMethod],
        },
        {
          accessor: 'total',
          title: 'Total',
          textAlignment: 'right',
          titleStyle: { textAlign: 'center' },
          cellsStyle: { fontSize: '1.2rem' },
          width: '40%',
          render: ({ total }) => formatPrice(total),
        },
      ]}
      rowExpansion={{
        content: ({ record: { items } }) => (
          <DataTable
            withBorder
            withColumnBorders
            highlightOnHover
            idAccessor='productId'
            noRecordsText=''
            classNames={classes}
            sx={{ margin: '10px', width: '98%' }}
            records={items}
            columns={[
              {
                accessor: 'photoURL',
                title: '',
                textAlignment: 'center',
                width: '5%',
                render: ({ product }) => <Avatar src={product.photoURL} />,
              },
              {
                accessor: 'description',
                title: 'Descripción',
                width: '50%',
                ellipsis: true,
                titleStyle: { textAlign: 'center' },
                visibleMediaQuery: (theme) => `(min-width: ${theme.breakpoints.sm}px)`,
                render: ({ product }) => product.description,
              },
              {
                accessor: 'price',
                title: 'Precio',
                textAlignment: 'right',
                titleStyle: { textAlign: 'center' },
                width: '15%',
                render: ({ price }) => formatPrice(price),
                visibleMediaQuery: (theme) => `(min-width: ${theme.breakpoints.sm}px)`,
              },
              {
                accessor: 'quantity',
                title: 'Cant.',
                textAlignment: 'center',
                width: '10%',
              },
              {
                accessor: 'subtotal',
                title: 'SubTotal',
                textAlignment: 'right',
                titleStyle: { textAlign: 'center' },
                width: '20%',
                render: ({ price, quantity }) => formatPrice(price * quantity),
              },
            ]}
            fetching={isLoading}
          />
        ),
      }}
    />
  );
};
