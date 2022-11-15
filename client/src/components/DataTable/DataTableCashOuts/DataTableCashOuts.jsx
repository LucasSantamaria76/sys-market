import { Box } from '@mantine/core';
import { DataTable } from 'mantine-datatable';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useStylesDataTable } from '../../../styles/styles';
import { formatPrice } from '../../../utils/formatPrice';

export const DataTableCashOuts = ({ date = '' }) => {
  const { classes } = useStylesDataTable();
  const { listCashOuts } = useSelector((state) => state.cashOuts);
  const [records, setRecords] = useState([]);

  useEffect(
    () => setRecords((prev) => (prev = listCashOuts?.filter((item) => item.date === date))),
    [date, listCashOuts]
  );

  return (
    <>
      {!!records.length && (
        <Box sx={{ height: '90vh' }}>
          <DataTable
            withBorder
            withColumnBorders
            classNames={classes}
            highlightOnHover
            noRecordsIcon=' '
            noRecordsText='No hay ventas'
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
                width: '30%',
                render: ({ amount }) => formatPrice(amount),
              },
            ]}
          />
        </Box>
      )}
    </>
  );
};
