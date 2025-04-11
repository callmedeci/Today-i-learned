import { categoryColor } from '@/lib/utils';
import Button from './ui/Button';
import { useUrl } from '@/hooks/useUrl';
import { categories } from '@/lib/constants';

function Categories() {
  const { updateUrl, readUrl } = useUrl('category');

  return (
    <ul className='font-sono-extra-bold grid w-full grid-cols-2 gap-4 md:gap-x-7 lg:col-span-3 lg:flex lg:flex-col'>
      <li>
        <Button
          isActive={readUrl === 'all'}
          onClick={() => updateUrl('all')}
          className='w-full'
        >
          All
        </Button>
      </li>
      {categories.map((category) => (
        <li key={category.value}>
          <Button
            isActive={readUrl === category.value}
            onClick={() => updateUrl(category.value)}
            className={`${categoryColor(category.value)} w-full`}
            variant='secondary'
          >
            {category.label}
          </Button>
        </li>
      ))}
    </ul>
  );
}

export default Categories;
