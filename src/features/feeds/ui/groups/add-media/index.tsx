import { IMAGE_GRID, ImageSizes } from '../../../shared';
import {
  Box,
  Center,
  Grid,
  VStack,
  Button,
  HStack,
  Icon,
} from '@holdr-ui/react';
import { FileUtility, MediaItem, useToast } from '../../../../../shared';
import { Fragment, useState } from 'react';
import { PostMediaUpload } from '../../inputs';
import { AddMediaProps } from './types';

const ONE_MB = 1024 * 1024;

function AddMedia({
  as = <Icon color='white500' size='xl' name='image-add-fill' />,
  update,
}: AddMediaProps) {
  const Maximum = {
    images: 4,
    videos: 1,
  };
  const [media, setMedia] = useState<{ file: File }[]>([]);
  const [canAddMore, setCanAddMore] = useState(true);
  const { openWith } = useToast();

  const handleOnChange = (event: any) => {
    event.preventDefault();
    event.stopPropagation();

    let files: File[];

    if (event.dataTransfer?.files) {
      // files retrieved from a drag image upload
      files = event.dataTransfer.files;
    } else if (event.target.files) {
      // files retrieved from an image upload
      files = event.target.files;
    } else {
      return;
    }

    // merge new files and currently stored files
    const allFiles = [...media.map((item) => item.file), ...files];

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

    if (
      allFiles.length === 1 &&
      FileUtility.ofType(allFiles[0].type, 'video') &&
      allFiles[0].size > 25 * ONE_MB
    ) {
      openWith({
        description: 'The video should be less than 25MB in size.',
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

          if (file.size > 5 * ONE_MB) {
            openWith({
              description: 'All images should be less than 5MB in size.',
              status: 'info',
            });
          }
          return;
        }
      }
    }

    if (allFiles.length <= Maximum.images) {
      const mediaFiles: { file: File }[] = [];

      for (const mediaFile of files) {
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
      h='202px'
      w='100%'
      radius={1}
      css={{
        backgroundColor: 'rgba(26, 26, 41, 0.75)',
      }}
    >
      <Box h='full' w='full' radius={2}>
        {media.length < 1 ? (
          <Center role='button' h='100%' w='100%' position='relative'>
            {as}
            <PostMediaUpload onChange={handleOnChange} />
          </Center>
        ) : (
          <Fragment>
            <HStack gap={3} p={3} zIndex={10} position='absolute'>
              <Button
                size={{ '@bp1': 'sm', '@bp3': 'base' }}
                colorTheme='white50'
                leftIcon='settings-alt-outline'
              >
                Edit
              </Button>
              {canAddMore && (
                <Button
                  size={{ '@bp1': 'sm', '@bp3': 'base' }}
                  colorTheme='white50'
                  leftIcon='add'
                >
                  <PostMediaUpload onChange={handleOnChange} />
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
                        {FileUtility.getType(media[index].file.type) ===
                          'image' && (
                          <Box // block image from showing media view
                            borderColor='base400'
                            position='absolute'
                            h='100%'
                            w='100%'
                            zIndex={5}
                          />
                        )}
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
          </Fragment>
        )}
      </Box>
    </VStack>
  );
}
AddMedia.displayName = 'AddMedia';

export default AddMedia;
