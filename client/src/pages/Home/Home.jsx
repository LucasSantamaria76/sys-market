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
          src='https://www.kibrispostasi.com/upload/news/9/90/90724_1578067942.jpg'
          radius='lg'
          sx={{ height: '560px' }}></BackgroundImage>
      </Box>
    </Container>
  );
};
