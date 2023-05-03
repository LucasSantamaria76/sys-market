import { Title } from '@mantine/core';

export const confirmModal = (title, description, confirmFn) => ({
  centered: true,
  title: (
    <Title color='red' order={3}>
      {title}
    </Title>
  ),
  children: <Title order={4}>{description}</Title>,
  labels: { confirm: 'Aceptar', cancel: 'Cancelar' },
  confirmProps: { color: 'red' },
  onConfirm: confirmFn,
});
