import { supabase } from './supabase';

export async function getFacts() {
  const { data, error } = await supabase.from('facts').select('*');

  if (error) throw new Error('Failed to fetch facts!');

  return data;
}

export async function createEditFact(factToEdit, newFact, options) {
  const { error: updateError } = await supabase.auth.updateUser({
    data: { ...options },
  });

  if (updateError) throw new Error('Failed to update fact');

  let query = supabase.from('facts');

  if (factToEdit) query = query.update(factToEdit).eq('id', factToEdit.id);

  if (newFact) query = query.insert([newFact]);

  const { data, error } = await query.select().single();

  if (error) throw new Error('Failed to create/update fact');

  return data;
}
