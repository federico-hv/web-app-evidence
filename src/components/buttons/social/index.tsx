import { Button, HStack, IconButton } from '@holdr-ui/react';
import { SocialButtonProps } from './social.types';
import { EditProfileDialog } from '../../dialogs';
import { useContext } from 'react';
import { ProfileContext } from '../../../contexts';

function SocialButton({ currentUser }: SocialButtonProps) {
  const { profile } = useContext(ProfileContext);
  return (
    <>
      {currentUser && (
        <>
          {profile.accountType === 'ARTIST' && (
            <HStack gap={3} items='center'>
              <Button
                size={{ '@bp1': 'base', '@bp4': 'base' }}
                label='Follow'
              />
              <IconButton
                variant='ghost'
                size={{ '@bp1': 'base', '@bp4': 'base' }}
                ariaLabel='more'
                icon='more-fill'
              />
            </HStack>
          )}

          {profile.accountType === 'FAN' && (
            <HStack gap={3} items='center'>
              <Button
                size={{ '@bp1': 'base', '@bp4': 'base' }}
                label='Add friend'
              />
              <IconButton
                variant='ghost'
                size={{ '@bp1': 'base', '@bp4': 'base' }}
                ariaLabel='more'
                icon='more-fill'
              />
            </HStack>
          )}

          {profile.accountType === 'PERSONAL' && <EditProfileDialog />}
        </>
      )}
    </>
  );
}
SocialButton.displayName = 'SocialButton';

export default SocialButton;
