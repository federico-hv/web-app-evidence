import { Avatar, Box, HStack, Text, VStack } from '@holdr-ui/react';
import { RadialSurface } from '../../../../shared';

function ProfileSummary() {
  return (
    <RadialSurface radius={4} h={117} w='100%'>
      <VStack
        gap={3}
        w='100%'
        h='100%'
        placeholder=''
        divider={
          <Box
            minHeight='1px'
            w='calc(100% - $4)'
            mx={4}
            css={{
              background: 'rgba(152, 152, 255, 0.1)',
            }}
          />
        }
      >
        <HStack
          items='center'
          gap={3}
          w='100%'
          h='100%'
          placeholder=''
          pt={4}
          px={4}
        >
          <Avatar name={''} css={{ size: '50px' }} />
          <VStack gap={1} placeholder=''>
            <Text>Name</Text>
            <Text size={2} color='base300'>
              Name
            </Text>
          </VStack>
        </HStack>
        <HStack
          pb={4}
          px={4}
          w='100%'
          h='100%'
          placeholder=''
          justify='space-between'
        >
          <HStack gap={2} placeholder=''>
            <Text size={2}>0</Text>
            <Text size={2} color='base300'>
              Memberships
            </Text>
          </HStack>
          <HStack gap={2} placeholder=''>
            <Text size={2}>0</Text>
            <Text size={2} color='base300'>
              Followers
            </Text>
          </HStack>
          <HStack gap={2} placeholder=''>
            <Text size={2}>0</Text>
            <Text size={2} color='base300'>
              Following
            </Text>
          </HStack>
        </HStack>
      </VStack>
    </RadialSurface>
  );
}
ProfileSummary.displayName = 'ProfileSummary';
export default ProfileSummary;
