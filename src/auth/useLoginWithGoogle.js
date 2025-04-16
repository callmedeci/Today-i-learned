import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router';
import { loginWithGoogle as loginWithGoogleApi } from './apiAuth';

export function useLoginWithGoogle() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: loginWithGoogle, isPending } = useMutation({
    mutationFn: loginWithGoogleApi,

    onSuccess(data) {
      queryClient.setQueriesData(['user'], data.user);
      navigate('/', { replace: true });
    },

    onError(error) {
      toast.error(error.message);
    },
  });

  return { loginWithGoogle, isPending };
}
