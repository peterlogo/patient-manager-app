import { AuthResponse, LoginParams, RegisterParams } from '@/types';
import { api } from './api';

const authApi = api.injectEndpoints({
  endpoints: (build) => ({
    register: build.mutation<AuthResponse, RegisterParams>({
      query: (arg) => ({
        url: '/register',
        method: 'POST',
        body: arg
      })
    }),
    login: build.mutation<AuthResponse, LoginParams>({
      query: (arg) => ({
        url: '/login',
        method: 'POST',
        body: arg
      })
    })
  })
});

export const { useLoginMutation, useRegisterMutation } = authApi;
