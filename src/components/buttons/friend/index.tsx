import { Button, useSwitch } from '@holdr-ui/react';

function FriendButton() {
  const { switchState: isFriends, toggle } = useSwitch(false);
  const text = isFriends ? 'Requested' : 'Befriend';

  return (
    <>
      {isFriends ? (
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
FriendButton.displayName = 'FriendButton';

export default FriendButton;
