import { Button, Grid, Group, Paper, Stack, Text, Tooltip } from '@mantine/core';
import { formatPrice } from './../../../utils/formatPrice';
import { GiMoneyStack } from 'react-icons/gi';
import { FaCcVisa } from 'react-icons/fa';
import { PAYMENT_METHODS } from '../../../constants/constants';

export const Summary = ({ onClick, summary, addSale, loading }) => {
  return (
    <Paper p='md' withBorder sx={{ height: '20vh' }} onClick={onClick}>
      <Stack align='flex-end' justify='space-between' sx={{ height: '100%', gap: 0 }}>
        <Grid sx={{ width: '300px' }}>
          <Grid.Col span={6} sx={{ textAlign: 'left' }}>
            <Text>Aticulos</Text>
          </Grid.Col>
          <Grid.Col span={6} sx={{ textAlign: 'right' }}>
            <Text>{summary.quantity}</Text>
          </Grid.Col>
        </Grid>
        <Group sx={{ fontSize: '1.2rem', fontWeight: 700 }}>
          <Grid sx={{ width: '300px' }}>
            <Grid.Col span={6} sx={{ textAlign: 'left' }}>
              <Text>Total</Text>
            </Grid.Col>
            <Grid.Col span={6} sx={{ textAlign: 'right' }}>
              <Text color={'red'}>{formatPrice(summary.total)}</Text>
            </Grid.Col>
          </Grid>
        </Group>
        <Group>
          <Tooltip label='Pago con tarjeta' withArrow>
            <Button variant='light' mt='md' radius='md' onClick={() => addSale(PAYMENT_METHODS.CARD)} loading={loading}>
              <FaCcVisa size={30} fill='teal' />
            </Button>
          </Tooltip>
          <Tooltip label='Pago en efectivo' withArrow>
            <Button variant='light' mt='md' radius='md' onClick={() => addSale(PAYMENT_METHODS.CASH)} loading={loading}>
              <GiMoneyStack size={30} fill='green' />
            </Button>
          </Tooltip>
        </Group>
      </Stack>
    </Paper>
  );
};
