import { Box, Image } from '@holdr-ui/react';
import { MediaItemProps } from './types';
import { Fragment } from 'react';
import Video, {
  VideoControls,
  VideoFullScreen,
  VideoPause,
  VideoPausePlay,
  VideoProgressSlider,
  VideoSettings,
  VideoThumbnail,
  VideoVolume,
} from '../video';
import { Asset } from '../../constants';

function MediaItem({
  url,
  type,
  title = '',
  blurred = false,
}: MediaItemProps) {
  return (
    <Fragment>
      {type === 'video' && (
        <Video
          playsInline={false}
          autoPlay={false}
          interactive={false}
          volumeLevel={0}
          speed={1}
          src={url}
        >
          <VideoPause />
          <VideoProgressSlider />
          <VideoThumbnail />
          <VideoControls>
            <VideoPausePlay />
            <VideoSettings />
            <VideoVolume />
            <VideoFullScreen />
          </VideoControls>
        </Video>
      )}
      {type === 'image' && (
        <Box
          position='relative'
          w='full'
          h='full'
          radius={4}
          overflow='hidden'
        >
          {blurred && (
            <Image
              fit='cover'
              src={url}
              alt={title}
              fallbackSrc={Asset.Image.DarkPlaceholder}
              css={{ filter: 'blur(24px)', scale: 2 }}
            />
          )}
          <Box w='full' h='full' position='absolute' t={0} r={0}>
            <Image
              src={url}
              alt={title}
              fallbackSrc={Asset.Image.DarkPlaceholder}
              fit='contain'
            />
          </Box>
        </Box>
      )}
    </Fragment>
  );
}

MediaItem.displayName = 'MediaItem';

export default MediaItem;
