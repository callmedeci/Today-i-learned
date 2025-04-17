import { ShieldX } from 'lucide-react';
import Button from './ui/Button';

function ErrorFallBack({ error, resetErrorBoundary }) {
  return (
    <section className='flex h-dvh flex-col items-center justify-center'>
      <div className='flex flex-col items-center gap-2 rounded-lg bg-neutral-700 p-5 text-center text-2xl text-neutral-300 shadow md:text-3xl'>
        <div className='flex items-center'>
          <ShieldX className='size-10 md:size-15' />
          <h1 className='font-semibold'>Something went wrong:</h1>
        </div>

        <pre className='text-base text-red-500 md:text-lg'>{error.message}</pre>

        <Button onClick={resetErrorBoundary}>Restart Page</Button>
      </div>
    </section>
  );
}

export default ErrorFallBack;
