import { useLocation } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { Box } from '@holdr-ui/react';
import { IProfile } from 'shared';
import { GET_PROFILE } from 'lib';
import { Error, Loader } from 'components';
import { ArtistProfileTab, GeneralUserProfileTab } from './support';

function ProfileContent() {
  const username = useLocation().pathname.split('/')[1];

  // should actually get account posts (role is included)
  const { data, loading, error } = useQuery<{ profile: IProfile }>(
    GET_PROFILE,
    {
      variables: {
        username: username,
      },
    },
  );
  return (
    <Error hasError={!!error} errorEl={<></>}>
      <Loader loading={loading}>
        {data && data.profile && (
          <Box mt={{ '@bp1': 5, '@bp3': 1 }}>
            {data.profile.username === 'ARTIST' ? (
              <ArtistProfileTab />
            ) : (
              <GeneralUserProfileTab />
            )}
          </Box>
        )}
      </Loader>
    </Error>
  );
}
ProfileContent.displayName = 'ProfileContent';

export default ProfileContent;
