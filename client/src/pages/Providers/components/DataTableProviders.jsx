import { ActionIcon, Group, Tooltip, useMantineTheme } from '@mantine/core';
import { DataTable } from 'mantine-datatable';
import { useEffect, useState } from 'react';
import { NewOrEditProvider } from './NewOrEditProvider';
import { IoTrashOutline } from 'react-icons/io5';
import { TbEdit } from 'react-icons/tb';

export const DataTableProviders = ({ providers, setProviderId, fetching, deleteProvider }) => {
  const [records, setRecords] = useState([]);
  const [providerToEdit, setProviderToEdit] = useState(null);
  const [openModalNewOrEditProvider, setOpenModalNewOrEditProvider] = useState(false);
  const theme = useMantineTheme();

  useEffect(() => {
    setRecords(providers);
  }, [providers]);

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
                <Tooltip label='Eliminar proveedor' withArrow color={theme.colors.brand[0]}>
                  <ActionIcon
                    color='red'
                    onClick={async (e) => {
                      e.stopPropagation();
                      deleteProvider(record);
                    }}>
                    <IoTrashOutline size={17} />
                  </ActionIcon>
                </Tooltip>
                <Tooltip label='Editar proveedor' withArrow color={theme.colors.brand[0]}>
                  <ActionIcon
                    color='teal'
                    onClick={async (e) => {
                      e.stopPropagation();
                      setProviderToEdit(record);
                      setOpenModalNewOrEditProvider(true);
                    }}>
                    <TbEdit size={17} />
                  </ActionIcon>
                </Tooltip>
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
          columnIndex === 2 && setProviderId(id);
        }}
        fetching={fetching}
        sx={{ zIndex: 0 }}
      />
      {openModalNewOrEditProvider && (
        <NewOrEditProvider
          opened={openModalNewOrEditProvider}
          setOpened={setOpenModalNewOrEditProvider}
          providerToEdit={providerToEdit}
        />
      )}
    </>
  );
};
