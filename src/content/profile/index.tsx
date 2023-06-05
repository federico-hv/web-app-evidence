import { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { Box } from '@holdr-ui/react';
import { AuthContext } from 'contexts';
import { IProfile } from 'shared';
import { GET_PROFILE } from 'lib';
import { Error, Loader } from 'components';
import { ArtistProfileTab, GeneralUserProfileTab } from './support';

function ProfileContent() {
  const currentUser = useContext(AuthContext).currentUser;
  const username = useLocation().pathname.split('/')[1];

  const { data, loading, error } = useQuery<{ profile: IProfile }>(
    GET_PROFILE,
    {
      variables: {
        payload: { username: username, id: currentUser?.id || 'id' },
      },
    },
  );
  return (
    <Error hasError={!!error} errorEl={<></>}>
      <Loader loading={loading}>
        {data && data.profile && (
          <Box mt={{ '@bp1': 5, '@bp3': 1 }}>
            {data.profile.accountType === 'ARTIST' ? (
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
