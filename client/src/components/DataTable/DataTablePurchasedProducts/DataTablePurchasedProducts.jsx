import { Avatar, Box } from '@mantine/core';
import { DataTable } from 'mantine-datatable';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { removeProductPurchase } from '../../../redux/slices/purchasesSlice';
import { ButtonActions } from '../..';

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
            cost: item.cost,
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
          width: '5%',
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
          width: '80%',
          ellipsis: true,
        },
        {
          accessor: 'quantity',
          title: 'Cantidad',
          textAlignment: 'center',
          width: '10%',
        },
        {
          accessor: 'actions',
          title: '',
          width: '5%',
          textAlignment: 'center',
          render: (product) => (
            <ButtonActions
              label='Eliminar producto'
              isEdit={false}
              action={() => dispatch(removeProductPurchase(product))}
            />
          ),
        },
      ]}
    />
  );
};
