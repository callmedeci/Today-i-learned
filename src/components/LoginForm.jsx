import { zodResolver } from '@hookform/resolvers/zod';
import { LogIn, Mail, Send } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router';

import { useLoginWithPassword } from '@/auth/useLoginWithPassword';
import { loginSchema } from '@/schema';

import Icon from './Icon';
import LoginWithProviders from './LoginWithProviders';
import Button from './ui/Button';
import Input from './ui/Input';
import PasswordToggleInput from './ui/PasswordToggleInput';
import Spinner from './ui/Spinner';

function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(loginSchema) });
  const { isPending, login } = useLoginWithPassword();

  function onSubmit(value) {
    login(value);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-5'>
      <Icon />

      <h2 className='flex items-center gap-2 text-lg font-semibold uppercase sm:text-xl md:text-2xl xl:text-4xl'>
        Login to your account
      </h2>

      <hr className='rounded border-2 border-neutral-600' />

      <p className='text-center text-neutral-300'>Or continue with...</p>
      <LoginWithProviders isPending={isPending} />

      <Input
        {...register('email')}
        error={errors?.email?.message}
        type='email'
        placeholder='Email'
        disabled={isPending}
        icon={<Mail className='size-4 md:size-6 xl:size-7' />}
      />
      <PasswordToggleInput
        {...register('password')}
        error={errors?.password?.message}
        disabled={isPending}
        placeholder='password'
      />

      <Button
        disabled={isPending}
        icon={isPending && <Spinner />}
        className='col-span-2'
      >
        {isPending ? 'Loading...' : 'Login'}
      </Button>

      <p className='text-center text-neutral-300/95'>
        Don't have account?{' '}
        <Link
          to='/create-account'
          className='font-medium text-neutral-400 transition-colors duration-300 hover:text-neutral-50'
        >
          create a new account
        </Link>
      </p>
    </form>
  );
}

export default LoginForm;
