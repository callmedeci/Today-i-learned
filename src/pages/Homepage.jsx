import Categories from '@/components/Categories';
import FactsList from '@/components/FactsList';
import FactsOperations from '@/components/FactsOperations';
import Header from '@/components/Header';

function Homepage() {
  return (
    <>
      <Header />

      <FactsOperations />

      <div className='flex w-full flex-col gap-5 xl:grid xl:grid-cols-13'>
        <Categories />
        <FactsList />
      </div>
    </>
  );
}

export default Homepage;
