import { categories } from '@/constant/constants';
import { useCreateEditFact } from '@/hooks/useCreateEditFact';
import {
  categoryColor,
  formatDate,
  getUpdatedUserVotes,
  getUpdatedVoteCounts,
} from '@/lib/utils';
import { useQueryClient } from '@tanstack/react-query';
import { Ban, Brain, CalendarDays, ThumbsUp } from 'lucide-react';
import { motion as m } from 'motion/react';
import { startTransition, useOptimistic } from 'react';
import { Link } from 'react-router';
import Badge from './ui/Badge';

function FactsItem({ fact, i, user }) {
  const queryClient = useQueryClient();
  const { createEditFact } = useCreateEditFact();

  const [optimiticFact, optimisticUpdateFact] = useOptimistic(
    fact,
    (curFact, typeOfVote) => {
      const userVote = user.user_metadata.userVotes?.find(
        (vote) => vote.factId === curFact.id,
      );
      return {
        ...curFact,
        ...getUpdatedVoteCounts(curFact, userVote, typeOfVote),
      };
    },
  );
  const [optimiticUser, optimisticUpdateUser] = useOptimistic(
    user,
    (user, typeOfVote) => {
      const updatedVotes = getUpdatedUserVotes(
        user.user_metadata.userVotes,
        fact.id,
        typeOfVote,
      );

      return {
        ...user,
        user_metadata: {
          ...user.user_metadata,
          userVotes: updatedVotes,
        },
      };
    },
  );

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

  const userVotes = optimiticUser.user_metadata.userVotes ?? [];
  const userVote = userVotes.find((vote) => vote.factId === fact.id);
  const isInteresting = userVote?.typeOfVote === 'votesInteresting';
  const isMindblowing = userVote?.typeOfVote === 'votesMindblowing';
  const isFalse = userVote?.typeOfVote === 'votesFalse';

  function handleUpdateVotes(typeOfVote) {
    if (typeOfVote === userVote.typeOfVote) return;

    const factId = fact.id;

    const updatedFact = {
      ...fact,
      ...getUpdatedVoteCounts(fact, userVote, typeOfVote),
    };

    const updatedUserVotes = getUpdatedUserVotes(userVotes, factId, typeOfVote);

    startTransition(() => {
      optimisticUpdateFact(typeOfVote);
      optimisticUpdateUser(typeOfVote);
    });

    queryClient.setQueryData(['facts'], (oldFacts) =>
      oldFacts.map((f) => (f.id === factId ? updatedFact : f)),
    );

    queryClient.setQueryData(['user'], (oldUser) => ({
      ...oldUser,
      user_metadata: {
        ...oldUser.user_metadata,
        userVotes: updatedUserVotes,
      },
    }));

    createEditFact({
      factToEdit: updatedFact,
      options: {
        userVotes: updatedUserVotes,
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

        <div className='flex items-center gap-2 text-neutral-400'>
          <Badge
            isActive={isInteresting}
            onClick={() => handleUpdateVotes('votesInteresting')}
          >
            {votesInteresting}
            <ThumbsUp className='size-4 transition-all duration-300 md:size-6 xl:size-7' />
          </Badge>
          <Badge
            isActive={isMindblowing}
            onClick={() => handleUpdateVotes('votesMindblowing')}
          >
            {votesMindblowing} <Brain className='size-4 md:size-6 xl:size-7' />
          </Badge>
          <Badge
            isActive={isFalse}
            onClick={() => handleUpdateVotes('votesFalse')}
          >
            {votesFalse} <Ban className='size-4 md:size-6 xl:size-7' />
          </Badge>
        </div>
      </div>
    </m.li>
  );
}

export default FactsItem;
