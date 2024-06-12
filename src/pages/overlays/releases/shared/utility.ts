import { StepNumber } from './types';

/**
 * Return the step number of the  associated step name
 * @param stepName
 */
export function getStepNumber(stepName: string): StepNumber {
  switch (stepName) {
    case 'get-started':
      return 0;
    case 'connection':
      return 1;
    case 'artist-selection':
      return 2;
    default:
      return 0;
  }
}
