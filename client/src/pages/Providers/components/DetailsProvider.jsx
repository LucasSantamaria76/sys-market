import { Box, Button, Group } from '@mantine/core';
import { useState } from 'react';
import { AddProductToProvider, LoadOfPurchases } from '../../../components';
import { styles } from '../../../styles/styles';
import { DataProvider } from './DataProvider';

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
      {openModalAddProduct && (
        <AddProductToProvider
          opened={openModalAddProduct}
          setOpened={setOpenModalAddProduct}
          providerID={provider?.id}
          refetch={refetch}
        />
      )}
      {openModalLoadOfPurchases && (
        <LoadOfPurchases
          opened={openModalLoadOfPurchases}
          setOpened={setOpenModalLoadOfPurchases}
          providerID={provider?.id}
        />
      )}
    </>
  );
};
