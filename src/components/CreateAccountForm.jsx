import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { CircleUser, Eye, KeyRound, LogIn, Mail, Send } from 'lucide-react';
import { Link } from 'react-router';

import LoginWithProviders from './LoginWithProviders';
import Button from './ui/Button';
import Input from './ui/Input';
import Spinner from './ui/Spinner';

import { useCreateAccount } from '@/auth/useCreateAccount';
import { createAccountSchema } from '@/schema';
import { useState } from 'react';
import Icon from './Icon';
import PasswordToggleInput from './ui/PasswordToggleInput';

function CreateAccountForm() {
  const [inputType, setInputType] = useState('password');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(createAccountSchema),
  });
  const { createAccount, isPending } = useCreateAccount();

  function onSubmit(value) {
    createAccount(value);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-5'>
      <Icon />

      <h2 className='flex items-center gap-2 text-lg font-semibold uppercase sm:text-xl md:text-2xl xl:text-4xl'>
        Create new account
      </h2>

      <hr className='rounded border-2 border-neutral-600' />

      <p className='text-center text-neutral-300'>Or continue with...</p>
      <LoginWithProviders isPending={isPending} />

      <div className='flex flex-col gap-5 md:grid md:grid-cols-2'>
        <Input
          {...register('fullName')}
          error={errors?.fullName?.message}
          type='text'
          placeholder='full name'
          disabled={isPending}
          icon={<CircleUser className='size-4 md:size-6 xl:size-7' />}
        />

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

        <PasswordToggleInput
          {...register('confirmPassword')}
          error={errors?.confirmPassword?.message}
          disabled={isPending}
          placeholder='Confirm password'
        />
      </div>

      <Button
        disabled={isPending}
        icon={isPending && <Spinner />}
        className='col-span-2'
      >
        {isPending ? 'Loading...' : 'Create Account'}
      </Button>

      <p className='text-center text-neutral-300/95'>
        Already have account?{' '}
        <Link
          to='/login'
          className='font-medium text-neutral-400 transition-colors duration-300 hover:text-neutral-50'
        >
          login to your account
        </Link>
      </p>
    </form>
  );
}

export default CreateAccountForm;
