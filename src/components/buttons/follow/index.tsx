import { Button, useSwitch } from '@holdr-ui/react';

function FollowButton() {
  const { switchState: isFollowing, toggle } = useSwitch(false);
  const text = isFollowing ? 'Following' : 'Follow';

  return (
    <>
      {isFollowing ? (
        <Button variant='outline' onClick={toggle} colorTheme='base700'>
          {text}
        </Button>
      ) : (
        <Button onClick={toggle} colorTheme='primary400'>
          {text}
        </Button>
      )}
    </>
  );
}
FollowButton.displayName = 'FollowButton';

export default FollowButton;
