import { useProfile } from '../../../lib';
import { Head, NotFoundError } from '../../support';
import { Loader, Error } from '../../utility';
import { ProfileHeaderLg, ProfileHeaderSm } from './support';
import { ProfileContext } from '../../../contexts';

function ProfileHeader() {
  const { data, loading, error } = useProfile();

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
          <ProfileContext.Provider value={{ profile: data.profile }}>
            <ProfileHeaderSm profile={data.profile} />
            <ProfileHeaderLg profile={data.profile} />
          </ProfileContext.Provider>
        )}
      </Loader>
    </Error>
  );
}
ProfileHeader.displayName = 'ProfileHeader';

export default ProfileHeader;
