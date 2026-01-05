import { getSupabaseClient } from '@/lib/supabase';
import { Challenge } from '@/types/challenge';

/**
 * Fetch all challenge IDs from the database
 * @returns Array of challenge IDs as strings
 */
export async function fetchAllChallengeIds(): Promise<string[]> {
  const supabase = getSupabaseClient();
  
  const { data, error } = await supabase
    .from('Codecamp')
    .select('id')
    .order('id', { ascending: true });

  if (error) {
    console.error('Error loading challenge IDs:', error);
    return [];
  }

  return data ? data.map((c: { id: number }) => String(c.id)) : [];
}

/**
 * Fetch a specific challenge by ID
 * @param challengeId - The ID of the challenge to fetch
 * @returns Challenge data or null if not found
 */
export async function fetchChallengeById(challengeId: string): Promise<Challenge | null> {
  const supabase = getSupabaseClient();

  const { data, error } = await supabase
    .from('Codecamp')
    .select('*')
    .eq('id', challengeId)
    .single();

  if (error) {
    console.error('Error loading challenge:', error);
    return null;
  }

  return data as Challenge;
}
