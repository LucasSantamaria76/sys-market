import { useState } from 'react';
import {
  createStyles,
  Header,
  Container,
  Group,
  Burger,
  Paper,
  Transition,
  Menu,
  UnstyledButton,
  Avatar,
  Text,
  Button,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { NavLink } from 'react-router-dom';
import { BiChevronDown } from 'react-icons/bi';
import { CiSettings } from 'react-icons/ci';
import { HiOutlineSwitchHorizontal } from 'react-icons/hi';
import { IoLogOutOutline } from 'react-icons/io5';
import { useSelector, useDispatch } from 'react-redux';
import { ModalLogin } from '../Modals/ModalLogin';
import { logout } from '../../redux/slices/authSlice';

const HEADER_HEIGHT = 60;

const useStyles = createStyles((theme) => ({
  root: {
    position: 'relative',
    zIndex: 99,
    boxShadow: '0px 1px 5px 0px rgba(0,0,0,0.75)',
    borderBottom: 0,
  },

  dropdown: {
    position: 'absolute',
    top: HEADER_HEIGHT,
    left: 0,
    right: 0,
    zIndex: 99,
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0,
    borderTopWidth: 0,
    overflow: 'hidden',

    [theme.fn.largerThan('sm')]: {
      display: 'none',
    },
  },

  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '100%',
  },

  links: {
    [theme.fn.smallerThan('sm')]: {
      display: 'none',
    },
  },

  burger: {
    [theme.fn.largerThan('sm')]: {
      display: 'none',
    },
  },

  link: {
    display: 'block',
    lineHeight: 1,
    padding: '15px',
    borderRadius: theme.radius.sm,
    textDecoration: 'none',
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],
    fontSize: theme.fontSizes.md,
    fontWeight: 500,

    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
    },

    [theme.fn.smallerThan('sm')]: {
      borderRadius: 0,
      padding: theme.spacing.md,
    },
  },

  linkActive: {
    '&, &:hover': {
      backgroundColor: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).background,
      color: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).color,
    },
  },
  user: {
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,
    padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
    borderRadius: theme.radius.sm,
    transition: 'background-color 100ms ease',

    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.white,
    },

    [theme.fn.smallerThan('xs')]: {
      display: 'none',
    },
  },
}));

export const HeaderContainer = ({ links }) => {
  const [opened, { toggle, close }] = useDisclosure(false);
  const [active, setActive] = useState(links[0].link);
  const [userMenuOpened, setUserMenuOpened] = useState(false);
  const { classes, cx } = useStyles();
  const {
    user: { isAuthenticated, userName, role },
  } = useSelector((state) => state.auth);
  const [openLogin, setOpenLogin] = useState(false);
  const dispatch = useDispatch();

  const items = links.map(({ link, label }) => {
    const authorized = link !== 'management' ? true : role === 'ADMIN' ? true : false;
    return (
      isAuthenticated &&
      authorized && (
        <NavLink
          key={label}
          to={`/${link}`}
          className={cx(classes.link, { [classes.linkActive]: active === link })}
          onClick={(event) => {
            setActive(link);
            close();
          }}>
          {label}
        </NavLink>
      )
    );
  });

  return (
    <Header height={HEADER_HEIGHT} className={classes.root}>
      <Container className={classes.header}>
        <Group spacing={5} className={classes.links}>
          {items}
        </Group>

        <Burger opened={opened} onClick={toggle} className={classes.burger} size='sm' />

        <Transition transition='pop-top-right' duration={200} mounted={opened}>
          {(styles) => (
            <Paper className={classes.dropdown} withBorder style={styles}>
              {items}
            </Paper>
          )}
        </Transition>
        {isAuthenticated ? (
          <Menu
            width={260}
            position='bottom-end'
            transition='pop-top-right'
            onClose={() => setUserMenuOpened(false)}
            onOpen={() => setUserMenuOpened(true)}>
            <Menu.Target>
              <UnstyledButton className={cx(classes.user, { [classes.userActive]: userMenuOpened })}>
                <Group spacing={7}>
                  <Avatar
                    src={
                      'https://www.fedex.com/content/dam/fedex/us-united-states/shipping/images/2020/Q2/account_purple_icon_1988286190.png'
                    }
                    alt='photoURL'
                    radius='xl'
                    size={20}
                  />
                  <Text weight={500} size='sm' sx={{ lineHeight: 1 }} mr={3}>
                    {userName[0].toUpperCase() + userName.slice(1)}
                  </Text>
                  <BiChevronDown size={12} stroke={1.5} />
                </Group>
              </UnstyledButton>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Item icon={<CiSettings size={20} color='teal' />}>Configuración de la cuenta</Menu.Item>
              <Menu.Item
                component='button'
                onClick={() => setOpenLogin(true)}
                icon={<HiOutlineSwitchHorizontal size={20} color='teal' />}>
                Cambiar cuenta
              </Menu.Item>
              <Menu.Item
                component='button'
                onClick={() => dispatch(logout())}
                icon={<IoLogOutOutline size={20} color='teal' />}>
                Cerrar sesión
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        ) : (
          <Button variant='outline' onClick={() => setOpenLogin(true)}>
            Iniciar sesión
          </Button>
        )}
        <ModalLogin opened={openLogin} setOpened={setOpenLogin} />
      </Container>
    </Header>
  );
};
