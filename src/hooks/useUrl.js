import { useSearchParams } from 'react-router';

export function useUrl(name) {
  const [searchParams, setSearchParams] = useSearchParams();

  function updateUrl(value) {
    searchParams.set(name, value);

    if (!searchParams.get(name)) searchParams.delete(name);

    setSearchParams(searchParams);
  }

  const readUrl = searchParams.get(name);

  return { readUrl, updateUrl };
}
