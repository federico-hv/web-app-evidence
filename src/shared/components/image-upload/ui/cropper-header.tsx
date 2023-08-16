import { CropperHeaderProps } from '../types/image-upload.types';
import { Button, Heading, HStack } from '@holdr-ui/react';

function CropperHeader({ saveImage, title }: CropperHeaderProps) {
  return (
    <HStack
      items='center'
      flex={1}
      justify='space-between'
      css={{ borderTopLeftRadius: '$3' }}
    >
      <Heading casing='capitalize' id='channels-modal__heading' as='h5'>
        {title}
      </Heading>
      <Button onClick={saveImage} size={{ '@bp1': 'sm', '@bp2': 'base' }}>
        Apply
      </Button>
    </HStack>
  );
}
CropperHeader.displayName = 'CropperHeader';

export default CropperHeader;
