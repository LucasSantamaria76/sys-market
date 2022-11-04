import { Container, Stack } from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { GoCalendar } from 'react-icons/go';
import { useGetSaleOfTheDayQuery } from '../../redux/apis/salesApi';
import { DataTableByDate } from '../../components';

export const SalesListByDate = () => {
  const [valueDate, setValueDate] = useState(dayjs(new Date()).format('YYYY-MM-DD'));
  const { data, isLoading, refetch } = useGetSaleOfTheDayQuery(valueDate);

  useEffect(() => {
    setValueDate(dayjs(new Date()).format('YYYY-MM-DD'));
    refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (day) => setValueDate(dayjs(day).format('YYYY-MM-DD'));

  return (
    <Container size='xl' pt={20} sx={{ display: 'flex', justifyContent: 'center' }}>
      <Stack>
        <DatePicker
          value={valueDate}
          onChange={handleChange}
          label='Seleccionar fecha'
          locale='es'
          width={300}
          renderDay
          clearable={false}
          size='md'
          icon={<GoCalendar size={30} />}
          sx={{ width: '300px' }}
        />
        <DataTableByDate records={data?.sales || []} isLoading={isLoading} />
      </Stack>
    </Container>
  );
};
