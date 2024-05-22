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
import { useUpdateUserGenres } from '../../../../features/user/shared/hooks/use-update-user-genres';
import { useUserGenres } from '../../../../features';
import { difference } from 'lodash';

function FanGenresPage() {
  const navigate = useNavigate();
  const previousLocation = usePreviousLocation('/');

  const { data, loading } = useUserGenres();

  const { loading: updating, updateGenres } = useUpdateUserGenres();

  const goToRecommended = () =>
    navigate(makePath([Paths.setupFanAccount, 'recommended']), {
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
            What do you like to listen to?
          </TextGroupHeading>
          <TextGroupSubheading
            weight={300}
            size='16px'
            align='center'
            css={{ lineHeight: '115%' }}
          >
            Select your favorite genres of music from the options below.
            You can choose multiple genres
          </TextGroupSubheading>
        </TextGroup>

        {data && (
          <GenresForm
            loading={updating}
            data={data.userGenres.map(({ id }) => id)}
            onSubmit={async (selected) => {
              // check for changes
              const diff = difference(
                selected,
                data.userGenres.map(({ id }) => id),
              );

              // call update if there are changes
              if (diff.length > 0) {
                await updateGenres(selected).then(goToRecommended);
              }
              // skip updating if there are no changes
              goToRecommended();
            }}
          />
        )}
      </VStack>
    </Loader>
  );
}
FanGenresPage.displayName = 'FanGenresPage';

export default FanGenresPage;
