import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { DataTableByDate } from '../../../components';
import { useGetSaleOfTheDayQuery } from '../../../redux/apis/salesApi';

export const SalesOfTheDay = () => {
  const [today, setToday] = useState(dayjs(new Date()).format('YYYY-MM-DD'));
  const { data, isLoading, refetch } = useGetSaleOfTheDayQuery(today);

  useEffect(() => {
    setToday(dayjs(new Date()).format('YYYY-MM-DD'));
    refetch();
  }, [refetch]);

  return <DataTableByDate records={data?.sales} isLoading={isLoading} />;
};
