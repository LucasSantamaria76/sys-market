import { Avatar } from '@mantine/core';
import { DataTable } from 'mantine-datatable';
import { PAYMENT_METHODS_STRING } from '../../constants/constants';
import { useStylesDataTable } from '../../styles/useStyles';
import { formatPrice } from '../../utils/formatPrice';

export const DataTableByDate = ({ records, isLoading }) => {
  const { classes } = useStylesDataTable();

  return (
    <DataTable
      withBorder
      withColumnBorders
      highlightOnHover
      noRecordsIcon=' '
      noRecordsText='No hay ventas'
      records={records}
      idAccessor='id'
      columns={[
        {
          accessor: 'quantity',
          title: 'Cant. Art.',
          textAlignment: 'center',
          width: 60,
          render: ({ items }) => items?.length,
        },
        {
          accessor: 'paymentMethod',
          title: 'Metodo de pagó',
          textAlignment: 'center',
          width: 100,
          render: ({ paymentMethod }) => PAYMENT_METHODS_STRING[paymentMethod],
        },
        {
          accessor: 'total',
          title: 'Total',
          textAlignment: 'right',
          width: 120,
          render: ({ total }) => formatPrice(total),
        },
      ]}
      rowExpansion={{
        //allowMultiple: true,
        content: ({ record: { items } }) => (
          <DataTable
            withBorder
            withColumnBorders
            highlightOnHover
            idAccessor='productId'
            noRecordsText=''
            classNames={classes}
            sx={{ margin: '10px' }}
            records={items}
            columns={[
              {
                accessor: 'photoURL',
                title: '',
                textAlignment: 'center',
                width: 50,
                render: ({ product }) => <Avatar src={product.photoURL} />,
              },
              {
                accessor: 'description',
                title: 'Descripción',
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
                render: ({ price }) => formatPrice(price),
                visibleMediaQuery: (theme) => `(min-width: ${theme.breakpoints.sm}px)`,
              },
              {
                accessor: 'quantity',
                title: 'Cantidad',
                textAlignment: 'center',
                width: 60,
              },
              {
                accessor: 'subtotal',
                title: 'SubTotal',
                textAlignment: 'right',
                titleStyle: { textAlign: 'center' },
                width: 120,
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
