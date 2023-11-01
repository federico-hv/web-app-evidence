import { Center, HStack, Text } from '@holdr-ui/react';
import { Link } from 'react-router-dom';
import { Paths } from 'shared';

export function SectionHeader() {
  return (
    <HStack justify='space-between'>
      <Text weight={500}>New</Text>
      <Link to={Paths.notifications}>
        <Center>
          <Text>View all</Text>
        </Center>
      </Link>
    </HStack>
  );
}
