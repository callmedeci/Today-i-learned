function Icon() {
  return (
    <div className='flex items-center gap-3'>
      <img
        src='/images/logo.png'
        alt='logo picture'
        className='size-12 sm:size-16 xl:size-20'
      />
      <h1 className='font-sono-bold text-lg uppercase sm:text-3xl md:text-4xl xl:text-6xl'>
        Today I learned
      </h1>
    </div>
  );
}

export default Icon;
