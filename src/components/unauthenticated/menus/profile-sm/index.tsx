import { useNavigate } from 'react-router-dom';
import { prefix } from 'utilities';
import { extraBtnPadding, Paths } from 'shared';
import { Box, Button, CloseButton, HStack, VStack } from '@holdr-ui/react';
import { MenuButton } from '../../../buttons';

function UnauthenticatedProfileMenuSm({
  onClose,
}: {
  onClose: VoidFunction;
}) {
  const navigate = useNavigate();

  const open = {
    support: () => {
      navigate(prefix('/', Paths.support));
      onClose();
    },
    settings: () => {
      navigate(prefix('/', Paths.settings));
      onClose();
    },
    discover: () => {
      navigate(prefix('/', Paths.discover));
      onClose();
    },
  };

  return (
    <VStack px={2} h='100%' justify='space-between'>
      <VStack gap={2}>
        <HStack justify='flex-end' mb={2} py={2}>
          <CloseButton onClick={onClose} variant='ghost' />
        </HStack>
        <MenuButton
          label='Discover'
          icon='discover-outline'
          onClick={open.discover}
        />
        <MenuButton
          label='Settings & Privacy'
          icon='settings-outline'
          onClick={open.settings}
        />
        <MenuButton
          label='Help & Support'
          icon='question-outline'
          onClick={open.support}
        />
        <a
          href={`${import.meta.env.VITE_AUTH_APP_URL}?redirect_url=${
            import.meta.env.VITE_APP_BASE_URL
          }${import.meta.env.VITE_APP_BASE_PATH}`}
        >
          <MenuButton label='Login / Register' icon='logout-outline' />
        </a>
      </VStack>
      <Box py={3}>
        <Button
          colorTheme='secondary400'
          className={extraBtnPadding()}
          label='Holdr Club'
          fullWidth
        />
      </Box>
    </VStack>
  );
}
UnauthenticatedProfileMenuSm.displayName = 'UnauthenticatedProfileMenuSm';

export default UnauthenticatedProfileMenuSm;
