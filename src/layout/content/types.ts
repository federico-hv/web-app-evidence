import { MutableRefObject, ReactNode } from 'react';

export interface BaseContentLayoutProps {
  innerRef?: MutableRefObject<HTMLElement | undefined>;
  children?: ReactNode;
  hideScrollbar?: boolean;
}
export type ContentLayoutSCNames =
  | 'ContentLayoutMain'
  | 'ContentLayoutAside';
