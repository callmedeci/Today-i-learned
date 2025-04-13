import { useCreateEditFact } from '@/hooks/useCreateEditFact';
import { categories } from '@/lib/constants';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Button from './ui/Button';
import Input from './ui/Input';
import { useModalContext } from './ui/Modal';
import Spinner from './ui/Spinner';
import toast from 'react-hot-toast';
import Select from './ui/Select';

function CreateFactForm() {
  const [textLength, setTextLength] = useState(0);

  const { handleSubmit, register, formState, reset } = useForm();
  const { close } = useModalContext();

  const { createEditFact, isPending } = useCreateEditFact();

  function onSubmit(values) {
    createEditFact(
      { factToEdit: null, newFact: values },
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
          {...register('text', {
            required: { value: true, message: 'Fact required' },
            minLength: {
              value: 15,
              message: 'Too short (min 15 chars)',
            },
            maxLength: {
              value: 200,
              message: 'Too long (max 200 chars)',
            },
          })}
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
          maxLength={200}
          error={formState.errors?.text?.message}
        />

        <span className='font-sono-extra-bold text-lg text-neutral-400'>
          {200 - textLength}
        </span>
      </div>

      <Input
        type='url'
        {...register('source', {
          required: { value: true, message: 'Source required' },
          pattern: {
            value: /^(https?:\/\/|www\.).+/,
            message: 'Enter a valid URL',
          },
        })}
        disabled={isPending}
        placeholder='trustworthy source...'
        error={formState.errors?.source?.message}
      />

      <Select
        {...register('category', {
          required: { value: true, message: 'Category required' },
          validate: (value) =>
            value !== 'Choose Category:' || 'Pick a category',
        })}
        defaultValue='Choose Category:'
        options={categories}
        disabled={isPending}
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
        >
          Reset
        </Button>
      </div>
    </form>
  );
}

export default CreateFactForm;
