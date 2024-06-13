import { useCurrentUser } from '../../../features';
import {
  ErrorFallback,
  GQLRenderer,
  Head,
  customBgColor,
  RadialSurface,
} from '../../../shared';
import {
  Box,
  Button,
  Heading,
  HStack,
  IconButton,
  useSwitch,
  Text,
  VStack,
} from '@holdr-ui/react';
import CustomTabs, {
  CustomTabsContent,
  CustomTabsHeader,
  CustomTabsList,
  CustomTabsTrigger,
} from '../../../tmp/custom-tabs';
import { SelectMembershipSort } from '../ui';
import ArtistBio from './bio';
import { useParams } from 'react-router-dom';
import { startCase } from 'lodash';
import ArtistFeed from './feed';

function ClubPage() {
  const currentUser = useCurrentUser();
  const { switchState, toggle } = useSwitch();
  let { slug } = useParams();

  const title = `${startCase(slug)}'s ClubPage`;

  return (
    <GQLRenderer ErrorFallback={ErrorFallback}>
      <Head
        prefix='Holdr - Clubs'
        title=''
        description='A catalog of memberships that are being offered by artists.'
      />
      {currentUser && (
        <RadialSurface w='100%' radius={4} minHeight='calc(100vh - 96px)'>
          <Box px={5} py={5}>
            <HStack py={3} mb={5} items={'center'}>
              <Heading
                weight={400}
                size={'24px'}
                css={{ lineHeight: '115%' }}
              >
                {title}
              </Heading>
              <VStack
                border={1}
                borderColor='#5CE581'
                justify={'center'}
                px={2}
                radius={1}
                maxHeight={'xs'}
                ml={20}
              >
                <Text color='#5CE581'>LIVE</Text>
              </VStack>
              <Box position='absolute' r={30}>
                <Button colorTheme='purple100' style={{ width: '150px' }}>
                  Follow
                </Button>
              </Box>
            </HStack>
            <CustomTabs defaultValue='bio' flex={1}>
              <CustomTabsHeader h={44}>
                <CustomTabsList gap={1}>
                  <CustomTabsTrigger
                    w='fit-content'
                    py={2}
                    px={6}
                    _hover={{ background: '#9898FF26' }}
                    value='bio'
                    fontSize={'18px'}
                    color='white500'
                  >
                    Bio
                  </CustomTabsTrigger>
                  <CustomTabsTrigger
                    w='fit-content'
                    py={2}
                    px={6}
                    _hover={{ background: '#9898FF26' }}
                    value='feed'
                    fontSize={'18px'}
                    color='white500'
                  >
                    Feed
                  </CustomTabsTrigger>
                  <CustomTabsTrigger
                    w='fit-content'
                    py={2}
                    px={6}
                    _hover={{ background: '#9898FF26' }}
                    value='liveBids'
                    fontSize={'18px'}
                    color='white500'
                  >
                    Live Bids
                  </CustomTabsTrigger>
                  <CustomTabsTrigger
                    w='fit-content'
                    py={2}
                    px={6}
                    _hover={{ background: '#9898FF26' }}
                    value='membershipPerks'
                    fontSize={'18px'}
                    color='white500'
                  >
                    Membership Perks
                  </CustomTabsTrigger>
                </CustomTabsList>
              </CustomTabsHeader>
              <CustomTabsContent
                py={8}
                value='bio'
                minHeight='calc(100vh - 158px)'
              >
                <ArtistBio />
              </CustomTabsContent>
              <CustomTabsContent
                py={8}
                value='feed'
                minHeight='calc(100vh - 158px)'
              >
                <ArtistFeed />
              </CustomTabsContent>
              <CustomTabsContent
                py={8}
                value='liveBids'
                minHeight='calc(100vh - 158px)'
              >
                {'LIVE BIDS'}
              </CustomTabsContent>
              <CustomTabsContent
                py={8}
                value='membershipPerks'
                minHeight='calc(100vh - 158px)'
              >
                {'MEMBERSHIP PERKS'}
              </CustomTabsContent>
            </CustomTabs>
          </Box>
        </RadialSurface>
      )}
    </GQLRenderer>
  );
}

ClubPage.displayName = 'ClubPage';

export default ClubPage;
