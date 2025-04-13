import {
  Activity,
  Atom,
  Bitcoin,
  Book,
  Cpu,
  Drama,
  Newspaper,
  Speech,
} from 'lucide-react';

export const categories = [
  {
    label: 'technology',
    value: 'technology',
    icon: <Cpu className='size-4 md:size-7' />,
  },
  {
    label: 'science',
    value: 'science',
    icon: <Atom className='size-4 md:size-7' />,
  },
  {
    label: 'finance',
    value: 'finance',
    icon: <Bitcoin className='size-4 md:size-7' />,
  },
  {
    label: 'society',
    value: 'society',
    icon: <Speech className='size-4 md:size-7' />,
  },
  {
    label: 'entertainment',
    value: 'entertainment',
    icon: <Drama className='size-4 md:size-7' />,
  },
  {
    label: 'health',
    value: 'health',
    icon: <Activity className='size-4 md:size-7' />,
  },
  {
    label: 'history',
    value: 'history',
    icon: <Book className='size-4 md:size-7' />,
  },
  {
    label: 'news',
    value: 'news',
    icon: <Newspaper className='size-4 md:size-7' />,
  },
];
