import { CreatePostInput, IMAGE_GRID } from '../shared';
import {
  Box,
  Image,
  Center,
  Grid,
  Icon,
  Input,
  Text,
  VStack,
  Button,
  HStack,
} from '@holdr-ui/react';
import {
  SwitchConditional,
  SwitchConditionalCase,
  useToast,
} from '../../../shared';
import { ChangeEvent, useState } from 'react';
import { styled } from '../../../configs';

const MAXIMUM_IMAGES = 4;

type ImageSizes = 1 | 2 | 3 | 4;

function Upload({
  onChange,
}: {
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}) {
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

const StyledVideo = styled('video', {
  position: 'absolute',
  height: '100%',
  width: '100%',
  objectFit: 'cover',
});

function AddMedia({
  remove,
  reset,
}: {
  remove: VoidFunction;
  reset: VoidFunction;
  update: (state: Partial<CreatePostInput>) => void;
}) {
  const [images, setImages] = useState<{ file: File }[]>([]);
  const { openWith } = useToast();

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (
      (event.target.files &&
        images.length + event.target.files.length > 4) ||
      images.length > 4
    ) {
      openWith({
        description:
          'You can only add 1 video or upto 4 images at a time.',
        status: 'info',
      });
      return;
    }

    if (event.target.files && event.target.files.length >= 1) {
      const imageFiles: { file: File }[] = [];

      for (const imageFile of event.target.files) {
        imageFiles.push({ file: imageFile });
      }

      setImages((prev) => [...prev, ...imageFiles]);
    }
  };

  return (
    <VStack
      position='relative'
      border={1}
      borderColor='base200'
      h={300}
      maxHeight={300}
      w='100%'
      radius={2}
    >
      <Box h='full' w='full' radius={2} p={3}>
        <SwitchConditional>
          <SwitchConditionalCase on={images.length === 0}>
            <Center
              role='button'
              radius={2}
              h='100%'
              bgColor='base100'
              fontSize={8}
              position='relative'
            >
              <Icon name='image-add-fill' />
              <Upload onChange={handleOnChange} />
            </Center>
          </SwitchConditionalCase>
          <SwitchConditionalCase on={images.length > 0}>
            <HStack gap={3} p={3} zIndex={10} position='absolute'>
              <Button
                colorTheme='primary400'
                leftIcon='settings-alt-outline'
              >
                Edit
              </Button>
              {images.length < MAXIMUM_IMAGES && (
                <Button colorTheme='primary400' leftIcon='add'>
                  <Upload onChange={handleOnChange} />
                  Add more
                </Button>
              )}
            </HStack>
            <Grid
              gap={3}
              h='100%'
              templateRows='repeat(2, 1fr)'
              templateColumns='repeat(2, 1fr)'
            >
              {images.length > 0 &&
                IMAGE_GRID[images.length as ImageSizes].map(
                  ({ rowSpan, colSpan }, index) => (
                    <Grid.Item
                      rowSpan={rowSpan}
                      colSpan={colSpan}
                      key={`image-grid-${index}`}
                    >
                      <Box radius={2} h='100%' w='100%' overflow='hidden'>
                        <SwitchConditional>
                          <SwitchConditionalCase
                            on={images[index].file.type === 'video/mp4'}
                          >
                            <Box h='100%' w='100%' position='relative'>
                              <StyledVideo controls>
                                <source
                                  src={URL.createObjectURL(
                                    images[index].file,
                                  )}
                                />
                              </StyledVideo>
                            </Box>
                          </SwitchConditionalCase>
                          <SwitchConditionalCase
                            on={images[index].file.type !== 'video/mp4'}
                          >
                            <Image
                              src={URL.createObjectURL(images[index].file)}
                              alt={`Post upload ${index + 1}}`}
                            />
                          </SwitchConditionalCase>
                        </SwitchConditional>
                      </Box>
                    </Grid.Item>
                  ),
                )}
            </Grid>
          </SwitchConditionalCase>
        </SwitchConditional>
      </Box>
      <Center
        onClick={() => {
          remove();
          reset();
        }}
        p={4}
        borderTop={1}
        borderColor='base200'
        _hover={{ backgroundColor: '#f2464617' }}
      >
        <Text weight={500} color='danger'>
          Remove media
        </Text>
      </Center>
    </VStack>
  );
}
AddMedia.displayName = 'AddMedia';

export default AddMedia;
