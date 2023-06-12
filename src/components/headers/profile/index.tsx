import { useLocation } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { IProfile } from 'shared';
import { GET_PROFILE } from 'lib';
import { Head, NotFoundError } from '../../support';
import { Loader, Error } from '../../utility';
import { ProfileHeaderLg, ProfileHeaderSm } from './support';

function ProfileHeader() {
  const username = useLocation().pathname.split('/')[1];

  const { data, loading, error } = useQuery<{ profile: IProfile }>(
    GET_PROFILE,
    {
      variables: {
        username: username,
      },
    },
  );

  return (
    <Error hasError={!!error} errorEl={<NotFoundError />}>
      {data && data.profile && (
        <Head
          prefix=''
          title={`${data.profile.displayName} (@${data.profile.username})`}
          description={data.profile.bio || ''}
        />
      )}
      <Loader loading={loading}>
        {data && data.profile && (
          <>
            <ProfileHeaderSm profile={data.profile} />
            <ProfileHeaderLg profile={data.profile} />
          </>
        )}
      </Loader>
    </Error>
  );
}
ProfileHeader.displayName = 'ProfileHeader';

export default ProfileHeader;
