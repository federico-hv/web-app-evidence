import { Center, HStack, Text } from '@holdr-ui/react';
import { Link } from 'react-router-dom';
import { Paths } from 'shared';

function SectionHeader() {
  return (
    <HStack justify='space-between' pb={4}>
      <Text weight={500}>New</Text>
      <Link to={Paths.notifications}>
        <Center>
          <Text color='base300'>View all</Text>
        </Center>
      </Link>
    </HStack>
  );
}

SectionHeader.displayName = 'SectionHeader';
export default SectionHeader;
