import { UnstyledButton, Container, Stack, ScrollArea, Grid, Button } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import dayjs from 'dayjs';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BoxList, DataTableCashOuts, FooterSummaryCashOuts, ModalNewCashOrEditOuts } from '../../components';
import { fetchCreate, fetchGet, fetchUpdate } from '../../functions/functionAPI';
import { addCashOuts, setListCashOuts, updateCashOuts } from '../../redux/slices/cashOutsSlice';
import { useStylesBtnList } from '../../styles/styles';
import { showError, showSuccess } from '../../utils/notifications';

export const CashOuts = () => {
  const { classes, cx } = useStylesBtnList();
  const [listOfDates, setListOfDates] = useState();
  const [openModalNewOrEditCashOuts, setOpenModalNewOrEditCashOuts] = useState(false);
  const [toEdit, setToEdit] = useState('');
  const [active, setActive] = useState('');
  const dispatch = useDispatch();
  const {
    user: { token },
  } = useSelector((state) => state.auth);

  const getListDatesAndTotalsPerDay = () =>
    fetchGet('/cashOuts/totalPerDay', token).then(({ data }) =>
      setListOfDates(data?.sort((a, b) => b.date.localeCompare(a.date)))
    );

  useEffect(() => {
    getListDatesAndTotalsPerDay();
    fetchGet('/cashOuts', token).then(({ data }) => dispatch(setListCashOuts(data)));
    setActive(dayjs().format('DD-MM-YYYY'));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const links = listOfDates?.map((item, idx) => (
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
      const res = !toEdit //create or update the database
        ? await fetchCreate('/cashOuts', token, values)
        : await fetchUpdate('/cashOuts', token, { ...values, id: toEdit.id });

      if (res.success) {
        showNotification(showSuccess(`Salida ${!toEdit ? 'creada' : 'actualizada'} con éxito`));
        !listOfDates.find((item) => item.date === dayjs().format('DD-MM-YYYY')) && getListDatesAndTotalsPerDay(); //If today's date is not found, I make the call again
        dispatch(!toEdit ? addCashOuts(res.data) : updateCashOuts(res.data)); //I update the store
      } else showNotification(showError(`No se pudo ${!toEdit ? 'crear' : 'actualizar'} la salida`));
    } catch (error) {
      showNotification(showError(error));
    }
  };

  const HandleToEdit = (value) => {
    setToEdit(value);
    setOpenModalNewOrEditCashOuts(true);
  };
  const HandleNewOuts = () => {
    setToEdit('');
    setOpenModalNewOrEditCashOuts(true);
  };

  return (
    <ScrollArea style={{ height: '93vh' }}>
      <Container size='lg'>
        <Grid mt={20}>
          <Grid.Col span={12} sm={3}>
            <Button variant='light' mb={10} fullWidth onClick={HandleNewOuts}>
              Nueva salida
            </Button>
            <BoxList mh='400px'>{links}</BoxList>
          </Grid.Col>
          <Grid.Col span={12} sm={9}>
            <Stack sx={{ maxHeight: 550, width: '100%' }} justify='flex-start' spacing={2}>
              {active.length && (
                <>
                  <DataTableCashOuts date={active} HandleToEdit={HandleToEdit} />
                  <FooterSummaryCashOuts total={listOfDates?.find((item) => item.date === active)?._sum} />
                </>
              )}
            </Stack>
          </Grid.Col>
        </Grid>
        {openModalNewOrEditCashOuts && (
          <ModalNewCashOrEditOuts
            opened={openModalNewOrEditCashOuts}
            setOpened={setOpenModalNewOrEditCashOuts}
            toEdit={toEdit}
            handleSaveOuts={handleSaveOuts}
          />
        )}
      </Container>
    </ScrollArea>
  );
};
