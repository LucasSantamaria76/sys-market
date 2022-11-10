import { Box, Button, Group, Text } from '@mantine/core';
import { useState } from 'react';
import { AddProductToProvider } from './AddProductToProvider';
import { LoadOrder } from './LoadOrder';

const styles = (theme) => ({
  backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
  width: '100%',
  display: 'flex',
  justifyContent: 'space-between',
  gap: '10px',
  padding: theme.spacing.xs,
  borderRadius: theme.radius.md,
  boxShadow: '1px 1px 2px rgba(0,0,0,0.75);',
  border: '1px solid #ccc',
});

export const DetailsProvider = ({ provider, refetch }) => {
  const [openModalAddProduct, setOpenModalAddProduct] = useState(false);
  const [openModalLoadOrder, setOpenModalLoadOrder] = useState(false);

  return (
    <>
      <Box sx={styles}>
        <Group>
          <Text color='teal'>Dirección: </Text>
          <Text italic mr={15}>
            {provider?.address}
          </Text>
          <Text color='teal'>Teléfono: </Text>
          <Text italic>{provider?.phone}</Text>
        </Group>
        <Group>
          <Button color='brand' variant='light' onClick={() => setOpenModalLoadOrder(true)}>
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
      {openModalLoadOrder && (
        <LoadOrder
          opened={openModalLoadOrder}
          setOpened={setOpenModalLoadOrder}
          providerID={provider?.id}
          refetch={refetch}
        />
      )}
    </>
  );
};
