import { useFetchFacts } from './useFetchFacts';
import { useUrl } from './useUrl';

export function useFacts() {
  const { facts, isPending } = useFetchFacts();
  const { readUrl: activeCategory } = useUrl('category');
  const { readUrl: activeSort } = useUrl('sortBy');
  const { readUrl: query } = useUrl('query');

  if (isPending) return [facts, isPending];

  //Filter Facts by category
  const category = activeCategory ?? 'all';
  const filteredFacts =
    category === 'all'
      ? facts
      : facts.filter((fact) => fact.category === category);

  //Sort facts
  const sortBy = activeSort ?? 'createdAt-desc';
  const [field, direction] = sortBy.split('-');
  const modifier = direction === 'asc' ? 1 : -1;

  const sortedFacts = filteredFacts.sort((a, b) => {
    const [value1, value2] = [a[field], b[field]];

    //Check if values are tpye of dates (timestamp / Date object)
    const isDate =
      (typeof value1 === 'string' && !isNaN(Date.parse(value1))) ||
      value1 instanceof Date;

    if (isDate) return (new Date(value1) - new Date(value2)) * modifier;

    return (value1 - value2) * modifier;
  });

  const searchResults = !query
    ? sortedFacts
    : sortedFacts.filter((fact) =>
        fact.text.toLowerCase().includes(query.toLowerCase()),
      );

  return [searchResults, isPending];
}
