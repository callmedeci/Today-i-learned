import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createAccount as createAccountApi } from './apiAuth';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router';

export function useCreateAccount() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: createAccount, isPending } = useMutation({
    mutationFn: ({ email, password, fullName }) =>
      createAccountApi(email, password, fullName),

    onSuccess(data) {
      queryClient.setQueriesData(['user'], data.user);

      toast.success('Verification email sent! Check your inbox.');

      navigate('/login', { replace: true });
    },

    onError(error) {
      toast.error(error.message);
    },
  });

  return { createAccount, isPending };
}
