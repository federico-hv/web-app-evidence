import { HStack, Text } from '@holdr-ui/react';
import { Link } from 'react-router-dom';
import { Paths } from 'shared';
import { BaseNotificationSCProps } from '../types';

function SectionHeader({ onClose }: BaseNotificationSCProps) {
  return (
    <HStack justify='space-between' pb={4}>
      <Text weight={500}>New</Text>
      <Link to={Paths.notifications} onClick={onClose}>
        <Text color='base300' size={2}>
          View all
        </Text>
      </Link>
    </HStack>
  );
}

SectionHeader.displayName = 'SectionHeader';
export default SectionHeader;
