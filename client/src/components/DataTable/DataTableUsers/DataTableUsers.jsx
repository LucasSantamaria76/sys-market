import { ActionIcon, Group, Tooltip } from '@mantine/core';
import { DataTable } from 'mantine-datatable';
import { useState, useEffect } from 'react';
import { IoTrashOutline } from 'react-icons/io5';
import { TbEdit } from 'react-icons/tb';
import { useSelector, useDispatch } from 'react-redux';
import { deleteUser } from '../../../redux/slices/usersSlice';
import { styles } from '../../../styles/styles';
import { capitalize } from '../../../utils/capitalize';

export const DataTableUsers = ({ setUser, token }) => {
  const { users } = useSelector((state) => state.users);
  const [records, setRecords] = useState(users);
  const dispatch = useDispatch();

  useEffect(() => setRecords(users), [users]);

  return (
    <DataTable
      withBorder
      withColumnBorders
      highlightOnHover
      records={records}
      idAccessor='id'
      width='100%'
      sx={styles}
      columns={[
        {
          accessor: 'userName',
          title: 'Nombre',
          textAlignment: 'center',
          width: 150,
        },
        {
          accessor: 'role',
          title: 'Rol',
          textAlignment: 'center',
          width: 100,
          render: ({ role }) => capitalize(role.toLowerCase()),
          visibleMediaQuery: () => '(min-width: 400px)',
        },
        {
          accessor: 'actions',
          title: '',
          width: 60,
          render: (user) => (
            <Group spacing={4} position='right' noWrap>
              <Tooltip label='Editar producto' withArrow color='cyan'>
                <ActionIcon
                  color='cyan'
                  onClick={async (e) => {
                    e.stopPropagation();
                    setUser(user);
                  }}>
                  <TbEdit size={17} />
                </ActionIcon>
              </Tooltip>
              <Tooltip label='Eliminar producto' withArrow color='red'>
                <ActionIcon
                  color='red'
                  onClick={async (e) => {
                    e.stopPropagation();
                    dispatch(deleteUser({ id: user.id, token }));
                  }}>
                  <IoTrashOutline size={17} />
                </ActionIcon>
              </Tooltip>
            </Group>
          ),
        },
      ]}
    />
  );
};
