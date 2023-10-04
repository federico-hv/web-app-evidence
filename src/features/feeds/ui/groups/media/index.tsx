import { IMAGE_GRID, ImageSizes } from '../../../shared';
import { Box, Grid } from '@holdr-ui/react';
import { MediaItem } from '../../../../../shared';
import { PostMediaProps } from './types';

function PostMedia({ items }: PostMediaProps) {
  return (
    <Box zIndex={5}>
      {items.length > 0 && (
        <Box h={{ '@bp1': 250, '@bp3': 350 }} mt={5}>
          <Grid
            gap={3}
            h='100%'
            templateRows='repeat(2, 1fr)'
            templateColumns='repeat(2, 1fr)'
          >
            {items.length <= 4 &&
              IMAGE_GRID[items.length as ImageSizes].map(
                ({ rowSpan, colSpan }, index) => (
                  <Grid.Item
                    rowSpan={rowSpan}
                    colSpan={colSpan}
                    key={`image-grid-${index}`}
                  >
                    <Box radius={2} h='100%' w='100%' overflow='hidden'>
                      <MediaItem
                        url={items[index].url}
                        type={items[index].type}
                      />
                    </Box>
                  </Grid.Item>
                ),
              )}
          </Grid>
        </Box>
      )}
    </Box>
  );
}
PostMedia.displayName = 'PostMedia';

export default PostMedia;
