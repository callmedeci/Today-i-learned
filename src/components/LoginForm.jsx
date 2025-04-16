import { Link } from 'react-router';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { KeyRound, LogIn, Mail, Send } from 'lucide-react';

import { loginSchema } from '@/schema';
import { useLoginWithPassword } from '@/auth/useLoginWithPassword';

import Input from './ui/Input';
import Button from './ui/Button';
import Spinner from './ui/Spinner';
import LoginWithProviders from './LoginWithProviders';
import Icon from './Icon';

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
        <LogIn className='size-5 md:size-7 xl:size-8' />
        <span>Login to your account</span>
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
      <Input
        {...register('password')}
        error={errors?.password?.message}
        disabled={isPending}
        type='password'
        placeholder='password'
        icon={<KeyRound className='size-4 md:size-6 xl:size-7' />}
      />

      <Button
        disabled={isPending}
        icon={
          isPending ? (
            <Spinner />
          ) : (
            <Send className='size-4 md:size-6 xl:size-7' />
          )
        }
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
