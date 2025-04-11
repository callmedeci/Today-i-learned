import { cn } from '@/lib/utils';

function Input({ className, name, error, variant = 'primary', ...props }) {
  const style = {
    primary:
      'bg-neutral-500 text-xl text-neutral-300 placeholder:text-neutral-300/50 focus:ring-neutral-400',
    secondary:
      'bg-neutral-700 text-lg xl:text-xl text-neutral-300 placeholder:text-neutral-400/50 focus:ring-neutral-500',
  };

  return (
    <div className='flex flex-1 flex-col gap-1'>
      <input
        name={name}
        className={cn(
          style[variant],
          className,
          'cursor-text rounded-full px-5 py-2 shadow transition-all duration-300 focus:ring-2 focus:outline-none disabled:opacity-70',
        )}
        {...props}
      />

      {error && <p className='ml-2 text-sm font-bold text-rose-600'>{error}</p>}
    </div>
  );
}

export default Input;
