import { categories } from '@/constant/constants';
import { useCreateEditFact } from '@/hooks/useCreateEditFact';
import { BookText, LinkIcon, RotateCcw } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import Button from './ui/Button';
import Input from './ui/Input';
import { useModalContext } from './ui/Modal';
import Select from './ui/Select';
import Spinner from './ui/Spinner';
import { createFactSchema } from '@/schema';
import { zodResolver } from '@hookform/resolvers/zod';

function CreateFactForm() {
  const { handleSubmit, register, formState, reset, watch, setValue } = useForm(
    {
      resolver: zodResolver(createFactSchema),
    },
  );

  const [textLength, setTextLength] = useState(0);

  const { close } = useModalContext();
  const { createEditFact, isPending } = useCreateEditFact();

  function onSubmit(values) {
    createEditFact(
      { factToEdit: null, newFact: values, options: null },
      {
        onSuccess() {
          toast.success('Your fact created successfully!');
          close();
        },
      },
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='font-sono flex w-full flex-col gap-5'
    >
      <div className='flex w-full gap-2'>
        <Input
          type='text'
          {...register('text')}
          onChange={(e) =>
            setTextLength((text) =>
              Number(e.target.value.length) <= 200
                ? Number(e.target.value.length)
                : text,
            )
          }
          placeholder='Share a fact with the world...'
          className='flex-1'
          disabled={isPending}
          error={formState.errors?.text?.message}
          icon={<BookText className='size-4 md:size-6 xl:size-7' />}
        />

        <span className='font-sono-extra-bold text-lg text-neutral-400'>
          {200 - textLength}
        </span>
      </div>

      <Input
        {...register('source')}
        placeholder='trustworthy source...'
        disabled={isPending}
        error={formState.errors?.source?.message}
        icon={<LinkIcon className='size-4 md:size-6 xl:size-7' />}
      />

      <Select
        placeHolder='Select a category'
        register={register}
        name='category'
        options={categories}
        disabled={isPending}
        watch={watch}
        setValue={setValue}
        error={formState.errors?.category?.message}
      />

      <div className='flex justify-between gap-2 md:gap-8'>
        <Button className='flex-1' disabled={isPending}>
          {isPending ? <Spinner /> : 'post'}
        </Button>

        <Button
          disabled={isPending}
          onClick={reset}
          type='button'
          variant='ghost'
          icon={<RotateCcw className='size-4 md:size-6 xl:size-7' />}
        >
          Reset
        </Button>
      </div>
    </form>
  );
}

export default CreateFactForm;
