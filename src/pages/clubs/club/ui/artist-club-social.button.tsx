import {
  SocialButton,
  useRelationshipStatusInfo,
} from '../../../../features';

interface ArtistClubSocialButtonProps {
  username: string;
}

function ArtistClubSocialButton({
  username,
}: ArtistClubSocialButtonProps) {
  console.log(username);

  const { data } = useRelationshipStatusInfo(username);

  return (
    <SocialButton
      username={username}
      statusInfo={data.relationshipStatusInfo}
    />
  );
}

export default ArtistClubSocialButton;
