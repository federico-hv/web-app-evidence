import { GenericProps } from '@holdr-ui/react';
import { DocumentNode } from '@apollo/client';
import { ReactElement } from 'react';

export interface QueryGuardProps<U> extends GenericProps {
  name: string;
  query: DocumentNode;
  args: U;
  fallback?: ReactElement;
  loader?: ReactElement;
}
