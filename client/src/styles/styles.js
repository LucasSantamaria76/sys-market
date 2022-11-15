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

export const useStylesBtnList = createStyles((theme) => {
  return {
    link: {
      ...theme.fn.focusStyles(),
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      textDecoration: 'none',
      fontSize: theme.fontSizes.xl,
      color: theme.colorScheme === 'dark' ? theme.colors.dark[1] : theme.colors.gray[7],
      padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
      borderRadius: theme.radius.sm,
      fontWeight: 500,

      '&:hover': {
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
        color: theme.colorScheme === 'dark' ? theme.white : theme.black,
      },
    },

    linkActive: {
      '&, &:hover': {
        backgroundColor: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).background,
        color: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).color,
      },
    },
  };
});
