import { Avatar, Text, Tooltip, ActionIcon, useMantineTheme, Group } from '@mantine/core';
import { DataTable } from 'mantine-datatable';
import { useEffect, useState } from 'react';
import { formatPrice } from '../../../utils/formatPrice';
import { useDispatch } from 'react-redux';
import { deleteItem, ModifyQuantity } from '../../../redux/slices/saleSlice';
import { IoTrashOutline } from 'react-icons/io5';

const btn = {
  fontSize: '1rem ',
  border: '1px solid',
  borderRadius: '50%',
  width: '20px',
  height: '20px',
  textAlign: 'center',
  lineHeight: '15px',
};

export const DataTableSale = ({ records, onClick }) => {
  const [data, setData] = useState();
  const dispatch = useDispatch();
  const theme = useMantineTheme();

  useEffect(() => {
    setData(records);
  }, [records]);
  return (
    <>
      <DataTable
        withColumnBorders
        highlightOnHover
        noRecordsIcon=' '
        noRecordsText=''
        records={data}
        onRowClick={onClick}
        idAccessor='barcode'
        columns={[
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
            accessor: 'price',
            title: 'Precio',
            textAlignment: 'right',
            titleStyle: { textAlign: 'center' },
            width: 120,
            visibleMediaQuery: (theme) => `(min-width: ${theme.breakpoints.md}px)`,
            render: ({ price }) => <Text>{formatPrice(price)}</Text>,
          },
          {
            accessor: 'quantity',
            title: 'Cantidad',
            textAlignment: 'center',
            width: 160,
            render: ({ barcode, quantity }) => (
              <Group sx={{ justifyContent: 'space-between' }}>
                <ActionIcon
                  color='pink'
                  onClick={async (e) => {
                    quantity > 1 && dispatch(ModifyQuantity({ barcode, quantity: +quantity - 1 }));
                  }}>
                  <Text sx={btn}>-</Text>
                </ActionIcon>
                <Text>{quantity}</Text>
                <ActionIcon
                  color='teal'
                  onClick={async (e) => {
                    dispatch(ModifyQuantity({ barcode, quantity: +quantity + 1 }));
                  }}>
                  <Text sx={btn}>+</Text>
                </ActionIcon>
              </Group>
            ),
          },
          {
            accessor: 'subTotal',
            title: 'subTotal',
            textAlignment: 'right',
            titleStyle: { textAlign: 'center' },
            width: 120,
            render: ({ subTotal }) => <Text>{formatPrice(subTotal)}</Text>,
          },
          {
            accessor: 'actions',
            title: '',
            textAlignment: 'center',
            width: 55,
            render: (product) => (
              <Tooltip label='Eliminar producto' withArrow color={theme.colors.brand[0]}>
                <ActionIcon
                  color='red'
                  onClick={async (e) => {
                    e.stopPropagation();
                    dispatch(deleteItem(product.barcode));
                  }}>
                  <IoTrashOutline size={17} />
                </ActionIcon>
              </Tooltip>
            ),
          },
        ]}
      />
    </>
  );
};
