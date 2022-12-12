import { UnstyledButton, Container, Stack, ScrollArea, Grid, Button, Loader } from '@mantine/core';
import { openConfirmModal } from '@mantine/modals';
import { showNotification } from '@mantine/notifications';
import dayjs from 'dayjs';
import { useState, useEffect, lazy, Suspense } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BoxList, DataTableCashOuts, FooterSummaryCashOuts } from '../../components';
import { fetchApi } from '../../API/fetchApi';
import { useFetch } from '../../hooks/useFetch';
import { addCashOuts, deleteCashOuts, setListCashOuts, updateCashOuts } from '../../redux/slices/cashOutsSlice';
import { useStylesBtnList } from '../../styles/styles';
import { showError, showSuccess } from '../../utils/notifications';
import { confirmModal } from './../../utils/confirmModal';

const ModalNewCashOrEditOuts = lazy(() => import('../../Modals/ModalNewCashOrEditOuts.jsx'));

export const CashOuts = () => {
  const { classes, cx } = useStylesBtnList();
  const { data, Refresh } = useFetch('cashOuts/totalPerDay');
  const [listOfDates, setListOfDates] = useState();
  const [openModalNewOrEditCashOuts, setOpenModalNewOrEditCashOuts] = useState(false);
  const [toEdit, setToEdit] = useState('');
  const [active, setActive] = useState('');
  const dispatch = useDispatch();
  const {
    user: { token },
  } = useSelector((state) => state.auth);

  useEffect(() => {
    fetchApi({ endPoint: 'cashOuts', token }).then(({ data }) => {
      dispatch(setListCashOuts(data));
    });
  }, [dispatch, token]);

  useEffect(() => {
    setListOfDates(data?.sort((a, b) => b.date.localeCompare(a.date)));
    setActive(dayjs().format('DD-MM-YYYY'));
  }, [data]);

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
      const option = toEdit
        ? { endPoint: `cashOuts/${toEdit.id}`, method: 'PUT' }
        : { endPoint: 'cashOuts', method: 'POST' };

      const res = await fetchApi({ ...option, token, body: values });
      Refresh();
      if (res.success) {
        showNotification(showSuccess(`Salida ${!toEdit ? 'creada' : 'actualizada'} con éxito`));
        //!listOfDates.find((item) => item.date === dayjs().format('DD-MM-YYYY')) && Refresh(); //If today's date is not found, I make the call again
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

  const handleDelete = async (out) => {
    openConfirmModal(
      confirmModal('Borrar la siguiente salida:', out.description, async () => {
        try {
          const res = await fetchApi({ endPoint: `cashOuts/${out.id}`, method: 'DELETE', token });
          if (res.success) {
            showNotification(showSuccess('Salida eliminada con éxito'));
            Refresh();
            dispatch(deleteCashOuts(out.id)); //I delete it from the store
          } else showNotification(showError('No se pudo eliminar la salida'));
        } catch (error) {
          showNotification(showError(error));
        }
      })
    );
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
                  <DataTableCashOuts date={active} HandleToEdit={HandleToEdit} handleDelete={handleDelete} />
                  <FooterSummaryCashOuts total={listOfDates?.find((item) => item.date === active)?._sum} />
                </>
              )}
            </Stack>
          </Grid.Col>
        </Grid>
        <Suspense fallback={<Loader variant='bars' />}>
          {openModalNewOrEditCashOuts && (
            <ModalNewCashOrEditOuts
              opened={openModalNewOrEditCashOuts}
              setOpened={setOpenModalNewOrEditCashOuts}
              toEdit={toEdit}
              handleSaveOuts={handleSaveOuts}
            />
          )}
        </Suspense>
      </Container>
    </ScrollArea>
  );
};
