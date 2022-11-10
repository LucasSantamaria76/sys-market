import { Select, TextInput } from '@mantine/core';

export const FormOperador = ({ user: { id, userName, role }, setUser }) => {
  return (
    <>
      <TextInput
        label='Nombre de Usuario'
        value={userName}
        onChange={(e) => setUser({ userName: e.target.value, role, id })}
      />
      <Select
        mt={10}
        label='Rol'
        value={role}
        onChange={(value) => setUser({ userName, role: value, id })}
        searchable
        data={[
          { value: 'ADMIN', label: 'Administrador' },
          { value: 'OPERATOR', label: 'Operador' },
        ]}
      />
    </>
  );
};
