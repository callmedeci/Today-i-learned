import Search from './Search';
import SortBy from './SortBy';

function FactsOperations() {
  return (
    <div className='my-8 flex w-full flex-col-reverse items-center gap-2 md:grid md:grid-cols-15 md:gap-4'>
      <div className='col-span-7 w-full lg:col-span-5'>
        <SortBy />
      </div>

      <div className='col-span-8 w-full lg:col-span-10'>
        <Search />
      </div>
    </div>
  );
}

export default FactsOperations;
