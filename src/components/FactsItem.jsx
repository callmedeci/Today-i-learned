import { useCreateEditFact } from '@/hooks/useCreateEditFact';
import { categoryColor, formatDate } from '@/lib/utils';
import { useQueryClient } from '@tanstack/react-query';
import { CalendarDays } from 'lucide-react';
import { useOptimistic, useTransition } from 'react';
import { Link } from 'react-router';
import Badge from './ui/Badge';

function FactsItem({ fact }) {
  const [, startTransition] = useTransition();
  const [optimiticFact, optimisticUpdate] = useOptimistic(
    fact,
    (curFact, typeOfVote) => ({
      ...curFact,
      [typeOfVote]: curFact[typeOfVote] + 1,
    }),
  );

  const queryClient = useQueryClient();
  const { createEditFact } = useCreateEditFact();

  const {
    category,
    createdAt,
    source,
    text,
    votesFalse,
    votesInteresting,
    votesMindblowing,
  } = optimiticFact;

  const isDisputed = votesInteresting + votesMindblowing < votesFalse;

  function handleUpdateVotes(typeOfVote) {
    // Optimistically update first
    startTransition(() => {
      optimisticUpdate(typeOfVote);
    });

    queryClient.setQueryData(['facts'], (oldData) =>
      oldData.map((f) =>
        f.id === fact.id ? { ...f, [typeOfVote]: fact[typeOfVote] + 1 } : f,
      ),
    );

    //Then Supabase
    createEditFact({
      factToEdit: {
        ...fact,
        [typeOfVote]: fact[typeOfVote] + 1,
      },
    });
  }

  return (
    <li className='rounded-xl bg-neutral-700 px-5 py-2 text-neutral-100 shadow transition-shadow hover:shadow-md'>
      <time className='flex flex-1 items-center gap-1 text-xs text-neutral-400 sm:text-sm'>
        <CalendarDays className='size-5' />
        {formatDate(createdAt)}
      </time>

      <p className='my-3 text-lg md:text-xl'>
        {isDisputed ? (
          <span className='text-sm font-semibold text-rose-500 uppercase md:text-base'>
            [⛔ disputed]
          </span>
        ) : null}{' '}
        {text}{' '}
        <Link
          to={source}
          target='_blank'
          className='text-neutral-400 transition-colors duration-300 hover:text-blue-500'
        >
          (source)
        </Link>
      </p>

      <div className='flex w-full flex-row items-center justify-end gap-3 sm:text-lg'>
        <span
          className={`${categoryColor(
            category,
          )} font-sono-extra-bold rounded-full px-3 py-1 uppercase shadow`}
        >
          {category}
        </span>

        <div className='flex gap-2'>
          <Badge onClick={() => handleUpdateVotes('votesInteresting')}>
            {votesInteresting} 👍🏻
          </Badge>
          <Badge onClick={() => handleUpdateVotes('votesMindblowing')}>
            {votesMindblowing} 🤯
          </Badge>
          <Badge onClick={() => handleUpdateVotes('votesFalse')}>
            {votesFalse} ⛔
          </Badge>
        </div>
      </div>
    </li>
  );
}

export default FactsItem;
