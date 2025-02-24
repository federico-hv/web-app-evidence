import { useState } from 'react';
import {
  hexToRGB,
  customBgColor,
  useLogout,
  Paths,
  makePath,
} from '../../../../shared';
import { Box, IconButton, Popover, VStack } from '@holdr-ui/react';
import { useNavigate } from 'react-router-dom';

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
      radius={2}
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
  const navigate = useNavigate();

  const [state, set] = useState(false);

  const close = () => set(false);

  return (
    <Popover modal isOpen={state} onOpenChange={set}>
      <Popover.Trigger asChild onClick={() => set(true)}>
        <IconButton
          className={customBgColor()}
          variant='ghost'
          colorTheme='white50'
          icon='settings-outline'
          ariaLabel='View messages'
        />
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          p={3}
          color='white50'
          sideOffset={20}
          align='end'
          w={308}
          zIndex={50}
          radius={2}
          css={{
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
              <SettingsItem
                label='Account Settings'
                onClick={() => {
                  navigate(
                    makePath([Paths.settings, Paths.setting.account]),
                  );
                  close();
                }}
              />
              <SettingsItem
                label='Privacy & Safety'
                onClick={() => {
                  navigate(
                    makePath([Paths.settings, Paths.setting.privacy]),
                  );
                  close();
                }}
              />
              <SettingsItem
                label='Payments'
                onClick={() => {
                  navigate(
                    makePath([Paths.settings, Paths.setting.payments]),
                  );
                  close();
                }}
              />
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
