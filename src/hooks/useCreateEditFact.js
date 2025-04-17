import { createEditFact as createEditFactApi } from '@/lib/data-service';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

export function useCreateEditFact() {
  const queryClient = useQueryClient();

  const { mutate: createEditFact, isPending } = useMutation({
    mutationFn: ({ factToEdit, newFact, options }) =>
      createEditFactApi(factToEdit, newFact, options),

    onSuccess() {
      queryClient.invalidateQueries(['facts']);
      queryClient.invalidateQueries(['user']);
    },

    onError(error) {
      toast.error(error.message);
    },
  });

  return { createEditFact, isPending };
}
