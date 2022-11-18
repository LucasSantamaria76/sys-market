import { Box, Button, Group, Loader } from '@mantine/core';
import { lazy, Suspense, useState } from 'react';
import { styles } from '../../../styles/styles';
import { DataProvider } from './DataProvider';

const ModalAddProductToProvider = lazy(() => import('../../../Modals/ModalAddProductToProvider'));
const ModalLoadOfPurchases = lazy(() => import('../../../Modals/ModalLoadOfPurchases'));

const stylesBox = (theme) => ({
  ...styles,
  display: 'flex',
  justifyContent: 'space-between',
  gap: '10px',
  padding: theme.spacing.xs,
});

export const DetailsProvider = ({ provider, refetch }) => {
  const [openModalAddProduct, setOpenModalAddProduct] = useState(false);
  const [openModalLoadOfPurchases, setOpenModalLoadOfPurchases] = useState(false);

  return (
    <>
      <Box sx={stylesBox}>
        <Group>
          <DataProvider provider={provider} />
        </Group>
        <Group>
          <Button color='brand' variant='light' onClick={() => setOpenModalLoadOfPurchases(true)}>
            cargar pedido
          </Button>
          <Button color='brand' onClick={() => setOpenModalAddProduct(true)}>
            Asociar producto
          </Button>
        </Group>
      </Box>
      <Suspense fallback={<Loader variant='bars' />}>
        {openModalAddProduct && (
          <ModalAddProductToProvider
            opened={openModalAddProduct}
            setOpened={setOpenModalAddProduct}
            providerID={provider?.id}
            refetch={refetch}
          />
        )}
      </Suspense>
      <Suspense fallback={<Loader variant='bars' />}>
        {openModalLoadOfPurchases && (
          <ModalLoadOfPurchases
            opened={openModalLoadOfPurchases}
            setOpened={setOpenModalLoadOfPurchases}
            providerID={provider?.id}
          />
        )}
      </Suspense>
    </>
  );
};
