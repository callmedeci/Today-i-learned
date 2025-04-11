import Spinner from './Spinner';

function Loading() {
  return (
    <div className='col-span-9 flex h-132 flex-col items-center justify-center lg:col-span-10'>
      <span className='flex items-center gap-1'>
        <Spinner />
        <p>Loading...</p>
      </span>
    </div>
  );
}

export default Loading;
