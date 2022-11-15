import { createStyles } from '@mantine/core';

export const styles = {
  backgroundColor: 'white',
  width: '100%',
  border: '1px solid #ccc',
  borderRadius: '5px',
  boxShadow: '1px 1px 2px rgba(0,0,0,0.75)',
};

export const useStylesDataTable = createStyles(() => ({
  root: styles,
  header: {
    fontSize: '1.5rem',
    fontStyle: 'italic',
  },
}));
