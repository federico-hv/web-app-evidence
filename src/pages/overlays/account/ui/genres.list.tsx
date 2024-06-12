import { usePresetGenres } from '../../../../features';
import { Loader } from '../../../../shared';
import { Grid, GridItem, Heading, VStack } from '@holdr-ui/react';

interface GenresListProps {
  selected: number[];
  onSelectItem: (id: number) => void;
}

function GenresList({ selected, onSelectItem }: GenresListProps) {
  const { data, loading } = usePresetGenres();

  return (
    <Loader h='fit-content' loading={loading}>
      <Grid
        templateColumns='repeat(3, 1fr)'
        className='genre-grid'
        css={{
          '&  > div:nth-child(1)': {
            borderTopLeftRadius: '$2',
          },
          '&  > div:nth-child(3)': {
            borderTopRightRadius: '$2',
          },
          '&  > div:nth-child(4)': {
            borderBottomLeftRadius: '$2',
          },
          '&  > div:nth-child(6)': {
            borderBottomRightRadius: '$2',
          },
          '&  > div:nth-child(3n+2)': {
            borderLeftWidth: 1,
            borderRightWidth: 1,
            borderColor: 'rgba(152, 152, 255, 0.15)',
          },
          '&  > div:nth-child(3n+1)': {
            borderLeftWidth: 1,
            borderColor: 'rgba(152, 152, 255, 0.15)',
          },
          '&  > div:nth-child(3n+3)': {
            borderRightWidth: 1,
            borderColor: 'rgba(152, 152, 255, 0.15)',
          },
          '&  > div:nth-last-child(-n + 3)': {
            borderBottomWidth: 1,
            borderTopWidth: 1,
            borderColor: 'rgba(152, 152, 255, 0.15)',
          },
          '&  > div:nth-child(-n + 3)': {
            borderTopWidth: 1,
            borderColor: 'rgba(152, 152, 255, 0.15)',
          },
        }}
      >
        {data &&
          data.presetGenres.map(({ id, label }) => {
            const isSelected = selected.includes(id);

            return (
              <GridItem
                bgColor={
                  isSelected ? 'rgba(152, 152, 255, 0.15)' : undefined
                }
                onClick={() => onSelectItem(id)}
                key={id}
                css={{
                  userSelect: 'none',
                }}
              >
                <VStack items='center' py={4}>
                  <Heading as='h5' size={2} weight={600}>
                    {label}
                  </Heading>
                </VStack>
              </GridItem>
            );
          })}
      </Grid>
    </Loader>
  );
}
GenresList.displayName = 'GenresList';

export default GenresList;
