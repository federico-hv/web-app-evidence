import { useLocation, useNavigate, useParams } from 'react-router-dom';
import {
  Avatar,
  AvatarBadge,
  Button,
  HStack,
  Text,
  useGeneralContext,
  VStack,
} from '@holdr-ui/react';
import { Fragment } from 'react';
import {
  IProfile,
  SocialButton,
  useCurrentUser,
  useRelationshipStatusInfo,
  UserRelationshipCount,
} from '../../../features';
import { usePreviousLocation } from '../../../shared';
import BioSocialLinks from '../../../features/user/ui/bio-social-links';

function UserProfileHeader() {
  const currentUser = useCurrentUser();
  const navigate = useNavigate();
  const { username } = useParams();
  const { pathname } = useLocation();
  const previousLocation = usePreviousLocation(pathname);

  const { state: profile } = useGeneralContext<IProfile>();

  const { data: statusInfoData } = useRelationshipStatusInfo(
    profile.username,
  );

  if (!username) {
    return <Fragment />;
  }

  return (
    <HStack items='center' gap={3} mb={5}>
      <Avatar
        key={profile.displayName}
        fallbackTextSize={10}
        size={124}
        src={profile.avatar}
        name={profile.displayName}
      >
        {/*<AvatarBadge*/}
        {/*  zIndex={1}*/}
        {/*  size={18}*/}
        {/*  bgColor='success500'*/}
        {/*  r={20}*/}
        {/*  b={15}*/}
        {/*  border={2}*/}
        {/*  borderColor='#1C1C29'*/}
        {/*/>*/}
      </Avatar>
      <VStack flex={1} gap={1}>
        <HStack flex={1} justify='space-between'>
          <VStack gap={1}>
            <VStack>
              <Text size={6}>{profile.displayName}</Text>
            </VStack>
            <UserRelationshipCount username={username} />
          </VStack>
          <HStack>
            {currentUser.username !== username ? (
              <SocialButton
                statusInfo={statusInfoData.relationshipStatusInfo}
                username={username}
              />
            ) : (
              <Button
                onClick={() =>
                  navigate('edit', {
                    state: {
                      previousLocation,
                    },
                  })
                }
                css={{ px: '50px' }}
                colorTheme='purple100'
              >
                Edit Profile
              </Button>
            )}
          </HStack>
        </HStack>
        {profile.socialLinks.length > 0 && (
          <BioSocialLinks links={profile.socialLinks} />
        )}
      </VStack>
    </HStack>
  );
}
UserProfileHeader.displayName = 'UserProfileHeader';

export default UserProfileHeader;
