import { useState } from 'react';
import {
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
import { NavLink, useNavigate } from 'react-router-dom';
import { BiChevronDown } from 'react-icons/bi';
import { CiSettings } from 'react-icons/ci';
import { HiOutlineSwitchHorizontal } from 'react-icons/hi';
import { IoLogOutOutline } from 'react-icons/io5';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../redux/slices/authSlice';
import { capitalize } from '../../utils/capitalize';
import { ModalLogin } from '../../Modals/ModalLogin';
import { useStylesHeaher } from '../../styles/styles';
import { HEADER_HEIGHT } from '../../constants/constants';
import { ModalSettingUser } from './../../Modals/ModalSettingUser';

export const HeaderContainer = ({ links }) => {
  const [opened, { toggle, close }] = useDisclosure(false);
  const [active, setActive] = useState(links[0].link);
  const [userMenuOpened, setUserMenuOpened] = useState(false);
  const [openModalSettingUser, setOpenModalSettingUser] = useState(false);
  const navigate = useNavigate();
  const { classes, cx } = useStylesHeaher();
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
                    {capitalize(userName)}
                  </Text>
                  <BiChevronDown size={12} stroke={1.5} />
                </Group>
              </UnstyledButton>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Item
                component='button'
                onClick={() => setOpenModalSettingUser(true)}
                icon={<CiSettings size={20} color='teal' />}>
                Cambiar password de la cuenta
              </Menu.Item>
              <Menu.Item
                component='button'
                onClick={() => {
                  navigate('/');
                  setOpenLogin(true);
                }}
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
        {openLogin && <ModalLogin opened={openLogin} setOpened={setOpenLogin} />}
        {openModalSettingUser && (
          <ModalSettingUser opened={openModalSettingUser} setOpened={setOpenModalSettingUser} userName={userName} />
        )}
      </Container>
    </Header>
  );
};
