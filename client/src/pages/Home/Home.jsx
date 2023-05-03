import { BackgroundImage, Box, Container } from '@mantine/core';

export const Home = () => {
  return (
    <Container size='lg'>
      <Box
        sx={{
          width: '100%',
          height: '93vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <BackgroundImage
          src={`${process.env.PUBLIC_URL}assets/Market.jpg`}
          radius='lg'
          sx={{ height: '560px' }}></BackgroundImage>
      </Box>
    </Container>
  );
};
