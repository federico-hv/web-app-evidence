import { SwitchConditional, SwitchConditionalCase } from '../index';
import { Box, Image } from '@holdr-ui/react';
import { MediaItemProps } from './types';
import { StyledVideo } from '../../styles';

function MediaItem({ url, type, title = '' }: MediaItemProps) {
  return (
    <SwitchConditional>
      <SwitchConditionalCase on={type === 'video'}>
        <Box h='100%' w='100%' position='relative'>
          <StyledVideo controls title={title}>
            <source src={url} type='video/mp4' />
          </StyledVideo>
        </Box>
      </SwitchConditionalCase>
      <SwitchConditionalCase on={type === 'image'}>
        <Image src={url} alt={title} />
      </SwitchConditionalCase>
    </SwitchConditional>
  );
}
MediaItem.displayName = 'MediaItem';

export default MediaItem;
