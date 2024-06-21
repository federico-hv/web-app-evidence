import {
  Box,
  CloseButton,
  HStack,
  Image,
  Text,
  VStack,
} from '@holdr-ui/react';
import { HStackProps } from '@holdr-ui/react/dist/components/stack/src/stack.types';

interface MusicReleasePreviewProps {
  image: string;
  name: string;
  artists: string;
  onClick?: VoidFunction;
  loading?: boolean;
}

function MusicReleasePreview({
  image,
  name,
  artists,
  onClick,
  loading,
  ...props
}: MusicReleasePreviewProps & HStackProps) {
  return (
    <HStack
      p={2}
      gap={4}
      justify='space-between'
      radius={1}
      w='250px'
      items='center'
      bgColor='rgba(152, 152, 255, 0.15)'
      {...props}
    >
      <HStack items='center' gap={2}>
        <Box shrink={0}>
          <Image
            radius={1}
            src={image}
            css={{
              size: '40px',
            }}
          />
        </Box>

        <VStack>
          <Text weight={500} noOfLines={1}>
            {name}
          </Text>
          <Text size={1} weight={500} noOfLines={1} color='white700'>
            {artists}
          </Text>
        </VStack>
      </HStack>
      <Box>
        <CloseButton
          loadingText=''
          isLoading={loading}
          onClick={onClick}
          type='button'
          size='sm'
          colorTheme='white500'
        />
      </Box>
    </HStack>
  );
}
MusicReleasePreview.displayName = 'MusicReleasePreview';

export default MusicReleasePreview;
