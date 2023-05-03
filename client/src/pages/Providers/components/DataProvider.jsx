import { Text } from '@mantine/core';

export const DataProvider = ({ provider }) => {
  return (
    <>
      <Text color='teal'>Proveedor: </Text>
      <Text italic mr={15}>
        {provider?.nameProvider}
      </Text>
      <Text color='teal'>Dirección: </Text>
      <Text italic mr={15}>
        {provider?.address}
      </Text>
      <Text color='teal'>Teléfono: </Text>
      <Text italic>{provider?.phone}</Text>
    </>
  );
};
