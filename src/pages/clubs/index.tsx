import { useCurrentUser } from '../../features';
import {
  ErrorFallback,
  GQLRenderer,
  Head,
  RadialSurface,
} from '../../shared';
import {
  AllContent,
  LiveAuctionContent,
  SecondarySalesContent,
  WatchlistContent,
} from './ui';
import { Box, Heading, HStack, theme } from '@holdr-ui/react';
import { TabOptions } from './shared';
import CustomTabs, {
  CustomTabsContent,
  CustomTabsHeader,
  CustomTabsList,
  CustomTabsTrigger,
} from '../../tmp/custom-tabs';
import { CSS } from '@stitches/react';

const tabsHoverStyle: CSS<typeof theme> = {
  transitionDuration: theme.transitions['duration-slow'],
  transitionProperty: 'background',
  transitionTimingFunction: 'linear',
};

function ClubsPage() {
  const currentUser = useCurrentUser();

  return (
    <GQLRenderer ErrorFallback={ErrorFallback}>
      <Head
        prefix='Holdr - Clubs'
        title=''
        description='A catalog of memberships that are being offered by artists.'
      />
      {currentUser && (
        <RadialSurface w='100%' radius={4} h='100%'>
          {/* New page layout*/}
          <Box px='16px' py='20px'>
            <Box py='13.5px' mb='20px'>
              <Heading weight={400} size='24px'>
                Holdr Clubs
              </Heading>
            </Box>
            <CustomTabs defaultValue={TabOptions.all} flex={1}>
              <CustomTabsHeader h={44}>
                <HStack items='center' w='100%'>
                  <CustomTabsList gap={3}>
                    <CustomTabsTrigger
                      flex='unset'
                      px='20px'
                      py='12px'
                      css={tabsHoverStyle}
                      _hover={{ background: '#9898FF26' }}
                      value='all'
                    >
                      All
                    </CustomTabsTrigger>
                    <CustomTabsTrigger
                      flex='unset'
                      px='20px'
                      py='12px'
                      css={tabsHoverStyle}
                      _hover={{ background: '#9898FF26' }}
                      value={TabOptions['live-auctions']}
                    >
                      Live Auctions
                    </CustomTabsTrigger>
                    <CustomTabsTrigger
                      flex='unset'
                      px='20px'
                      py='12px'
                      css={tabsHoverStyle}
                      _hover={{ background: '#9898FF26' }}
                      value={TabOptions['secondary-sales']}
                    >
                      Secondary Sales
                    </CustomTabsTrigger>
                    <CustomTabsTrigger
                      flex='unset'
                      px='20px'
                      py='12px'
                      css={tabsHoverStyle}
                      _hover={{ background: '#9898FF26' }}
                      value={TabOptions.watchlist}
                    >
                      Watchlist
                    </CustomTabsTrigger>
                  </CustomTabsList>
                </HStack>
              </CustomTabsHeader>
              <CustomTabsContent value={TabOptions.all}>
                <AllContent />
              </CustomTabsContent>
              <CustomTabsContent value={TabOptions['live-auctions']}>
                <LiveAuctionContent />
              </CustomTabsContent>
              <CustomTabsContent value={TabOptions['secondary-sales']}>
                <SecondarySalesContent />
              </CustomTabsContent>
              <CustomTabsContent value={TabOptions.watchlist}>
                <WatchlistContent />
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
