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
  Heading,
  HStack,
  IconButton,
  useSwitch,
} from '@holdr-ui/react';
import CustomTabs, {
  CustomTabsContent,
  CustomTabsHeader,
  CustomTabsList,
  CustomTabsTrigger,
} from '../../../tmp/custom-tabs';
import {
  ClubsAllContent,
  ClubsLiveAuctionContent,
  ClubsSecondarySaleContent,
  ClubsWatchlistContent,
  FiltersList,
} from './ui';
import { SelectMembershipSort } from '../ui';
import ActiveBidsContent from './ui/active-bids-content';

function ClubsPage() {
  const currentUser = useCurrentUser();
  const { switchState, toggle } = useSwitch();
  // const [tab, setTab] = useState('all');

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
            <CustomTabs defaultValue='all' flex={1}>
              <CustomTabsHeader h={44}>
                <CustomTabsList gap={1}>
                  <CustomTabsTrigger
                    w='fit-content'
                    py={2}
                    px={6}
                    fontSize={2}
                    _hover={{ background: '#9898FF26' }}
                    value='all'
                  >
                    All
                  </CustomTabsTrigger>
                  <CustomTabsTrigger
                    w='fit-content'
                    py={2}
                    px={6}
                    fontSize={2}
                    _hover={{ background: '#9898FF26' }}
                    value='live'
                  >
                    Live Auctions
                  </CustomTabsTrigger>
                  <CustomTabsTrigger
                    w='fit-content'
                    py={2}
                    px={6}
                    fontSize={2}
                    _hover={{ background: '#9898FF26' }}
                    value='sale'
                  >
                    Secondary Sales
                  </CustomTabsTrigger>
                  <CustomTabsTrigger
                    w='fit-content'
                    py={2}
                    px={6}
                    fontSize={2}
                    _hover={{ background: '#9898FF26' }}
                    value='watchlist'
                  >
                    Watchlist
                  </CustomTabsTrigger>
                  <CustomTabsTrigger
                    w='fit-content'
                    py={2}
                    px={6}
                    fontSize={2}
                    _hover={{ background: '#9898FF26' }}
                    value='activeBids'
                  >
                    Active Bids
                  </CustomTabsTrigger>
                </CustomTabsList>
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
              </CustomTabsHeader>
              <CustomTabsContent
                py={8}
                value='all'
                minHeight='calc(100vh - 158px)'
              >
                {switchState && <FiltersList />}
                <ClubsAllContent />
              </CustomTabsContent>
              <CustomTabsContent
                py={8}
                value='live'
                minHeight='calc(100vh - 158px)'
              >
                {switchState && <FiltersList />}
                <ClubsLiveAuctionContent />
              </CustomTabsContent>
              <CustomTabsContent
                py={8}
                value='sale'
                minHeight='calc(100vh - 158px)'
              >
                {switchState && <FiltersList />}
                <ClubsSecondarySaleContent />
              </CustomTabsContent>
              <CustomTabsContent
                py={8}
                value='watchlist'
                minHeight='calc(100vh - 158px)'
              >
                {switchState && <FiltersList />}
                <ClubsWatchlistContent />
              </CustomTabsContent>
              <CustomTabsContent
                py={8}
                value='activeBids'
                minHeight='calc(100vh - 158px)'
              >
                {switchState && <FiltersList />}
                <ActiveBidsContent />
              </CustomTabsContent>
            </CustomTabs>
          </Box>
        </RadialSurface>
      )}
    </GQLRenderer>
  );
}
ClubsPage.displayName = 'ClubsPage';
export default ClubsPage;
