function Badge({ children, onClick }) {
  return (
    <span
      onClick={onClick}
      className='flex cursor-pointer items-center gap-2 rounded-full bg-neutral-500 px-3 py-1 transition-all duration-300 hover:-translate-y-1 hover:scale-105 hover:-rotate-2 hover:bg-neutral-800'
    >
      {children}
    </span>
  );
}

export default Badge;
