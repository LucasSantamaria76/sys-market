import { UnstyledButton, Container, Stack, ScrollArea, Grid, Button } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import dayjs from 'dayjs';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BoxList, DataTableCashOuts, FooterSummaryCashOuts, ModalNewCashOuts } from '../../components';
import { fetchCreate, fetchGet } from '../../functions/functionAPI';
import { addCashOuts, setListCashOuts } from '../../redux/slices/cashOutsSlice';
import { useStylesBtnList } from '../../styles/styles';
import { showError, showSuccess } from '../../utils/notifications';

export const CashOuts = () => {
  const { classes, cx } = useStylesBtnList();
  const [data, setData] = useState();
  const [opened, setOpened] = useState(false);
  const [active, setActive] = useState('');
  const dispatch = useDispatch();
  const {
    user: { token },
  } = useSelector((state) => state.auth);

  useEffect(() => {
    fetchGet('/cashOuts/totalPerDay', token).then(({ totalPerDay }) =>
      setData((prev) => (prev = totalPerDay?.sort((a, b) => b.date.localeCompare(a.date))))
    );
    fetchGet('/cashOuts', token).then(({ data }) => dispatch(setListCashOuts(data)));
    setActive(dayjs().format('DD-MM-YYYY'));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const links = data?.map((item, idx) => (
    <UnstyledButton
      className={cx(classes.link, { [classes.linkActive]: item.date === active })}
      key={idx}
      onClick={(event) => {
        event.preventDefault();
        setActive(item.date);
      }}>
      <span>{item.date}</span>
    </UnstyledButton>
  ));

  const handleSaveOuts = async (values) => {
    try {
      const res = await fetchCreate('/cashOuts', token, values);
      if (res.success) {
        showNotification(showSuccess('Salida creada con éxito'));
        dispatch(addCashOuts(res.data));
      } else showNotification(showError('No se pudo crear la salida'));
    } catch (error) {
      showNotification(showError(error));
    }
  };

  return (
    <ScrollArea style={{ height: '93vh' }}>
      <Container size='lg'>
        <Grid mt={20}>
          <Grid.Col span={12} sm={3}>
            <Button variant='light' mb={10} fullWidth onClick={() => setOpened(true)}>
              Nueva salida
            </Button>
            <BoxList mh='400px'>{links}</BoxList>
          </Grid.Col>
          <Grid.Col span={12} sm={9}>
            <Stack sx={{ maxHeight: 550, width: '100%' }} justify='flex-start' spacing={2}>
              {active.length && (
                <>
                  <DataTableCashOuts date={active} />
                  <FooterSummaryCashOuts total={data?.find((item) => item.date === active)?._sum} />
                </>
              )}
            </Stack>
          </Grid.Col>
        </Grid>
        <ModalNewCashOuts opened={opened} setOpened={setOpened} handleSaveOuts={handleSaveOuts} />
      </Container>
    </ScrollArea>
  );
};
