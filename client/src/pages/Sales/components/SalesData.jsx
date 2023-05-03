import { Group, Title } from '@mantine/core';

export const SalesData = ({ total, paymentMethod }) => {
  return (
    <>
      <Group>
        <Title color='black' order={3}>
          Total de la venta:
        </Title>
        <Title color='red' order={3}>
          {total}
        </Title>
      </Group>
      <Group>
        <Title color='black' order={3}>
          Metodo de pagó:
        </Title>
        <Title color='red' order={3}>
          {paymentMethod}
        </Title>
      </Group>
    </>
  );
};
