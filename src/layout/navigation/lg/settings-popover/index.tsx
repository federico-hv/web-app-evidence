import { useState } from 'react';
import { hexToRGB, useLogout, useMenuNavigate } from '../../../../shared';
import { Box, IconButton, Popover, VStack } from '@holdr-ui/react';
import { ButtonWrapper } from '../../ui';

function SettingsItem({
  label,
  onClick,
}: {
  label: string;
  onClick?: VoidFunction;
}) {
  return (
    <Box
      p={4}
      radius={3}
      _hover={{
        backgroundColor: hexToRGB('#0E0E1B', 0.5),
      }}
      cursor='pointer'
      onClick={onClick}
    >
      {label}
    </Box>
  );
}

function SettingsPopover() {
  const logout = useLogout();
  const { goto } = useMenuNavigate();

  const [state, set] = useState(false);

  const close = () => set(false);

  return (
    <Popover modal isOpen={state} onOpenChange={set}>
      <Popover.Trigger onClick={() => set(true)}>
        <ButtonWrapper>
          <IconButton
            variant='ghost'
            colorTheme='white50'
            icon='settings-outline'
            ariaLabel='View messages'
          />
        </ButtonWrapper>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          color='white50'
          alignOffset={0}
          sideOffset={20}
          align='end'
          w={308}
          zIndex={50}
          css={{
            borderRadius: '$4',
            border: '1px solid rgba(152, 152, 255, 0.10)',
            background: ' rgba(56, 56, 140, 0.25)',
            boxShadow: '0px 0px 100px 0px rgba(14, 14, 27, 0.35)',
            backdropFilter: 'blur(50px)',
          }}
        >
          <VStack
            gap={2}
            divider={
              <Box
                h='1px'
                css={{ background: 'rgba(152, 152, 255, 0.10)' }}
              />
            }
          >
            <VStack gap={1}>
              <SettingsItem label='Account Settings' onClick={close} />
              <SettingsItem label='Safety & Privacy' onClick={close} />
              <SettingsItem label='Personalize' onClick={close} />
            </VStack>
            <SettingsItem
              label='Logout'
              onClick={() => {
                close();
                logout();
              }}
            />
          </VStack>
        </Popover.Content>
      </Popover.Portal>
    </Popover>
  );
}
SettingsPopover.displayName = 'SettingsPopover';

export default SettingsPopover;
