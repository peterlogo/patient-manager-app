import { AuthContainer } from '@/layout';
import { Box, Text } from '@mantine/core';
import Image from 'next/image';
import Doctors from '@/assets/doctors.svg';
import { RegisterForm } from '@/components';
import { useForm } from '@mantine/form';
import { RegisterFormValues } from '@/types';

export default function Register() {
  const form = useForm<RegisterFormValues>({});
  return (
    <AuthContainer>
      <Box className="w-full px-8 md:px-0 md:flex items-center justify-around">
        <Box>
          <Text className="text-3xl text-primary font-bold pb-2">
            Account Setup
          </Text>
          <Text className="text-xl text-gray mb-12">
            Get started by creating your account.
          </Text>
          <Image
            className="hidden sm:block"
            src={Doctors}
            width={346}
            height={298}
            alt="doctor-image"
          />
        </Box>
        <RegisterForm form={form} />
      </Box>
    </AuthContainer>
  );
}
