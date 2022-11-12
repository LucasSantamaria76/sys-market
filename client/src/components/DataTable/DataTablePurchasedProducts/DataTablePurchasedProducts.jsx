import { ActionIcon, Avatar, Box, Tooltip } from '@mantine/core';
import { DataTable } from 'mantine-datatable';
import { useEffect, useState } from 'react';
import { IoTrashOutline } from 'react-icons/io5';
import { useDispatch } from 'react-redux';
import { removeProductPurchase } from '../../../redux/slices/purchasesSlice';

export const DataTablePurchasedProducts = ({ records, products }) => {
  const [listProduct, setListProduct] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    !!products &&
      setListProduct(
        records?.map((item) => {
          const prod = products.find((prod) => prod.barcode === item.barcode);
          return {
            barcode: item.barcode,
            description: prod.description,
            photoURL: prod.photoURL,
            quantity: item.quantity,
          };
        })
      );
  }, [products, records]);

  return (
    <DataTable
      withBorder
      withColumnBorders
      highlightOnHover
      records={listProduct}
      noRecordsText='No hay productos'
      noRecordsIcon=' '
      idAccessor='barcode'
      width='100%'
      fontSize='xs'
      columns={[
        {
          accessor: 'photoURL',
          title: '',
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
          titleStyle: { textAlign: 'center' },
          textAlignment: 'left',
          width: 120,
          ellipsis: true,
        },
        {
          accessor: 'quantity',
          title: 'Cantidad',
          textAlignment: 'center',
          width: 30,
        },
        {
          accessor: 'actions',
          title: '',
          width: 30,
          textAlignment: 'center',
          render: (product) => (
            <Tooltip label='Eliminar producto' withArrow color='red'>
              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <ActionIcon
                  color='red'
                  onClick={async (e) => {
                    e.stopPropagation();
                    dispatch(removeProductPurchase(product));
                  }}>
                  <IoTrashOutline size={17} />
                </ActionIcon>
              </Box>
            </Tooltip>
          ),
        },
      ]}
    />
  );
};
