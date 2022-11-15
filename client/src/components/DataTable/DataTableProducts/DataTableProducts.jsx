import { ActionIcon, Group, Stack, Tooltip, useMantineTheme } from '@mantine/core';
import { DataTable } from 'mantine-datatable';
import { useEffect, useState } from 'react';
import { colProvidersByProduct } from './colProvidersByProduct';
import { useStylesDataTable } from '../../../styles/styles';
import { IoTrashOutline } from 'react-icons/io5';
import { TbEdit } from 'react-icons/tb';
import { columns } from './columns';
import { EditProduct } from '../../index';

export const DataTableProducts = ({ deleteReg, records }) => {
  const { classes } = useStylesDataTable();
  const [data, setData] = useState();
  const [product, setProduct] = useState();
  const [openModalEditProduct, setOpenModalEditProduct] = useState(false);
  const theme = useMantineTheme();

  useEffect(() => {
    setData(records);
  }, [records]);
  return (
    <>
      <DataTable
        withColumnBorders
        highlightOnHover
        minHeight={180}
        noRecordsText='No se encontraron productos'
        records={data}
        idAccessor='barcode'
        columns={[
          ...colProvidersByProduct,
          {
            accessor: 'actions',
            title: '',
            width: 60,
            render: (product) => (
              <Group spacing={4} position='right' noWrap sx={{ display: 'flex', justifyContent: 'center' }}>
                <Tooltip label='Editar producto' withArrow color={theme.colors.brand[0]}>
                  <ActionIcon
                    color='teal'
                    onClick={async (e) => {
                      e.stopPropagation();
                      setOpenModalEditProduct(true);
                      setProduct(product);
                    }}>
                    <TbEdit size={17} />
                  </ActionIcon>
                </Tooltip>
                <Tooltip label='Eliminar producto' withArrow color={theme.colors.brand[0]}>
                  <ActionIcon
                    color='red'
                    onClick={async (e) => {
                      e.stopPropagation();
                      deleteReg(product);
                    }}>
                    <IoTrashOutline size={17} />
                  </ActionIcon>
                </Tooltip>
              </Group>
            ),
          },
        ]}
        classNames={classes}
        rowExpansion={{
          content: ({ record }) => (
            <Stack className={classes.details} p='xs' spacing={12}>
              <DataTable
                withColumnBorders
                highlightOnHover
                idAccessor='providerID'
                noRecordsText='No se encontraron proveedores'
                records={record.providers}
                columns={[...columns]}
                classNames={classes}
              />
            </Stack>
          ),
        }}
      />
      {openModalEditProduct && (
        <EditProduct opened={openModalEditProduct} setOpened={setOpenModalEditProduct} product={product} />
      )}
    </>
  );
};
