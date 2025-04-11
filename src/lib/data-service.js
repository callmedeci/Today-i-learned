import { supabase } from './supabase';

export async function getFacts() {
  const { data, error } = await supabase.from('facts').select('*');

  if (error) throw new Error('Failed to fetch facts!');

  return data;
}

export async function createNewFact(fact) {
  const { data, error } = await supabase
    .from('facts')
    .insert([fact])
    .select()
    .single();

  if (error) throw new Error('Failed to create a new fact');

  return data;
}

export async function createEditFact(factToEdit, newFact) {
  let query = supabase.from('facts');

  if (factToEdit) query = query.update(factToEdit).eq('id', factToEdit.id);

  if (newFact) query = query.insert([newFact]);

  const { data, error } = await query.select().single();

  if (error) throw new Error('Failed to create/update fact');

  return data;
}
