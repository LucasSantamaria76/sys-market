import { Box, Button, Container, Grid, Text, TextInput } from '@mantine/core';
import { GrFormClose } from 'react-icons/gr';
import { BsSearch } from 'react-icons/bs';
import { useDeleteProviderMutation, useGetProviderByIdQuery, useGetProvidersQuery } from '../../redux/apis/providers';
import { DataTableProviderProducts } from '../../components/DataTable/DataTableProviderProducts/DataTableProviderProducts';
import { useEffect, useState } from 'react';
import { useDebouncedValue } from '@mantine/hooks';
import { openConfirmModal } from '@mantine/modals';
import { showNotification } from '@mantine/notifications';
import { DetailsProvider } from './components/DetailsProvider';
import { DataTableProviders, NewOrEditProvider } from '../../components';

export const Providers = () => {
  const { data: providers, isLoading } = useGetProvidersQuery();
  const [delProvider, { error: errorDelete }] = useDeleteProviderMutation();
  const [providerId, setProviderId] = useState(1);
  const [openModalNewOrEditProvider, setOpenModalNewOrEditProvider] = useState(false);
  const { data: detailProvider } = useGetProviderByIdQuery(providerId);

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
    openConfirmModal({
      centered: true,
      title: 'Proveedor seleccionado para borrar: ',
      children: <Text size='lg'>{nameProvider}</Text>,
      labels: { confirm: 'Borrar Proveedor', cancel: 'No borrar' },
      confirmProps: { color: 'red' },
      onConfirm: async () => {
        await delProvider(id).unwrap();
        !errorDelete
          ? showNotification({
              title: 'Proveedor elimidado con éxito',
            })
          : showNotification({
              title: 'No se pudo eliminar el proveedor',
              color: 'red',
              icon: <GrFormClose />,
            });
      },
    });
  };

  return (
    <Container fluid p={20}>
      <DetailsProvider provider={detailProvider} />

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
          <Box sx={{ height: '75vh' }}>
            <DataTableProviders
              providers={records}
              setProviderId={setProviderId}
              fetching={isLoading}
              deleteProvider={deleteProvider}
            />
          </Box>
        </Grid.Col>
        <Grid.Col sm={12} md={9}>
          <Box sx={{ height: '72vh' }}>
            <DataTableProviderProducts providerId={providerId} />
          </Box>
        </Grid.Col>
      </Grid>
      {openModalNewOrEditProvider && (
        <NewOrEditProvider opened={openModalNewOrEditProvider} setOpened={setOpenModalNewOrEditProvider} />
      )}
    </Container>
  );
};
