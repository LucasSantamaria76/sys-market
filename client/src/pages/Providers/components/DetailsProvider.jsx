import { Box, Button, Group, Text } from '@mantine/core';
import { useState } from 'react';
import { AddProductToProvider } from './AddProductToProvider';

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
        <Button color='pink' onClick={() => setOpenModalAddProduct(true)}>
          Asociar producto
        </Button>
      </Box>
      {openModalAddProduct && (
        <AddProductToProvider
          opened={openModalAddProduct}
          setOpened={setOpenModalAddProduct}
          providerID={provider?.id}
          refetch={refetch}
        />
      )}
    </>
  );
};
