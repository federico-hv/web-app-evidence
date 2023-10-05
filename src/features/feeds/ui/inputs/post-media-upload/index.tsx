import { Box, Input } from '@holdr-ui/react';
import { PostMediaUploadProps } from './types';

function PostMediaUpload({ onChange }: PostMediaUploadProps) {
  return (
    <Box cursor='pointer' as='label' position='absolute' h='100%' w='100%'>
      <Input
        hidden
        multiple
        max={4}
        variant='unstyled'
        type='file'
        accept='image/jpeg,image/png,image/webp,video/mp4'
        onChange={onChange}
        css={{
          position: 'absolute',
          height: '100%',
          width: '100%',
        }}
      />
    </Box>
  );
}
PostMediaUpload.displayName = 'PostMediaUpload';

export default PostMediaUpload;
