import { Text, useMantineTheme } from '@mantine/core';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { DataTableByDate } from '../../../components';
import { useGetSaleOfTheDayQuery } from '../../../redux/apis/salesApi';

export const SalesOfTheDay = () => {
  const [today, setToday] = useState(dayjs(new Date()).format('YYYY-MM-DD'));
  const { data, isLoading, refetch } = useGetSaleOfTheDayQuery(today);
  const theme = useMantineTheme();

  useEffect(() => {
    setToday(dayjs(new Date()).format('YYYY-MM-DD'));
    refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Text size='xl' style={{ marginBottom: 10, textAlign: 'center' }} weight={700} color={theme.colors.brand[4]}>
        Ventas del día
      </Text>
      <DataTableByDate records={data?.sales} isLoading={isLoading} />
    </>
  );
};
