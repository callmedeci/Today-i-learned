import { useUrl } from '@/hooks/useUrl';
import Select from './ui/Select';

const options = [
  { label: 'Oldest first', value: 'createdAt-asc' },
  { label: 'Newest first', value: 'createdAt-desc' },
  { label: 'Least interesting first', value: 'votesInteresting-asc' },
  { label: 'Most interesting first', value: 'votesInteresting-desc' },
  { label: 'Least false first', value: 'votesFalse-asc' },
  { label: 'Most false first', value: 'votesFalse-desc' },
  { label: 'Least mind-blowing first', value: 'votesMindblowing-asc' },
  { label: 'Most mind-blowing first', value: 'votesMindblowing-desc' },
];

function SortBy() {
  const { readUrl, updateUrl } = useUrl('sortBy');
  const sortBy = readUrl || '';

  function handleChange(e) {
    updateUrl(e.target.value);
  }

  return (
    <Select
      variant='secondary'
      options={options}
      value={sortBy}
      onChange={handleChange}
    />
  );
}

export default SortBy;
