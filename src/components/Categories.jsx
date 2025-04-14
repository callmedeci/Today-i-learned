import { useUrl } from '@/hooks/useUrl';
import { categories } from '@/constant/constants';
import { categoryColor } from '@/lib/utils';
import { motion as m } from 'motion/react';
import Button from './ui/Button';
import { GalleryVerticalEnd } from 'lucide-react';

function Categories() {
  const { updateUrl, readUrl } = useUrl('category');

  return (
    <ul className='font-sono-extra-bold grid w-full grid-cols-2 gap-4 md:gap-x-7 lg:col-span-3 xl:flex xl:flex-col'>
      <m.li initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <Button
          icon={<GalleryVerticalEnd />}
          isActive={readUrl === 'all'}
          onClick={() => updateUrl('all')}
          className='w-full'
        >
          All
        </Button>
      </m.li>
      {categories.map((category, i) => (
        <m.li
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: i * 0.08 }}
          key={category.value}
        >
          <Button
            icon={category.icon}
            isActive={readUrl === category.value}
            onClick={() => updateUrl(category.value)}
            className={`${categoryColor(category.value)} w-full`}
            variant='secondary'
          >
            {category.label}
          </Button>
        </m.li>
      ))}
    </ul>
  );
}

export default Categories;
