import { MoveLeft } from 'lucide-react';
import { Link } from 'react-router';

function NotFound() {
  return (
    <div className='w-full h-dvh flex flex-col items-center justify-center text-neutral-50'>
      <h1 className='text-6xl'>404 Not found!</h1>
      <Link
        to='/'
        className='flex gap-2 text-3xl items-center text-neutral-400 hover:text-blue-500 transition-colors duration-300'
      >
        <MoveLeft />
        Back Home
      </Link>
    </div>
  );
}

export default NotFound;
