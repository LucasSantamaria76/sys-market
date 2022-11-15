import { createStyles, UnstyledButton, Container, Stack, ScrollArea, Grid } from '@mantine/core';
import dayjs from 'dayjs';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BoxList, DataTableCashOuts, FooterSummaryCashOuts } from '../../components';
import { fetchGet } from '../../functions/functionAPI';
import { setListCashOuts } from '../../redux/slices/cashOutsSlice';

const useStyles = createStyles((theme) => {
  return {
    link: {
      ...theme.fn.focusStyles(),
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      textDecoration: 'none',
      fontSize: theme.fontSizes.xl,
      color: theme.colorScheme === 'dark' ? theme.colors.dark[1] : theme.colors.gray[7],
      padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
      borderRadius: theme.radius.sm,
      fontWeight: 500,

      '&:hover': {
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
        color: theme.colorScheme === 'dark' ? theme.white : theme.black,
      },
    },

    linkActive: {
      '&, &:hover': {
        backgroundColor: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).background,
        color: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).color,
      },
    },
  };
});

export const CashOuts = () => {
  const { classes, cx } = useStyles();
  const [data, setData] = useState();
  const [active, setActive] = useState('');
  const dispatch = useDispatch();
  const {
    user: { token },
  } = useSelector((state) => state.auth);

  useEffect(() => {
    fetchGet('/cashOuts/totalPerDay', token).then((res) =>
      setData((prev) => (prev = res?.sort((a, b) => b.date.localeCompare(a.date))))
    );
    fetchGet('/cashOuts', token).then((res) => dispatch(setListCashOuts(res)));
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

  return (
    <ScrollArea style={{ height: '93vh' }}>
      <Container size='lg'>
        <Grid mt={20}>
          <Grid.Col span={12} sm={3}>
            <BoxList mh='400px'>{links}</BoxList>
          </Grid.Col>
          <Grid.Col span={12} sm={9}>
            <Stack sx={{ maxHeight: 550, width: '100%' }} justify='flex-start' spacing={2}>
              {active.length && (
                <>
                  <DataTableCashOuts date={active} />
                  <FooterSummaryCashOuts total={data?.find((item) => item.date === active)._sum} />
                </>
              )}
            </Stack>
          </Grid.Col>
        </Grid>
      </Container>
    </ScrollArea>
  );
};
