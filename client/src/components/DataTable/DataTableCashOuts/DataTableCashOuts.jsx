import { ActionIcon, Box, Group, Tooltip, useMantineTheme } from '@mantine/core';
import { DataTable } from 'mantine-datatable';
import { useEffect, useState } from 'react';
import { IoTrashOutline } from 'react-icons/io5';
import { TbEdit } from 'react-icons/tb';
import { useSelector } from 'react-redux';
import { useStylesDataTable } from '../../../styles/styles';
import { formatPrice } from '../../../utils/formatPrice';

export const DataTableCashOuts = ({ date = '', HandleToEdit }) => {
  const { classes } = useStylesDataTable();
  const theme = useMantineTheme();
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
                <Tooltip label='Editar salida' withArrow color={theme.colors.brand[4]}>
                  <ActionIcon
                    color='teal'
                    onClick={async (e) => {
                      e.stopPropagation();
                      HandleToEdit(out);
                    }}>
                    <TbEdit size={17} />
                  </ActionIcon>
                </Tooltip>
                <Tooltip label='Eliminar salida' withArrow color={theme.colors.red[7]}>
                  <ActionIcon
                    color='red'
                    onClick={async (e) => {
                      e.stopPropagation();
                    }}>
                    <IoTrashOutline size={17} />
                  </ActionIcon>
                </Tooltip>
              </Group>
            ),
          },
        ]}
      />
    </Box>
  );
};
