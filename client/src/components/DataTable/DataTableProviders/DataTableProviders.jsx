import { Group, Loader } from '@mantine/core';
import { DataTable } from 'mantine-datatable';
import { lazy, useEffect, useState, Suspense } from 'react';
import { ButtonActions } from '../..';

const ModalNewOrEditProvider = lazy(() => import('../../../Modals/ModalNewOrEditProvider'));

export const DataTableProviders = ({ providers, setProviderId, fetching, deleteProvider }) => {
  const [records, setRecords] = useState([]);
  const [providerToEdit, setProviderToEdit] = useState(null);
  const [openModalNewOrEditProvider, setOpenModalNewOrEditProvider] = useState(false);

  useEffect(() => {
    setRecords(providers);
  }, [providers]);

  const handleEdit = (record) => {
    setProviderToEdit(record);
    setOpenModalNewOrEditProvider(true);
  };

  return (
    <>
      <DataTable
        withColumnBorders
        rowBorderColor='#d4d4d4'
        highlightOnHover
        noRecordsText='No se encontraron proveedores'
        records={records}
        idAccessor='id'
        columns={[
          { accessor: 'id', hidden: true },
          {
            accessor: 'actions',
            title: '',
            width: 80,
            render: (record) => (
              <Group spacing={4} position='right' noWrap>
                <ButtonActions label='Eliminar proveedor' isEdit={false} action={() => deleteProvider(record)} />
                <ButtonActions label='Editar proveedor' isEdit={true} action={() => handleEdit(record)} />
              </Group>
            ),
          },
          {
            accessor: 'nameProvider',
            title: 'Proveedor',
            titleStyle: { textAlign: 'center' },
          },
        ]}
        onCellClick={({ record: { id }, columnIndex }) => {
          if (columnIndex === 2) {
            setProviderId(id);
          }
        }}
        fetching={fetching}
        sx={{ zIndex: 0 }}
      />
      <Suspense fallback={<Loader variant='bars' />}>
        {openModalNewOrEditProvider && (
          <ModalNewOrEditProvider
            opened={openModalNewOrEditProvider}
            setOpened={setOpenModalNewOrEditProvider}
            providerToEdit={providerToEdit}
          />
        )}
      </Suspense>
    </>
  );
};
