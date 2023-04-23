import { AuthContainerProps } from '@/types';
import { Container } from '@mantine/core';
import { FunctionComponent } from 'react';

export const AuthContainer: FunctionComponent<AuthContainerProps> = ({
  children
}) => {
  return (
    <Container
      size="md"
      px="xs"
      h="100vh"
      style={{
        display: 'flex',
        justifyItems: 'center',
        alignItems: 'center'
      }}
    >
      {children}
    </Container>
  );
};
