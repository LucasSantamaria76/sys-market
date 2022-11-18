import { Grid, Modal, Text, useMantineTheme } from '@mantine/core';
import { useDispatch, useSelector } from 'react-redux';
import { DataTablePurchasedProducts } from '../components/index';
import { useEffect } from 'react';
import { useGetProductsQuery } from '../redux/apis/productsApi';
import { setProvider } from '../redux/slices/purchasesSlice';
import { FormProduct } from '../components/Form/FormProduct';

const ModalLoadOfPurchases = ({ providerID, opened, setOpened }) => {
  const theme = useMantineTheme();
  const { data } = useGetProductsQuery();
  const { purchase } = useSelector((state) => state.purchase);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setProvider(providerID));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [providerID]);

  return (
    <Modal
      opened={opened}
      onClose={() => setOpened(false)}
      title={
        <Text color='brand' size='xl'>
          Cargar pedido
        </Text>
      }
      size='90%'
      overlayColor={theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2]}
      overlayOpacity={0.55}
      overlayBlur={3}
      shadow={'2px 2px 10px rgba(0,0,0,0.75)'}
      centered>
      <Grid>
        <Grid.Col span={12} md={6}>
          <FormProduct providerID={providerID} setOpened={setOpened} />
        </Grid.Col>
        <Grid.Col span={12} md={6}>
          <DataTablePurchasedProducts records={purchase?.products} products={data?.products} />
        </Grid.Col>
      </Grid>
    </Modal>
  );
};
export default ModalLoadOfPurchases;
