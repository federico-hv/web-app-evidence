import { Box, Input } from '@holdr-ui/react';
import { PostMediaUploadProps } from './types';
import { useRef } from 'react';

function PostMediaUpload({ onChange }: PostMediaUploadProps) {
  const ref = useRef<HTMLLabelElement>(null);

  return (
    <Box
      innerRef={ref}
      cursor='pointer'
      as='label'
      position='absolute'
      h='100%'
      w='100%'
      onDragOver={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
      onDrop={onChange}
    >
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
