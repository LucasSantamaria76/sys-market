import { Group, Loader, Stack } from '@mantine/core';
import { DataTable } from 'mantine-datatable';
import { lazy, Suspense, useEffect, useState } from 'react';
import { colProvidersByProduct } from './colProvidersByProduct';
import { useStylesDataTable } from '../../../styles/styles';
import { columns } from './columns';
import { ButtonActions } from '../..';

const ModalEditProduct = lazy(() => import('../../../Modals/ModalEditProduct.jsx'));

export const DataTableProducts = ({ deleteReg, records }) => {
  const { classes } = useStylesDataTable();
  const [data, setData] = useState();
  const [product, setProduct] = useState();
  const [openModalEditProduct, setOpenModalEditProduct] = useState(false);

  useEffect(() => {
    setData(records);
  }, [records]);

  const handleEdit = (product) => {
    setOpenModalEditProduct(true);
    setProduct(product);
  };

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
                <ButtonActions label='Editar producto' isEdit={true} action={() => handleEdit(product)} />
                <ButtonActions label='Eliminar producto' isEdit={false} action={() => deleteReg(product)} />
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
      <Suspense fallback={<Loader variant='bars' />}>
        {openModalEditProduct && (
          <ModalEditProduct opened={openModalEditProduct} setOpened={setOpenModalEditProduct} product={product} />
        )}
      </Suspense>
    </>
  );
};
