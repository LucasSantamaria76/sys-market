import { Box, Button, Container, Grid, Loader, MediaQuery, TextInput } from '@mantine/core';
import { BsSearch } from 'react-icons/bs';
import { useDeleteProviderMutation, useGetProviderByIdQuery, useGetProvidersQuery } from '../../redux/apis/providers';
import { DataTableProviderProducts } from '../../components/DataTable/DataTableProviderProducts/DataTableProviderProducts';
import { lazy, useEffect, useState, Suspense } from 'react';
import { useDebouncedValue } from '@mantine/hooks';
import { openConfirmModal } from '@mantine/modals';
import { showNotification } from '@mantine/notifications';
import { DetailsProvider } from './components/DetailsProvider';
import { DataTableProviders } from '../../components';
import { showError, showSuccess } from './../../utils/notifications';
import { confirmModal } from '../../utils/confirmModal';
import { useGetProductsOfProviderQuery } from '../../redux/apis/productsApi';

const ModalNewOrEditProvider = lazy(() => import('../../Modals/ModalNewOrEditProvider'));

export const Providers = () => {
  const { data: providers, isLoading } = useGetProvidersQuery();
  const [delProvider, { error: errorDelete }] = useDeleteProviderMutation();
  const [providerId, setProviderId] = useState(1);
  const [openModalNewOrEditProvider, setOpenModalNewOrEditProvider] = useState(false);
  const { data: detailProvider } = useGetProviderByIdQuery(providerId);
  const { data, isLoading: loadingProdProv, refetch } = useGetProductsOfProviderQuery(providerId);

  const [query, setQuery] = useState('');
  const [records, setRecords] = useState(providers);
  const [debouncedQuery] = useDebouncedValue(query, 200);

  useEffect(() => {
    setRecords(
      providers?.filter(({ nameProvider }) => {
        if (debouncedQuery !== '' && !`${nameProvider}`.toLowerCase().includes(debouncedQuery.trim().toLowerCase())) {
          return false;
        }
        return true;
      })
    );
  }, [debouncedQuery, providers]);

  const deleteProvider = ({ id, nameProvider }) => {
    openConfirmModal(
      confirmModal('Borrar el siguiente proveedor:', nameProvider, async () => {
        await delProvider(id).unwrap();
        !errorDelete
          ? showNotification(showSuccess('Proveedor elimidado con éxito'))
          : showNotification(showError('No se pudo eliminar el proveedor'));
      })
    );
  };

  return (
    <Container fluid p={20}>
      <DetailsProvider provider={detailProvider} refetch={refetch} />

      <Grid grow>
        <Grid.Col sm={12} md={3}>
          <Button variant='light' size='md' fullWidth my={10} onClick={() => setOpenModalNewOrEditProvider(true)}>
            Nuevo proveedor
          </Button>
          <TextInput
            size='md'
            placeholder='Buscar proveedor...'
            icon={<BsSearch size={16} />}
            mb='xs'
            value={query}
            onChange={(e) => setQuery(e.currentTarget.value)}
          />
          <MediaQuery query='(max-width: 992px)' styles={{ height: '30vh' }}>
            <Box sx={{ height: '75vh' }}>
              <DataTableProviders
                providers={records}
                setProviderId={setProviderId}
                fetching={isLoading}
                deleteProvider={deleteProvider}
              />
            </Box>
          </MediaQuery>
        </Grid.Col>
        <Grid.Col sm={12} md={9}>
          <MediaQuery query='(max-width: 992px)' styles={{ height: '35vh' }}>
            <Box sx={{ height: '72vh' }}>
              <DataTableProviderProducts listProducts={data?.listProducts} isloading={loadingProdProv} />
            </Box>
          </MediaQuery>
        </Grid.Col>
      </Grid>
      <Suspense fallback={<Loader variant='bars' />}>
        {openModalNewOrEditProvider && (
          <ModalNewOrEditProvider opened={openModalNewOrEditProvider} setOpened={setOpenModalNewOrEditProvider} />
        )}
      </Suspense>
    </Container>
  );
};
