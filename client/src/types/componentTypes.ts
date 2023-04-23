import { UseFormReturnType } from '@mantine/form';

export interface RegisterFormValues {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface LoginFormValues {
  email: string;
  password: string;
}

export interface FormProps<T> {
  form: UseFormReturnType<T>;
}
