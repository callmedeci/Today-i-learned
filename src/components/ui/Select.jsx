import { useClickOutSide } from '@/hooks/useClickOutSide';
import { cn } from '@/lib/utils';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useRef } from 'react';
import { useEffect, useState } from 'react';

function Select({
  variant = 'primary',
  options,
  error,
  placeHolder,
  register,
  name,
  setValue,
  onChange,
  watch,
  ...props
}) {
  const ref = useClickOutSide(() => setShowMenu(false));
  const [showMenu, setShowMenu] = useState(false);
  const [selectedValue, setSelectedValue] = useState(placeHolder);

  const selected = watch && watch(name);
  const style = {
    primary:
      'bg-neutral-600 text-sm sm:text-base md:text-xl text-neutral-300 placeholder:text-neutral-300/50 ring-neutral-400 focus-within:text-neutral-100',
    secondary:
      'bg-neutral-700 text-sm sm:text-base md:text-xl text-neutral-300 placeholder:text-neutral-400/50 ring-neutral-500',
  };

  function toggleShowMenue() {
    setShowMenu((show) => !show);
  }

  function handleChangeValue(option) {
    setShowMenu(false);
    setSelectedValue(option.label);
    if (onChange) onChange(option.value);
    if (setValue) setValue(name, option.value, { shouldValidate: true });
  }

  return (
    <div className='flex flex-col gap-1'>
      <div
        className={cn(
          style[variant],
          'relative flex cursor-pointer items-center rounded-full px-5 py-2 shadow transition-all duration-300 focus:ring-2 focus:outline-none disabled:opacity-70',
        )}
        onClick={toggleShowMenue}
        ref={ref}
        {...props}
      >
        <div>{selectedValue}</div>
        <input
          type='hidden'
          {...register?.(name)}
          value={selected || ''}
          readOnly
        />

        <div className='flex flex-1 justify-end'>
          <ChevronDown
            className={`${showMenu ? 'rotate-180' : ''} transition-transform duration-300`}
          />
        </div>

        {showMenu && (
          <div
            className='absolute top-12 left-0 z-50 flex w-full translate-y-0 flex-col divide-y-2 divide-neutral-600/80 overflow-hidden rounded-lg bg-neutral-500 opacity-100 shadow transition-all duration-300 select-none starting:-translate-y-10 starting:opacity-0'
            onClick={toggleShowMenue}
          >
            {options.map((option) => (
              <div
                onClick={() => handleChangeValue(option)}
                value={option.value}
                key={option.value}
                className='cursor-pointer px-3 py-2 text-neutral-200 transition-colors hover:bg-neutral-600 hover:text-neutral-50'
              >
                {option.label}
              </div>
            ))}
          </div>
        )}
      </div>

      {error && <p className='ml-2 font-bold text-red-500'>{error}</p>}
    </div>
  );
}

export default Select;
