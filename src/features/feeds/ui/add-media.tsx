import { CreatePostInput, IMAGE_GRID, ImageSizes } from '../shared';
import {
  Box,
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
  FileUtility,
  MediaItem,
  SwitchConditional,
  SwitchConditionalCase,
  useToast,
} from '../../../shared';
import { ChangeEvent, useState } from 'react';

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

function AddMedia({
  update,
  remove,
  reset,
}: {
  remove: VoidFunction;
  reset: VoidFunction;
  update: (state: Partial<CreatePostInput>) => void;
}) {
  const Maximum = {
    images: 4,
    videos: 1,
  };
  const [media, setMedia] = useState<{ file: File }[]>([]);
  const [canAddMore, setCanAddMore] = useState(true);
  const { openWith } = useToast();

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;

    // merge new files and currently stored files
    const allFiles = [
      ...media.map((item) => item.file),
      ...event.target.files,
    ];

    //TODO: Ensure that the files are size limited:
    // 1. 5MB per image max
    // 2. 25MB per video max

    // ensure that all files are not more than max
    if (allFiles.length > Maximum.images) {
      openWith({
        description:
          'You can only add 1 video or upto 4 images at a time.',
        status: 'info',
      });
      return;
    }

    if (allFiles.length > 1) {
      // images only
      // check if file interface are image only
      for (const file of allFiles) {
        if (!FileUtility.ofType(file.type, 'image')) {
          openWith({
            description:
              'You can only add 1 video or upto 4 images at a time.',
            status: 'info',
          });
          return;
        }
      }
    }

    if (allFiles.length <= Maximum.images) {
      const mediaFiles: { file: File }[] = [];

      for (const mediaFile of event.target.files) {
        mediaFiles.push({ file: mediaFile });
      }

      setMedia((prev) => {
        const newMedia = [...prev, ...mediaFiles];

        update({ media: newMedia });

        return newMedia;
      });
    }

    // disable additional media if:
    // - all files exceed maximum
    // - the file is a video file
    if (
      allFiles.length === Maximum.images ||
      (allFiles.length === 1 &&
        FileUtility.ofType(allFiles[0].type, 'video'))
    ) {
      setCanAddMore(() => false);
    }
  };

  return (
    <VStack
      position='relative'
      border={1}
      borderColor='base200'
      minHeight={350}
      w='100%'
      radius={4}
    >
      <Box h='full' w='full' radius={2} p={3}>
        <SwitchConditional>
          <SwitchConditionalCase on={media.length === 0}>
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
          <SwitchConditionalCase on={media.length > 0}>
            <HStack gap={3} p={3} zIndex={10} position='absolute'>
              <Button
                colorTheme='primary400'
                leftIcon='settings-alt-outline'
              >
                Edit
              </Button>
              {canAddMore && (
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
              {media.length > 0 &&
                media.length <= Maximum.images &&
                IMAGE_GRID[media.length as ImageSizes].map(
                  ({ rowSpan, colSpan }, index) => (
                    <Grid.Item
                      rowSpan={rowSpan}
                      colSpan={colSpan}
                      key={`image-grid-${index}`}
                    >
                      <Box
                        radius={2}
                        h='100%'
                        w='100%'
                        overflow='hidden'
                        position='relative'
                      >
                        <Box // block image from showing media view
                          borderColor='base400'
                          position='absolute'
                          h='100%'
                          w='100%'
                          zIndex={50}
                        />
                        <MediaItem
                          url={URL.createObjectURL(media[index].file)}
                          type={FileUtility.getType(
                            media[index].file.type,
                          )}
                          title={`Post upload ${index + 1}}`}
                        />
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
