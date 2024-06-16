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
  makePath,
  Paths,
} from '../../../shared';
import {
  Box,
  Button,
  Heading,
  HStack,
  IconButton,
  useSwitch,
} from '@holdr-ui/react';
import { SelectMembershipSort } from '../ui';
import ClubsFilters from './clubs-filters';
import { useNavigate } from 'react-router-dom';

function ClubsTabs() {
  const currentUser = useCurrentUser();
  const navigate = useNavigate();
  const { switchState, toggle } = useSwitch();

  return (
    <GQLRenderer ErrorFallback={ErrorFallback}>
      <Head
        prefix='Holdr - Clubs'
        title=''
        description='A catalog of memberships that are being offered by artists.'
      />
      {currentUser && (
        <RadialSurface w='100%' radius={4} h='fit-content'>
          <Box px={5} py={5}>
            <HStack justify='space-between' items='center' py={3} mb={5}>
              <Heading weight={400} size={6}>
                Holdr Clubs
              </Heading>
              {currentUser.role === 'artist' && (
                <Button
                  css={{ px: '50px' }}
                  colorTheme='purple100'
                  onClick={() =>
                    navigate(makePath([Paths.clubs, currentUser.username]))
                  }
                >
                  View Club
                </Button>
              )}
            </HStack>
            <RoutingTabs flex={1} h='fit-content'>
              <RoutingTabsHeader
              // borderBottom={1}
              // borderColor='rgba(152, 152, 255, 0.10)'
              >
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
                <HStack items='center' gap={4}>
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
              <RoutingTabsContent py={4} h='full'>
                {switchState && <ClubsFilters />}
              </RoutingTabsContent>
            </RoutingTabs>
          </Box>
        </RadialSurface>
      )}
    </GQLRenderer>
  );
}
ClubsTabs.displayName = 'ClubsTabs';
export default ClubsTabs;
