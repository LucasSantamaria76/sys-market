import { ActionIcon, Tooltip, useMantineTheme } from '@mantine/core';
import { IoTrashOutline } from 'react-icons/io5';
import { TbEdit } from 'react-icons/tb';

export const ButtonActions = ({ label, isEdit, action }) => {
  const theme = useMantineTheme();
  const color = isEdit ? theme.colors.brand[4] : theme.colors.red[7];
  return (
    <Tooltip label={label} withArrow color={color}>
      <ActionIcon
        onClick={async (e) => {
          e.stopPropagation();
          action();
        }}>
        {isEdit ? <TbEdit size={17} color={color} /> : <IoTrashOutline size={17} color={color} />}
      </ActionIcon>
    </Tooltip>
  );
};
