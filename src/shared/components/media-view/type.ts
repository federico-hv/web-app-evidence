import { GenericProps } from 'shared';

interface IWithDisclosure {
  isOpen: boolean;
  onOpen: VoidFunction;
  onClose: VoidFunction;
}

interface IWithoutDisclosure {
  isOpen: never;
  onOpen: never;
  onClose: never;
}

export type MediaViewProps = GenericProps &
  (IWithoutDisclosure | IWithDisclosure);

export type MediaViewSCNames =
  | 'MediaView'
  | 'MediaViewAvatar'
  | 'MediaViewImage'
  | 'MediaViewContent'
  | 'MediaViewTrigger'
  | 'MediaViewSlider';
