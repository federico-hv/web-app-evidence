import { ReactElement } from 'react';

export interface MediaItemProps {
  url: string;
  type: 'video' | 'image';
  title?: string;
}
