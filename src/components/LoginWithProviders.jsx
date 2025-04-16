import { FaGithub, FaGoogle } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';

import Button from './ui/Button';

import { useLoginWithGithub } from '@/auth/useLoginWithGithub';
import { useLoginWithGoogle } from '@/auth/useLoginWithGoogle';

function LoginWithProviders({ isPending }) {
  const { loginWithGithub } = useLoginWithGithub();
  const { loginWithGoogle } = useLoginWithGoogle();

  return (
    <div className='flex flex-col gap-5 sm:flex-row'>
      <Button
        disabled={isPending}
        icon={<FcGoogle className='size-4 md:size-6 xl:size-7' />}
        variant='ghost'
        className='flex-1 grayscale-100 hover:grayscale-0'
        onClick={loginWithGoogle}
      >
        Google
      </Button>
      <Button
        disabled={isPending}
        icon={<FaGithub className='size-4 md:size-6 xl:size-7' />}
        variant='ghost'
        className='flex-1 grayscale-100 hover:grayscale-0'
        onClick={loginWithGithub}
      >
        Github
      </Button>
    </div>
  );
}

export default LoginWithProviders;
