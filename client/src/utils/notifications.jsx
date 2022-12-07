import { Title } from '@mantine/core';
import { AiOutlineCheck } from 'react-icons/ai';
import { GrFormClose } from 'react-icons/gr';

export const showSuccess = (title) => {
  return {
    title: <Title order={3}>{title}</Title>,
    color: 'green',
    style: { backgroundColor: '#3f96a296' },
    icon: <AiOutlineCheck />,
  };
};
export const showError = (title, message) => {
  return {
    title: <Title order={3}>{title}</Title>,
    message,
    color: 'red',
    style: { backgroundColor: '#dd8c8cd6' },
    icon: <GrFormClose />,
  };
};

export const notification = (title) => {
  return {
    title,
    color: 'red',
    icon: <GrFormClose />,
    radius: 'md',
    styles: (theme) => ({
      root: {
        backgroundColor: theme.colors.dark[3],
      },
      title: { color: theme.white, fontSize: '1.2rem' },
      closeButton: {
        color: theme.white,
        '&:hover': { backgroundColor: theme.colors.gray[5] },
      },
    }),
  };
};
