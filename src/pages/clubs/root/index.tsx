import { useCurrentUser } from '../../../features';
import {
  ErrorFallback,
  GQLRenderer,
  Head,
  customBgColor,
  RadialSurface,
  RoutingTabs,
  RoutingTabsList,
  RoutingTabsHeader,
  RoutingTabsTrigger,
  RoutingTabsContent,
} from '../../../shared';
import {
  Box,
  Heading,
  HStack,
  IconButton,
  useSwitch,
} from '@holdr-ui/react';
import { FiltersList } from './ui';
import { SelectMembershipSort } from '../ui';

function ClubsPage() {
  const currentUser = useCurrentUser();
  const { switchState, toggle } = useSwitch();

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
            <Box py={3} mb={5}>
              <Heading weight={400} size={6}>
                Holdr Clubs
              </Heading>
            </Box>
            <RoutingTabs flex={1}>
              <RoutingTabsHeader h={44}>
                <RoutingTabsList gap={1}>
                  <RoutingTabsTrigger
                    to='all'
                    w='fit-content'
                    py={2}
                    px={6}
                    fontSize={2}
                    _hover={{ background: '#9898FF26' }}
                  >
                    All
                  </RoutingTabsTrigger>
                  <RoutingTabsTrigger
                    w='fit-content'
                    py={2}
                    px={6}
                    fontSize={2}
                    _hover={{ background: '#9898FF26' }}
                    to='auction'
                  >
                    Live Auctions
                  </RoutingTabsTrigger>
                  <RoutingTabsTrigger
                    w='fit-content'
                    py={2}
                    px={6}
                    fontSize={2}
                    _hover={{ background: '#9898FF26' }}
                    to='watchlist'
                  >
                    Watchlist
                  </RoutingTabsTrigger>
                  <RoutingTabsTrigger
                    w='fit-content'
                    py={2}
                    px={6}
                    fontSize={2}
                    _hover={{ background: '#9898FF26' }}
                    to='bids'
                  >
                    Active Bids
                  </RoutingTabsTrigger>
                </RoutingTabsList>
                <HStack gap={4}>
                  <IconButton
                    onClick={toggle}
                    className={customBgColor()}
                    variant='ghost'
                    size='lg'
                    icon='filter-outline'
                    colorTheme='white50'
                    ariaLabel='filter feeds'
                  />
                  <SelectMembershipSort />
                </HStack>
              </RoutingTabsHeader>
              <RoutingTabsContent py={4} minHeight='calc(100vh - 158px)'>
                {switchState && <FiltersList />}
              </RoutingTabsContent>
            </RoutingTabs>
          </Box>
        </RadialSurface>
      )}
    </GQLRenderer>
  );
}
ClubsPage.displayName = 'ClubsPage';
export default ClubsPage;
