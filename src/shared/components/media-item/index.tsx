import { Box, Image } from '@holdr-ui/react';
import { MediaItemProps } from './types';
import { CenteredImage, StyledVideo } from '../../styles';
import { Fragment } from 'react';

function MediaItem({
  url,
  type,
  title = '',
  blurred = false,
}: MediaItemProps) {
  return (
    <Fragment>
      {type === 'video' && (
        <Box h='100%' w='100%' position='relative'>
          <StyledVideo controls title={title}>
            <source src={url} type='video/mp4' />
          </StyledVideo>
        </Box>
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
              css={{ filter: 'blur(24px)', scale: 2 }}
            />
          )}
          <Box w='full' h='full' position='absolute' t={0} r={0}>
            <Image
              className={CenteredImage()}
              src={url}
              alt={title}
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
