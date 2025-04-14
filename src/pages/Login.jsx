import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { KeyRound, LogIn, Mail, Send } from 'lucide-react';
import { Link } from 'react-router';
import { FaGithub, FaGoogle } from 'react-icons/fa';
import { useForm } from 'react-hook-form';
import { useLoginWithPassword } from '@/auth/useLoginWithPassword';
import { useLoginWithGithub } from '@/auth/useLoginWithGithub';

function Login() {
  const { register, handleSubmit, formState } = useForm();
  const { isPending, login } = useLoginWithPassword();
  const { loginWithGithub } = useLoginWithGithub();

  function onSubmit(value) {
    login(value);
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='mx-auto flex h-full w-full max-w-2xl flex-col gap-5 rounded-2xl bg-neutral-700/30 p-5 shadow'
    >
      <h1 className='flex items-center gap-2 text-4xl font-semibold uppercase'>
        <LogIn className='size-9' />
        <span>Login to your account</span>
      </h1>

      <hr className='rounded border-2 border-neutral-600' />

      <p className='text-center text-neutral-300'>Or continue with...</p>
      <div className='flex flex-col gap-5 sm:flex-row'>
        <Button
          disabled={isPending}
          icon={<FaGoogle />}
          variant='ghost'
          className='flex-1'
        >
          Google
        </Button>
        <Button
          disabled={isPending}
          icon={<FaGithub />}
          variant='ghost'
          className='flex-1'
          onClick={loginWithGithub}
        >
          Github
        </Button>
      </div>

      <Input
        {...register('email', {
          required: {
            value: true,
            message: 'Email is requiered',
          },
        })}
        error={formState.errors?.email?.message}
        type='email'
        placeholder='Email'
        disabled={isPending}
        icon={<Mail />}
      />
      <Input
        {...register('password', {
          required: {
            value: true,
            message: 'password is requiered',
          },
          minLength: {
            value: 8,
            message: 'Min 8 chars',
          },
        })}
        error={formState.errors?.password?.message}
        disabled={isPending}
        type='password'
        placeholder='password'
        icon={<KeyRound />}
      />

      <Button disabled={isPending} icon={<Send />} className='col-span-2'>
        Submit
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

export default Login;
