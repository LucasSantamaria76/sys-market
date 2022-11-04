import { useEffect, useState } from 'react';
import { Container, TextInput, Box, Text, Grid, Button } from '@mantine/core';
import { BsSearch } from 'react-icons/bs';
import { useDebouncedValue } from '@mantine/hooks';
import { Center, Loader } from '@mantine/core';
import { useGetProductsQuery } from '../../redux/apis/productsApi';
import { DataTableProducts } from './components/DataTableProducts.jsx';
import { useDeleteProductMutation } from '../../redux/apis/productsApi.js';
import { showNotification } from '@mantine/notifications';
import { openConfirmModal } from '@mantine/modals';
import { NewProduct } from './components/NewProduct';
import { useGetProvidersQuery } from '../../redux/apis/providers';

export const Products = () => {
  const { data, isLoading } = useGetProductsQuery();
  const { data: dataProviders } = useGetProvidersQuery();
  const [delProducts, { error: errorDelete }] = useDeleteProductMutation();
  const [openModalNewProduct, setOpenModalNewProduct] = useState(false);
  const [providers, setProviders] = useState([]);
  const [query, setQuery] = useState('');
  const [debouncedQuery] = useDebouncedValue(query, 200);
  const [records, setRecords] = useState(data?.products);

  useEffect(() => {
    const orderNadSaveProducts = async () => {
      const orderedProducts = await data?.products
        .map((item) => item)
        .sort((a, b) => a['description'].toLowerCase().localeCompare(b['description'].toLowerCase()));

      setRecords((prev) => (prev = orderedProducts));
    };
    orderNadSaveProducts();
  }, [data?.products]);

  useEffect(() => {
    setProviders(
      dataProviders?.reduce((acc, item) => {
        return (acc = [...acc, { value: item.id, label: item.nameProvider }]);
      }, [])
    );
  }, [dataProviders]);

  useEffect(() => {
    setRecords(
      data?.products?.filter(({ description }) => {
        if (debouncedQuery !== '' && !`${description}`.toLowerCase().includes(debouncedQuery.trim().toLowerCase())) {
          return false;
        }
        return true;
      })
    );
  }, [debouncedQuery, data?.products]);

  const deleteProduct = ({ barcode, description }) => {
    openConfirmModal({
      centered: true,
      title: 'Producto seleccionado para borrar: ',
      children: <Text size='lg'>{description}</Text>,
      labels: { confirm: 'Borrar Producto', cancel: 'No borrar' },
      confirmProps: { color: 'red' },
      onConfirm: async () => {
        await delProducts(barcode).unwrap();
        !errorDelete
          ? showNotification({
              title: 'Producto elimidado',
              color: 'teal',
            })
          : showNotification({
              title: 'No se pudo eliminar el producto',
              color: 'red',
            });
      },
    });
  };

  const handleClick = () => {
    setOpenModalNewProduct(true);
  };

  return (
    <Container size='xl' pt={20}>
      <Grid justify='space-between' mb={10}>
        <Grid.Col xs={12} sm={9}>
          <TextInput
            size='md'
            placeholder='Buscar productos...'
            icon={<BsSearch size={16} />}
            value={query}
            onChange={(e) => setQuery(e.currentTarget.value)}
          />
        </Grid.Col>
        <Grid.Col xs={12} sm={3}>
          <Button variant='light' size='md' onClick={handleClick} fullWidth>
            Nuevo producto
          </Button>
        </Grid.Col>
      </Grid>
      {isLoading ? (
        <Center>
          <Loader variant='bars' />
        </Center>
      ) : (
        <Box sx={{ height: '80vh' }}>
          <DataTableProducts records={records} deleteReg={deleteProduct} />
        </Box>
      )}
      {openModalNewProduct && (
        <NewProduct opened={openModalNewProduct} setOpened={setOpenModalNewProduct} providers={providers} />
      )}
    </Container>
  );
};
