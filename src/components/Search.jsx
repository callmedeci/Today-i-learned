import { useUrl } from '@/hooks/useUrl';
import Input from './ui/Input';

function Search() {
  const { updateUrl, readUrl } = useUrl('query');

  return (
    <Input
      defaultValue={readUrl}
      onChange={(e) => updateUrl(e.target.value)}
      variant='secondary'
      placeholder='Search though facts...'
    />
  );
}

export default Search;
