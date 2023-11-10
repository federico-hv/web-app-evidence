import { useContext } from 'react';
import { PopoverContext } from '../../contexts';

export function usePopoverContext() {
  return useContext(PopoverContext);
}
