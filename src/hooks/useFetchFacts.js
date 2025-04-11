import { useQuery } from '@tanstack/react-query';
import { getFacts } from '../lib/data-service';

export function useFetchFacts() {
  const {
    data: facts,
    error,
    isPending,
  } = useQuery({
    queryKey: ['facts'],
    queryFn: getFacts,
  });

  return { facts, error, isPending };
}
