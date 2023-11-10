import { Center, HStack, Text } from '@holdr-ui/react';
import { Link } from 'react-router-dom';
import { Paths, usePopoverContext } from 'shared';

function SectionHeader() {
  const { setClosed } = usePopoverContext();
  return (
    <HStack justify='space-between' pb={4}>
      <Text weight={500}>New</Text>
      <Link to={Paths.notifications} onClick={setClosed}>
        <Text color='base300' size={2}>
          View all
        </Text>
      </Link>
    </HStack>
  );
}

SectionHeader.displayName = 'SectionHeader';
export default SectionHeader;
