import { cn } from '@/lib/utils';

function Select({
  variant = 'primary',
  options,
  error,
  value,
  defaultValue,
  onChange,
  ...props
}) {
  const style = {
    primary:
      'bg-neutral-600 text-sm sm:text-base md:text-xl text-neutral-300 placeholder:text-neutral-300/50 ring-neutral-400 focus-within:text-neutral-100',
    secondary:
      'bg-neutral-700 text-sm sm:text-base md:text-xl text-neutral-300 placeholder:text-neutral-400/50 ring-neutral-500',
  };

  return (
    <div className='flex flex-col gap-1'>
      <select
        value={value}
        error={error}
        className={cn(
          style[variant],
          'cursor-pointer rounded-full px-5 py-2 shadow transition-all duration-300 focus:ring-2 focus:outline-none disabled:opacity-70',
        )}
        {...props}
        onChange={(e) => onChange(e)}
      >
        {defaultValue && (
          <option selected hidden disabled>
            {defaultValue}
          </option>
        )}
        {options.map((option) => (
          <option value={option.value} key={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      {error && <p className='ml-2 font-bold text-red-500'>{error}</p>}
    </div>
  );
}

export default Select;
