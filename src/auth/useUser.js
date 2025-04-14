import { getCurrentUser } from '@/auth/apiAuth';
import { useQuery } from '@tanstack/react-query';

export function useUser() {
  const { data: user, isPending } = useQuery({
    queryFn: getCurrentUser,
    queryKey: ['user'],
  });

  return { user, isPending };
}
