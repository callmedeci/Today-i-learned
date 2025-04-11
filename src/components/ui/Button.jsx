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
    'scale-100 uppercase hover:-rotate-1 hover:-translate-y-0.5 tracking-widest hover:scale-105 focus:-rotate-1 focus:-translate-y-0.5 focus:scale-105';

  const activeStyle = '-rotate-1 -translate-y-0.5 scale-105';

  const variantStyle = {
    primary: `bg-neutral-600 font-semibold min-h-12 rounded-full shadow text-neutral-100 focus:ring-2 focus:ring-neutral-500 hover:ring-2 hover:ring-neutral-500 ${scaleTransition} ${isActive && activeStyle}`,

    secondary: `md:min-w-52 min-h-12 rounded-full shadow text-neutral-100 ${scaleTransition} ${isActive && activeStyle}`,

    ghost:
      'bg-inherit font-semibold rounded-full text-neutral-400 ring-neutral-400  focus:ring-neutral-500 focus:text-neutral-300 hover:text-neutral-100 ring-2 hover:ring-neutral-500',

    danger: 'text-rose-600 hover:text-rose-700',
  };

  return (
    <button
      className={cn(
        className,
        variantStyle[variant],
        'flex cursor-pointer items-center justify-center gap-2 px-5 py-2 text-base transition-all duration-300 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 sm:text-xl',
      )}
      {...props}
    >
      {icon && icon}
      {children}
    </button>
  );
}

export default Button;
