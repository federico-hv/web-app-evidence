import {
  useArtistGenres,
  useCurrentArtist,
  useUpdateArtistGenres,
} from '../../../../features';
import { useNavigate } from 'react-router-dom';
import {
  Loader,
  makePath,
  Paths,
  TextGroup,
  TextGroupHeading,
  TextGroupSubheading,
  usePreviousLocation,
} from '../../../../shared';
import { VStack } from '@holdr-ui/react';
import { GenresForm } from '../ui';
import { difference } from 'lodash';

function ArtistGenresPage() {
  const artist = useCurrentArtist();

  const navigate = useNavigate();
  const previousLocation = usePreviousLocation('/');

  const { loading, data } = useArtistGenres(artist?.id || '');

  const { loading: updating, updateGenres } = useUpdateArtistGenres();

  const goToRecommended = () =>
    navigate(makePath([Paths.setupAccount, 'artist', 'recommended']), {
      state: {
        previousLocation: previousLocation,
      },
    });

  return (
    <Loader loading={loading}>
      <VStack h='100%' justify='space-between'>
        <TextGroup>
          <TextGroupHeading
            weight={600}
            size='36px'
            align='center'
            css={{ lineHeight: '115%' }}
          >
            How would you describe your music?
          </TextGroupHeading>
          <TextGroupSubheading
            weight={300}
            size='16px'
            align='center'
            css={{ lineHeight: '115%' }}
          >
            Select the genres that best align with your music
          </TextGroupSubheading>
        </TextGroup>

        {data && (
          <GenresForm
            loading={updating}
            data={data.artistGenres.map(({ id }) => id)}
            onSubmit={async (selected) => {
              const previouslySelected = data.artistGenres.map(
                ({ id }) => id,
              );

              // check for changes
              const diff = [
                ...difference(previouslySelected, selected),
                ...difference(selected, previouslySelected),
              ];

              // call update if there are changes
              if (diff.length > 0) {
                await updateGenres(selected).then(goToRecommended);
              } else {
                goToRecommended();
              }
            }}
          />
        )}
      </VStack>
    </Loader>
  );
}
ArtistGenresPage.displayName = 'ArtistGenresPage';

export default ArtistGenresPage;
