import { Box, Group } from '@mantine/core';
import { DataTable } from 'mantine-datatable';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useStylesDataTable } from '../../../styles/styles';
import { formatPrice } from '../../../utils/formatPrice';
import { ButtonActions } from '../..';

export const DataTableCashOuts = ({ date = '', HandleToEdit, handleDelete }) => {
  const { classes } = useStylesDataTable();
  const { listCashOuts } = useSelector((state) => state.cashOuts);
  const [records, setRecords] = useState([]);

  useEffect(
    () => setRecords((prev) => (prev = listCashOuts?.filter((item) => item.date === date))),
    [date, listCashOuts]
  );

  return (
    <Box sx={{ height: '90vh' }}>
      <DataTable
        withBorder
        withColumnBorders
        classNames={classes}
        highlightOnHover
        noRecordsIcon=' '
        noRecordsText='No hay salidas'
        records={records}
        idAccessor='id'
        sx={{ fontSize: '1.5rem' }}
        columns={[
          {
            accessor: 'description',
            title: 'Descripción',
            textAlignment: 'left',
            titleStyle: { textAlign: 'center' },
            width: '70%',
            cellsStyle: { fontSize: '1.2rem' },
          },
          {
            accessor: 'amount',
            title: 'Importe',
            textAlignment: 'right',
            titleStyle: { textAlign: 'center' },
            cellsStyle: { fontSize: '1.2rem' },
            width: '20%',
            render: ({ amount }) => formatPrice(amount),
          },
          {
            accessor: 'actions',
            title: '',
            width: '10%',
            render: (out) => (
              <Group spacing={4} position='right' noWrap sx={{ display: 'flex', justifyContent: 'center' }}>
                <ButtonActions label='Editar salida' isEdit={true} action={() => HandleToEdit(out)} />
                <ButtonActions label='Eliminar salida' isEdit={false} action={() => handleDelete(out)} />
              </Group>
            ),
          },
        ]}
      />
    </Box>
  );
};
