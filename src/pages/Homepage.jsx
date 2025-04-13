import Categories from '@/components/Categories';
import FactsList from '@/components/FactsList';
import FactsOperations from '@/components/FactsOperations';
import Header from '@/components/Header';

function Homepage() {
  return (
    <section className='mx-auto flex max-w-7xl flex-col px-2 py-5'>
      <Header />

      <FactsOperations />

      <div className='flex w-full flex-col gap-5 xl:grid xl:grid-cols-13'>
        <Categories />
        <FactsList />
      </div>
    </section>
  );
}

export default Homepage;
