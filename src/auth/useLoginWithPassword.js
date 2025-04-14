import { loginWithPassword } from '@/auth/apiAuth';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router';

export function useLoginWithPassword() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: login, isPending } = useMutation({
    mutationFn: ({ email, password }) => loginWithPassword(email, password),

    onSuccess(data) {
      queryClient.setQueriesData(['user'], data.user);
      navigate('/', { replace: true });
    },

    onError(error) {
      toast.error(error.message);
    },
  });

  return { login, isPending };
}
