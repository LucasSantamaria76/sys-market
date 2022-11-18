import { Group } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { DataTable } from 'mantine-datatable';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchApi } from '../../../API/fetchApi';
import { deleteUser } from '../../../redux/slices/usersSlice';
import { styles } from '../../../styles/styles';
import { capitalize } from '../../../utils/capitalize';
import { showError, showSuccess } from '../../../utils/notifications';
import { openConfirmModal } from '@mantine/modals';
import { confirmModal } from './../../../utils/confirmModal';
import { ButtonActions } from '../..';

export const DataTableUsers = ({ setUser, token }) => {
  const { users } = useSelector((state) => state.users);
  const [records, setRecords] = useState(users);
  const dispatch = useDispatch();

  useEffect(() => setRecords(users), [users]);

  const handleDeleteUser = (user) => {
    const Administrators = users.filter((user) => user.role === 'ADMIN');
    if (user.role !== 'ADMIN' || Administrators.length > 1) {
      openConfirmModal(
        confirmModal('Borrar el usuario:', user.userName, async () => {
          try {
            const res = await fetchApi({ endPoint: `/users/${user.id}`, method: 'DELETE', token });
            if (res.success) {
              showNotification(showSuccess(`Usuario ${user.userName} fue eliminado`));
              dispatch(deleteUser(user.id));
            } else showNotification(showError('No se pudo eliminar el usuario'));
          } catch (error) {
            showNotification(showError(error));
          }
        })
      );
    } else showNotification(showError('La aplicación no puede quedar sin usuarios administradores'));
  };

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
              <ButtonActions label='Editar usuario' isEdit={true} action={() => setUser(user)} />
              <ButtonActions label='Eliminar usuario' isEdit={false} action={() => handleDeleteUser(user)} />
            </Group>
          ),
        },
      ]}
    />
  );
};
