import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function categoryColor(category) {
  if (category === 'technology') return 'bg-sky-700';
  if (category === 'science') return 'bg-green-700';
  if (category === 'finance') return 'bg-rose-600';
  if (category === 'society') return 'bg-amber-600';
  if (category === 'entertainment') return 'bg-indigo-700';
  if (category === 'health') return 'bg-emerald-700';
  if (category === 'history') return 'bg-orange-600';
  if (category === 'news') return 'bg-purple-700';
}

export const formatDate = (str) =>
  Intl.DateTimeFormat('en-US', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  }).format(new Date(str));

export function getUpdatedUserVotes(userVotes = [], factId, typeOfVote) {
  const existingVote = userVotes.find((vote) => vote.factId === factId);

  if (existingVote) {
    return userVotes.map((vote) =>
      vote.factId === factId ? { ...vote, typeOfVote } : vote,
    );
  }

  return [...userVotes, { factId, typeOfVote }];
}

export function getUpdatedVoteCounts(fact, userVote, typeOfVote) {
  const updates = {};

  if (userVote && userVote.typeOfVote !== typeOfVote) {
    updates[userVote.typeOfVote] = fact[userVote.typeOfVote] - 1;
    updates[typeOfVote] = fact[typeOfVote] + 1;
  } else {
    updates[typeOfVote] = fact[typeOfVote] + 1;
  }

  return updates;
}
