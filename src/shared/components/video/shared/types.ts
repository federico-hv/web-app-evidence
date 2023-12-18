import { BoxProps } from '@holdr-ui/react/dist/components/box/src/box.types';
import { ImageProps } from '@holdr-ui/react/dist/components/image/src/image.types';
import { HStackProps } from '@holdr-ui/react/dist/components/stack/src/stack.types';
import { GenericProps } from 'shared';

export interface VideoProps extends BoxProps {
  playsInline: boolean;
  autoPlay: boolean;
  interactive: boolean;
  volumeLevel: number; // should be between 0 and 1
  speed: VideoSpeed;
  src: string;
}

export interface IVideoContext {
  paused: boolean;
  muted: boolean;
  fullscreen: boolean;
  togglePause: VoidFunction;
  toggleMute: VoidFunction;
  toggleFullscreen: VoidFunction;
}

export interface VideoSliderCommonProps {
  primaryColor?: string; // 'ThemeColor'
  secondaryColor?: string; // 'ThemeColor'
}
export type VideoSCNames =
  | 'VideoProgressSlider'
  | 'VideoThumbnail'
  | 'VideoPause'
  | 'VideoControls';

export type VideoControlsSCNames =
  | 'VideoPausePlay'
  | 'VideoVolume'
  | 'VideoSettings'
  | 'VideoFullScreen';

export type VideoVolumeProps = BoxProps;
export type VideoPauseProps = ImageProps;
export type VideoSettingsProps = BoxProps;
export type VideoPausePlayProps = BoxProps;
export type VideoThumbnailProps = GenericProps;
export type VideoProgressSliderProps = BoxProps;
export type VideoControlsProps = GenericProps & HStackProps;

export type VideoSpeed = 0.5 | 0.75 | 1 | 1.5 | 2;
