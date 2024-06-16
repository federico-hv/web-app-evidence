import {
  arrayFrom,
  RadialSurface2,
  TextGroup,
  TextGroupSubheading,
} from '../../../shared';
import {
  Avatar,
  AvatarBadge,
  Box,
  Heading,
  HStack,
  Text,
  VStack,
} from '@holdr-ui/react';
import { FlatList } from '../../../tmp/flat-list';
import dayjs from 'dayjs';

import localizedFormat from 'dayjs/plugin/localizedFormat';
dayjs.extend(localizedFormat);

function ArtistProfileMembersPage() {
  return (
    <RadialSurface2 w='100%' h='100%' p={4} radius={3}>
      <Box pb={2} w='100%' borderBottom={1} borderColor='#9898FF1A'>
        <Heading size={5} weight={400}>
          My Members
        </Heading>
      </Box>
      <VStack mt={6} gap={2}>
        <HStack>
          <Box flex={1}>
            <Text p={1} size='14px' weight={500} color='white700'>
              Name
            </Text>
          </Box>
          <Box basis={200}>
            <Text p={1} size='14px' weight={500} color='white700'>
              Member Since
            </Text>
          </Box>
          <Box basis={200}>
            <Text p={1} size='14px' weight={500} color='white700'>
              Purchase Price
            </Text>
          </Box>
        </HStack>
        <FlatList
          direction='vertical'
          data={arrayFrom(10).map((id) => ({ id }))}
          renderItem={() => (
            <HStack items='center'>
              <Box flex={1} p={1}>
                <HStack items='center' gap={3}>
                  <Avatar size='40px'>
                    {Math.random() > 0.5 && (
                      <AvatarBadge
                        zIndex={1}
                        size='12px'
                        bgColor='success500'
                        b={10}
                        r={2}
                        border={2}
                        borderColor='rgb(43, 42, 60)'
                      />
                    )}
                  </Avatar>
                  <TextGroup mb={2}>
                    <TextGroupSubheading size={3} weight={500}>
                      Display name
                    </TextGroupSubheading>
                    <TextGroupSubheading mt={-5} weight={300} size={1}>
                      @username
                    </TextGroupSubheading>
                  </TextGroup>
                </HStack>
              </Box>
              <Box basis={200} p={1}>
                <Text weight={300}>{dayjs(new Date()).format('ll')}</Text>
              </Box>
              <Box basis={200} p={1}>
                <Text weight={300}>${'200.00'}</Text>
              </Box>
            </HStack>
          )}
          keyExtractor={({ id }) => id}
        />
      </VStack>
    </RadialSurface2>
  );
}
ArtistProfileMembersPage.displayName = 'ArtistProfileMembersPage';

export default ArtistProfileMembersPage;
