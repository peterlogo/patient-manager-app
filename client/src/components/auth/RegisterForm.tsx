import React from 'react';
import { FormProps, RegisterFormValues } from '@/types';
import { Box, TextInput, Button, PasswordInput } from '@mantine/core';

export const RegisterForm: React.FunctionComponent<
  FormProps<RegisterFormValues>
> = ({ form }) => {
  return (
    <form
      className="w-527 p-8 bg-white border-gray border rounded"
      onSubmit={() => console.log('Submitted form')}
    >
      <Box className=" flex space-x-4  items-center justify-between pb-4">
        <TextInput
          required
          label="First Name"
          {...form.getInputProps('firstName')}
        />
        <TextInput label="Last Name" {...form.getInputProps('lastName')} />
      </Box>
      <TextInput required label="Email" {...form.getInputProps('Email')} />
      <Box className=" flex space-x-4  items-center justify-between py-4">
        <PasswordInput
          required
          className="w-full"
          label="Password"
          {...form.getInputProps('password')}
        />
        <PasswordInput
          required
          className="w-full"
          label="Confirm password"
          {...form.getInputProps('confirmPassword')}
        />
      </Box>
      <Button
        className="bg-primary mt-4 mb-2"
        fullWidth
        size="md"
        type="submit"
      >
        Create Account
      </Button>
      <Button
        className="border-primary mt-4"
        fullWidth
        size="md"
        variant="outline"
      >
        Login
      </Button>
    </form>
  );
};
