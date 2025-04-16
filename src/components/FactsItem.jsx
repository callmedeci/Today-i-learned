import { useCreateEditFact } from '@/hooks/useCreateEditFact';
import { categoryColor, formatDate } from '@/lib/utils';
import { useQueryClient } from '@tanstack/react-query';
import {
  Ban,
  Brain,
  CalendarDays,
  LinkIcon,
  ShieldBan,
  ThumbsUp,
} from 'lucide-react';
import { useOptimistic, useTransition } from 'react';
import { Link } from 'react-router';
import Badge from './ui/Badge';
import { motion as m } from 'motion/react';
import { categories } from '@/constant/constants';

function FactsItem({ fact, i }) {
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
  const categoryIcon = categories
    .filter((cat) => cat.label === category)
    .at(0).icon;

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
    <m.li
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: i * 0.05, duration: 0.2 }}
      className='rounded-xl bg-neutral-700 px-3 py-2 text-neutral-100 shadow transition-shadow hover:shadow-md sm:px-5'
    >
      <time className='flex flex-1 items-center gap-1 text-xs text-neutral-400 sm:text-sm'>
        <CalendarDays className='size-5' />
        {formatDate(createdAt)}
      </time>

      <p className='my-3 text-base md:text-lg xl:text-xl'>
        {isDisputed ? (
          <span className='text-s1 flex items-center gap-1 font-semibold text-rose-500 uppercase md:text-base'>
            [<Ban className='size-5' /> disputed]
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

      <div className='flex w-full flex-row items-center justify-end gap-3 text-xs sm:text-base md:text-lg'>
        <span
          className={`${categoryColor(
            category,
          )} font-sono-extra-bold flex items-center gap-1 rounded-full px-2 py-1 uppercase shadow sm:px-3`}
        >
          {categoryIcon}
          {category}
        </span>

        <div className='flex items-center gap-2 text-neutral-100'>
          <Badge onClick={() => handleUpdateVotes('votesInteresting')}>
            {votesInteresting}{' '}
            <ThumbsUp className='size-4 md:size-6 xl:size-7' />
          </Badge>
          <Badge onClick={() => handleUpdateVotes('votesMindblowing')}>
            {votesMindblowing} <Brain className='size-4 md:size-6 xl:size-7' />
          </Badge>
          <Badge onClick={() => handleUpdateVotes('votesFalse')}>
            {votesFalse} <Ban className='size-4 md:size-6 xl:size-7' />
          </Badge>
        </div>
      </div>
    </m.li>
  );
}

export default FactsItem;
