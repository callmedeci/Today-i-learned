import { cn } from '@/lib/utils';

function Button({
  children,
  isActive,
  icon,
  variant = 'primary',
  className,
  ...props
}) {
  const scaleTransition =
    'scale-100 uppercase hover:-rotate-1 hover:-translate-y-0.5 tracking-widest hover:scale-103 focus:-rotate-1 focus:-translate-y-0.5 focus:scale-105';

  const activeStyle = '-rotate-1 -translate-y-0.5 scale-105';

  const style = {
    primary: `bg-neutral-600 font-semibold min-h-12 rounded-full shadow text-neutral-300 focus:ring-2 focus:ring-neutral-500 hover:ring-2 hover:ring-neutral-500 focus:text-neutral-100 hover:text-neutral-100 ${scaleTransition} ${isActive && activeStyle}`,

    secondary: `md:min-w-52 min-h-12 rounded-full shadow text-neutral-100 ${scaleTransition} ${isActive && activeStyle}`,

    ghost:
      'bg-inherit font-semibold rounded-full text-neutral-400 ring-neutral-400  focus:ring-neutral-500 focus:text-neutral-300 hover:text-neutral-100 ring-2 hover:ring-neutral-500 min-w-18',

    danger: 'text-red-500 hover:text-red-600',
  };

  return (
    <button
      className={cn(
        className,
        style[variant],
        'group flex cursor-pointer items-center justify-center gap-2 px-1 py-2 text-sm transition-all duration-300 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 sm:px-5 sm:text-lg md:text-xl',
      )}
      {...props}
    >
      {icon && icon}
      {children}
    </button>
  );
}

export default Button;
