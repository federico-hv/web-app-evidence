import {
  MediaView,
  MediaViewContent,
  MediaViewImage,
  MediaViewTrigger,
} from '../index';
import { Box, Image } from '@holdr-ui/react';
import { MediaItemProps } from './types';
import { StyledVideo } from '../../styles';
import { Fragment } from 'react';

function MediaItem({ url, type, title = '' }: MediaItemProps) {
  console.log({ url });
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
        <MediaView>
          <MediaViewTrigger>
            <Image src={url} alt={title} />
          </MediaViewTrigger>
          <MediaViewContent>
            <MediaViewImage size='80%' src={url} alt={title} />
          </MediaViewContent>
        </MediaView>
      )}
    </Fragment>
  );
}
MediaItem.displayName = 'MediaItem';

export default MediaItem;
