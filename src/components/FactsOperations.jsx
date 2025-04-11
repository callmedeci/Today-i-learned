import Search from './Search';
import SortBy from './SortBy';

function FactsOperations() {
  return (
    <div className='my-8 flex w-full flex-col-reverse items-center gap-2 md:grid md:grid-cols-13 md:gap-5'>
      <div className='col-span-5 w-full lg:col-span-3'>
        <SortBy />
      </div>

      <div className='col-span-8 w-full lg:col-span-10'>
        <Search />
      </div>
    </div>
  );
}

export default FactsOperations;
