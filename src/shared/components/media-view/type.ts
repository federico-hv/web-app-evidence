import { GenericProps } from 'shared';

export interface MediaViewProps extends GenericProps {
  isOpen?: boolean;
  onClose?: VoidFunction;
}

export type MediaViewSCNames =
  | 'MediaView'
  | 'MediaViewAvatar'
  | 'MediaViewImage'
  | 'MediaViewContent'
  | 'MediaViewTrigger'
  | 'MediaViewSlider';
