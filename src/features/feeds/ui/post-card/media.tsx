import { IMAGE_GRID, ImageSizes, IPostMedia } from '../../shared';
import { Box, Grid } from '@holdr-ui/react';
import { MediaItem } from '../../../../shared';

function Media({ items }: { items: IPostMedia[] }) {
  return (
    <>
      {items.length > 0 && (
        <Box h={350} mt={5}>
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
    </>
  );
}
Media.displayName = 'Media';

export default Media;
