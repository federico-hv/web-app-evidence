import {
  Box,
  Center,
  Circle,
  Container,
  Heading,
  HStack,
  Icon,
  Image,
  VStack,
} from '@holdr-ui/react';
import {
  Asset,
  GQLRenderer,
  Paths,
  RoutingTabs,
  RoutingTabsContent,
  RoutingTabsHeader,
  RoutingTabsList,
  RoutingTabsTrigger,
  TextGroup,
  TextGroupSubheading,
  useScrollPosition,
} from '../../../../shared';
import {
  ContentLayout,
  ContentLayoutMain,
  Navigation,
  NavigationActions,
  NavigationContent,
  NavigationLogo,
  NavigationNotificationsPopover,
  NavigationSettingsPopover,
} from '../../../../layout';
import { Link } from 'react-router-dom';
import GainLossIndicator from '../../../../shared/components/gain-loss-indicator';

function MembershipTabs() {
  const { top } = useScrollPosition();

  return (
    <GQLRenderer>
      <ContentLayout>
        <ContentLayoutMain>
          <VStack
            w='100%'
            minHeight='100vh'
            color='black500'
            bgColor='white500'
          >
            <Box
              as='header'
              minHeight={30}
              h={372}
              position='relative'
              zIndex={1}
            >
              <Box
                position='absolute'
                t={60}
                l={0}
                b={0}
                w='100%'
                zIndex={5}
                color='white600'
              >
                <Container h='100%' maxWidth={1280}>
                  <VStack h='100%' w='100%' justify='flex-end' pb={8}>
                    <Heading size='64px' weight={600}>
                      Artist Name
                    </Heading>
                    <Heading
                      weight={400}
                      as='h2'
                      noOfLines={2}
                      size={5}
                      css={{
                        width: '75%',
                      }}
                    >
                      Artist bio
                    </Heading>
                    <HStack gap={6} items='center' mt={4}>
                      <HStack gap={5}>
                        <TextGroup gap={2} direction='horizontal'>
                          <TextGroupSubheading size={4} weight={600}>
                            32.5k
                          </TextGroupSubheading>
                          <TextGroupSubheading size={4} color='white600'>
                            Followers
                          </TextGroupSubheading>
                        </TextGroup>
                        <Center fontSize='0.5rem'>
                          <Icon color='base300' name='middle-dot-fill' />
                        </Center>
                        <TextGroup direction='horizontal'>
                          <TextGroupSubheading size={4} weight={600}>
                            230
                          </TextGroupSubheading>
                          <TextGroupSubheading size={4} color='white600'>
                            Following
                          </TextGroupSubheading>
                        </TextGroup>
                      </HStack>
                      <HStack gap={2} fontSize='36px'>
                        <Link to=''>
                          <Icon name='instagram' />
                        </Link>
                        <Link to=''>
                          <Icon name='tiktok' />
                        </Link>
                        <Link to=''>
                          <Icon name='x-twitter' />
                        </Link>
                      </HStack>
                    </HStack>
                    <HStack gap={5} mt={10}>
                      <TextGroup w='fit' gap={2} direction='horizontal'>
                        <TextGroupSubheading size={4} weight={600}>
                          $0.00
                        </TextGroupSubheading>
                        <TextGroupSubheading size={4} color='white600'>
                          Membership Price
                        </TextGroupSubheading>
                      </TextGroup>
                      <Center fontSize='0.5rem'>
                        <Icon color='base300' name='middle-dot-fill' />
                      </Center>
                      <HStack>
                        <GainLossIndicator isGain={true} />
                        <TextGroup w='fit' direction='horizontal'>
                          <TextGroupSubheading size={4} weight={600}>
                            4.2%
                          </TextGroupSubheading>
                          <TextGroupSubheading size={4} color='white600'>
                            Membership Value
                          </TextGroupSubheading>
                        </TextGroup>
                      </HStack>
                    </HStack>
                  </VStack>
                </Container>
              </Box>
              <Box
                position='absolute'
                t={0}
                l={0}
                b={0}
                w='100%'
                bgColor='rgba(0,0,0,0.65)'
                zIndex={1}
              />

              <Image
                h={372}
                fit='cover'
                alt='club cover image'
                src={Asset.Image.DummyMembershipCover}
                css={{ zIndex: -1 }}
              />
              <Navigation>
                <NavigationContent
                  bg='linear-gradient(0deg, rgba(0, 0, 0, 0.03) 0%, rgba(0, 0, 0, 0.75) 100%)'
                  css={{
                    backdropFilter: top > 307 ? 'blur(12px)' : undefined,
                  }}
                >
                  <NavigationLogo />
                  <NavigationActions>
                    <NavigationNotificationsPopover />
                    <NavigationSettingsPopover />
                  </NavigationActions>
                </NavigationContent>
              </Navigation>
            </Box>
            <RoutingTabs
              flex={1}
              bgColor='white100'
              position='relative'
              h='calc(100% - 80px)'
            >
              <RoutingTabsHeader
                position='sticky'
                zIndex={2}
                bgColor='white100'
                t={60}
                borderBottom={1}
                borderColor='rgba(152, 152, 255, 0.10)'
                mx='auto'
                css={{
                  boxShadow: '0px 4px 25px 0px rgba(0, 0, 0, 0.1)',
                }}
              >
                <RoutingTabsList gap={1} maxWidth={1280} mx='auto'>
                  <RoutingTabsTrigger
                    w='fit-content'
                    py={2}
                    px={6}
                    fontSize={2}
                    _hover={{ background: '#9898FF26' }}
                    to={Paths.home}
                  >
                    Home
                  </RoutingTabsTrigger>
                  <RoutingTabsTrigger
                    w='fit-content'
                    py={2}
                    px={6}
                    fontSize={2}
                    _hover={{ background: '#9898FF26' }}
                    to={Paths.events}
                  >
                    Events
                  </RoutingTabsTrigger>
                  <RoutingTabsTrigger
                    w='fit-content'
                    py={2}
                    px={6}
                    fontSize={2}
                    _hover={{ background: '#9898FF26' }}
                    to={Paths.music}
                  >
                    Music
                  </RoutingTabsTrigger>
                  <RoutingTabsTrigger
                    w='fit-content'
                    py={2}
                    px={6}
                    fontSize={2}
                    _hover={{ background: '#9898FF26' }}
                    to={Paths.more}
                  >
                    More
                  </RoutingTabsTrigger>
                  <RoutingTabsTrigger
                    w='fit-content'
                    py={2}
                    px={6}
                    fontSize={2}
                    _hover={{ background: '#9898FF26' }}
                    to={Paths.about}
                  >
                    About
                  </RoutingTabsTrigger>
                </RoutingTabsList>
              </RoutingTabsHeader>
              <RoutingTabsContent pt='32px' h='full' />
            </RoutingTabs>
          </VStack>
        </ContentLayoutMain>
      </ContentLayout>
    </GQLRenderer>
  );
}
MembershipTabs.displayName = 'MembershipTabs';

export default MembershipTabs;
