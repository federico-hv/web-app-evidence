import { Box, Heading } from '@holdr-ui/react';
import {
  GQLRenderer,
  Paths,
  RadialSurface,
  RoutingTabs,
  RoutingTabsContent,
  RoutingTabsHeader,
  RoutingTabsList,
  RoutingTabsTrigger,
} from '../../../shared';
import { ContentLayout, ContentLayoutMain } from '../../../layout';

function SettingsTabs() {
  return (
    <GQLRenderer>
      <ContentLayout>
        <ContentLayoutMain>
          <Box h='full'>
            <RadialSurface w='100%' minHeight='full' p={4} radius={4}>
              <Heading mb={40} color='white100' weight={400} size={6}>
                Settings
              </Heading>
              <RoutingTabs flex={1}>
                <RoutingTabsHeader
                  borderBottom={1}
                  borderColor='rgba(152, 152, 255, 0.10)'
                >
                  <RoutingTabsList gap={1}>
                    <RoutingTabsTrigger
                      w='fit-content'
                      py={2}
                      px={6}
                      fontSize={2}
                      _hover={{ background: '#9898FF26' }}
                      to={Paths.setting.account}
                    >
                      Account
                    </RoutingTabsTrigger>
                    <RoutingTabsTrigger
                      w='fit-content'
                      py={2}
                      px={6}
                      fontSize={2}
                      _hover={{ background: '#9898FF26' }}
                      to={Paths.setting.privacy}
                    >
                      Privacy and Safety
                    </RoutingTabsTrigger>
                    <RoutingTabsTrigger
                      w='fit-content'
                      py={2}
                      px={6}
                      fontSize={2}
                      _hover={{ background: '#9898FF26' }}
                      to={Paths.setting.notifications}
                    >
                      Notifications
                    </RoutingTabsTrigger>
                  </RoutingTabsList>
                </RoutingTabsHeader>
                <RoutingTabsContent pt='40px' h='full' />
              </RoutingTabs>
            </RadialSurface>
          </Box>
        </ContentLayoutMain>
      </ContentLayout>
    </GQLRenderer>
  );
}
SettingsTabs.displayName = 'SettingsTabs';

export default SettingsTabs;
