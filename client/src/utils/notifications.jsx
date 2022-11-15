import { AiOutlineCheck } from 'react-icons/ai';
import { GrFormClose } from 'react-icons/gr';

export const showSuccess = (title) => {
  return {
    title,
    color: 'green',
    style: { backgroundColor: '#00ff95e3' },
    icon: <AiOutlineCheck />,
  };
};
export const showError = (title, message) => {
  return {
    title,
    message,
    color: 'red',
    style: { backgroundColor: '#dd8c8cd6' },
    icon: <GrFormClose />,
  };
};
