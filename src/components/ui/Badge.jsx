import { cn } from '@/lib/utils';

function Badge({ children, className, isActive, onClick }) {
  return (
    <span
      onClick={onClick}
      className={cn(
        className,
        `flex cursor-pointer items-center gap-2 rounded-full bg-neutral-600 px-2 py-1 transition-all duration-300 sm:px-3 ${isActive ? '-translate-y-1 scale-105 -rotate-2 bg-neutral-800 text-neutral-100' : 'hover:-translate-y-1 hover:scale-105 hover:-rotate-2 hover:bg-neutral-800 hover:text-neutral-200 active:-translate-y-1 active:scale-105 active:-rotate-2 active:bg-neutral-800 active:text-neutral-200'}`,
      )}
    >
      {children}
    </span>
  );
}

export default Badge;
