import { Box, Text } from '@mantine/core';
import React from 'react';
import { styles } from '../../../styles/styles';
import { formatPrice } from './../../../utils/formatPrice';

export const FooterSummaryCashOuts = ({ total }) => {
  return (
    <Box
      style={{ ...styles, display: 'flex', justifyContent: 'space-between', fontSize: '1.3rem', fontWeight: 'bold' }}>
      <Text m={10}>Total</Text>
      <Text m={10} color='red'>
        {formatPrice(total?.amount)}
      </Text>
    </Box>
  );
};
