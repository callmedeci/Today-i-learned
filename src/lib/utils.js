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
