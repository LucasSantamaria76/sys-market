import { useEffect, useState, lazy, Suspense } from 'react';
import { Container, TextInput, Box, Grid, Button, Loader, Center, MediaQuery } from '@mantine/core';
import { BsSearch } from 'react-icons/bs';
import { useDebouncedValue } from '@mantine/hooks';
import { useGetProductsQuery } from '../../redux/apis/productsApi';
import { useDeleteProductMutation } from '../../redux/apis/productsApi.js';
import { showNotification } from '@mantine/notifications';
import { openConfirmModal } from '@mantine/modals';
import { useGetProvidersQuery } from '../../redux/apis/providers';
import { DataTableProducts } from '../../components';
import { showError, showSuccess } from './../../utils/notifications';
import { confirmModal } from '../../utils/confirmModal';

const ModalNewProduct = lazy(() => import('../../Modals/ModalNewProduct.jsx'));

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
    openConfirmModal(
      confirmModal('Borrar el siguiente producto:', description, async () => {
        await delProducts(barcode).unwrap();
        !errorDelete
          ? showNotification(showSuccess('Producto elimidado'))
          : showNotification(showError('No se pudo eliminar el producto'));
      })
    );
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
        <MediaQuery query='(max-width: 768px)' styles={{ height: '65vh' }}>
          <Box sx={{ height: '80vh' }}>
            <DataTableProducts records={records} deleteReg={deleteProduct} />
          </Box>
        </MediaQuery>
      )}
      <Suspense fallback={<Loader variant='bars' />}>
        {openModalNewProduct && (
          <ModalNewProduct opened={openModalNewProduct} setOpened={setOpenModalNewProduct} providers={providers} />
        )}
      </Suspense>
    </Container>
  );
};
