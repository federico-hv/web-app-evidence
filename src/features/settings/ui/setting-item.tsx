import { Link, useLocation } from 'react-router-dom';
import { Box, HStack, Icon, Text, VStack } from '@holdr-ui/react';
import { SettingsButtonProp } from '../shared';
import { settingButtonHoverCss } from '../styles';

function SettingItem({
  path: pathname,
  icon,
  heading,
  subheading,
  capitalize,
}: SettingsButtonProp) {
  const location = useLocation();

  return (
    <Link to={pathname} state={{ prevPath: location.pathname }}>
      <HStack items='center' p={4} className={settingButtonHoverCss()}>
        {icon && (
          <Box px={4}>
            <Icon size='lg' name={icon} />
          </Box>
        )}
        <HStack flex={1} justify='space-between' items='center'>
          <VStack gap={1}>
            <Text casing={capitalize?.heading ? 'capitalize' : 'normal'}>
              {heading}
            </Text>
            {subheading && (
              <Text
                casing={capitalize?.subheading ? 'capitalize' : 'normal'}
                size={2}
                color='base400'
              >
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
SettingItem.displayName = 'SettingItem';

export default SettingItem;
