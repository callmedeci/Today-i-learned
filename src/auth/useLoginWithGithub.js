import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router';
import { loginWithGithub as loginWithGithubApi } from './apiAuth';

export function useLoginWithGithub() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: loginWithGithub, isPending } = useMutation({
    mutationFn: loginWithGithubApi,

    onSuccess(data) {
      queryClient.setQueriesData(['user'], data.user);
      navigate('/', { replace: true });
    },

    onError(error) {
      toast.error(error.message);
    },
  });

  return { loginWithGithub, isPending };
}
