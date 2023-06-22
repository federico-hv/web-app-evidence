import { ReactNode } from 'react';

export interface SwitchConditionalProps {
  children?: ReactNode;
}

export interface SwitchConditionalCaseProps
  extends SwitchConditionalProps {
  on?: boolean;
}
