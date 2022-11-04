import { createStyles } from '@mantine/core';

export const useStylesDataTable = createStyles(() => ({
  root: {
    borderRadius: '8px',
    boxShadow: '1px 1px 2px rgba(0,0,0,0.75);',
    border: '1px solid #ccc',
  },
  header: {
    fontSize: '1.5rem',
    fontStyle: 'italic',
  },
}));
