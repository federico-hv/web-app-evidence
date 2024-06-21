import { ReactNode, Ref } from 'react';
import { IconName } from '@holdr-ui/react/dist/shared/types';
import { ExternalLinkTypeEnum } from '../constants';

export interface GenericProps {
  innerRef?: Ref<any>;
  children?: ReactNode;
  onClick?: VoidFunction;
}

export interface IDate {
  month: string;
  day: string;
  year: string;
}

export interface IReturnMany<T> {
  // TODO: Reset this
  count: number;
  data: T[];
}

export interface IOffsetPaginationOption {
  limit: number;
  offset: number;
}

export interface IOffsetPage<T> {
  next: IOffsetPaginationOption;
  previous: IOffsetPaginationOption;
  total: number;
  data: T[];
}

export interface LabelWithIcon {
  label: string;
  icon: IconName;
}

export interface IExternalLink {
  type: ExternalLinkTypeEnum;
  label?: string;
  url: string;
  id: number;
}

export interface IAnnouncement {
  description: string;
  createdAt: Date;
  id: number;
}

export interface ICollaborator {
  id: number;
  name: string;
  accountId?: string;
}
