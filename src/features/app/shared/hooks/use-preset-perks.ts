import { useQuery, useSuspenseQuery } from '@apollo/client';
import { GET_PRESET_PERKS } from '../../queries';
import { IPerk } from '../../../clubs';

export function usePresetPerks() {
  return useQuery<{ presetPerks: IPerk[] }>(GET_PRESET_PERKS);
}
export function useSuspensePresetPerks() {
  return useSuspenseQuery<{ presetPerks: IPerk[] }>(GET_PRESET_PERKS);
}
