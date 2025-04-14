import { cn } from '@/lib/utils';

function Input({
  className,
  name,
  error,
  variant = 'primary',
  icon,
  ...props
}) {
  const style = {
    primary:
      'bg-neutral-600 text-sm sm:text-base md:text-xl text-neutral-300 placeholder:text-neutral-300/50 ring-neutral-400 focus-within:text-neutral-100',
    secondary:
      'bg-neutral-700 text-sm sm:text-base md:text-xl text-neutral-300 placeholder:text-neutral-400/50 focus:ring-neutral-500',
  };

  return (
    <div className='flex flex-1 flex-col gap-1'>
      <div
        className={cn(
          style[variant],
          className,
          'flex cursor-text items-center gap-2 rounded-full px-5 py-2 shadow transition-all duration-300 focus-within:ring-2 focus-within:outline-none disabled:opacity-70',
        )}
      >
        {icon && icon}
        <input className='w-full outline-none' name={name} {...props} />
      </div>

      {error && (
        <p className='ml-2 text-sm font-semibold tracking-wide text-rose-600'>
          {error}
        </p>
      )}
    </div>
  );
}

export default Input;
