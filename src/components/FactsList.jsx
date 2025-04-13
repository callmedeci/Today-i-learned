import { motion as m } from 'motion/react';
import { useFacts } from '@/hooks/useFacts';
import FactsItem from './FactsItem';
import Loading from './ui/Loading';

function FactsList() {
  const [facts, isPending] = useFacts();

  if (isPending) return <Loading />;

  return (
    <m.ul className='scrollbar flex h-132 flex-col gap-5 overflow-y-scroll rounded-xl shadow lg:col-span-10'>
      {facts.length === 0 ? (
        <li className='flex max-w-xs items-center gap-1 self-center text-center text-lg font-semibold text-neutral-300'>
          No facts found for related category! Try other ones ;)
        </li>
      ) : (
        facts.map((fact) => <FactsItem key={fact.id} fact={fact} />)
      )}
    </m.ul>
  );
}

export default FactsList;
