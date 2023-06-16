import { Link, useLocation } from 'react-router-dom';
import { Box, HStack, Icon, Text, VStack } from '@holdr-ui/react';
import { SettingsButtonProp } from './setting.type';
import { settingButtonHoverCss } from '../../../shared';

function SettingButton({
  path: pathname,
  icon,
  heading,
  subheading,
}: SettingsButtonProp) {
  const location = useLocation();

  return (
    <Link to={pathname} state={{ prevPath: location.pathname }}>
      <HStack items='center' p={4} className={settingButtonHoverCss()}>
        {icon && (
          <Box px={4}>
            <Icon name={icon} />
          </Box>
        )}
        <HStack flex={1} justify='space-between' items='center'>
          <VStack gap={1}>
            <Text>{heading}</Text>
            {subheading && (
              <Text size={2} color='base400'>
                {subheading}
              </Text>
            )}
          </VStack>
          <Box>
            <Icon name='caret-right-outline' />
          </Box>
        </HStack>
      </HStack>
    </Link>
  );
}
SettingButton.displayName = 'SettingButton';

export default SettingButton;
