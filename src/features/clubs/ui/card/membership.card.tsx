import {
  Box,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Circle,
  Heading,
  HStack,
  IconButton,
  Image,
  Text,
  VStack,
} from '@holdr-ui/react';
import {
  Asset,
  LiveTag,
  TextGroup,
  TextGroupHeading,
  TextGroupSubheading,
} from '../../../../shared';
import { FlatList } from '../../../../tmp/flat-list';
import { useEffect, useState } from 'react';

function MembershipCard({
  data,
  showPerksOnHover = true,
}: {
  /** Show the perks when hovered. Set to true by default */
  showPerksOnHover?: boolean;
  data: {
    /** The date that an auction ends */
    coverImage?: string;
    /** The slug (username/url) of the club */
    slug?: string;
    /** The artist name */
    name?: string;
    /** The date that an auction ends */
    endDate?: Date;
    /** The price of the sale */
    price?: number;
    /** A list of the club perks */
    perks?: string[];
  };
}) {
  const [h, setH] = useState<number>();

  useEffect(() => {
    const element = document.getElementById('membership_footer');

    if (element) {
      setH(element.offsetHeight);
    }
  }, []);

  return (
    <Card
      h='inherit'
      cursor={data.slug ? 'pointer' : undefined}
      radius={3}
      border={2}
      overflow='hidden'
      borderColor='rgba(152, 152, 255, 0.10)'
      bgColor='#30304B'
      position='relative'
      minWidth={288}
      minHeight={372}
      css={
        showPerksOnHover
          ? {
              '&:hover .membership-card-footer__content': {
                display: 'none',
              },
              '&:hover .membership-card-footer__overlay': {
                height: '100%',
                transition: 'all 0.25s ease-out',
              },
              '&:hover .membership-card-footer__overlay > *': {
                display: 'block',
              },
              '&:hover .membership-card__body': {
                height: '100%',
                transition: 'all 0.25s ease-out',
              },
              '&:hover .membership-card__footer': {
                height: '0%',
                transition: 'all 0.25s ease-out',
              },
            }
          : undefined
      }
    >
      <CardHeader
        justify='space-between'
        direction='horizontal'
        zIndex={2}
        position='absolute'
        t={0}
        l={0}
        r={0}
        p={4}
      >
        {data.endDate ? <LiveTag /> : <Box />}
        <IconButton ariaLabel='add to watchlist' icon='eye-show' />
      </CardHeader>
      <CardBody
        h='100%'
        w='100%'
        overflow='hidden'
        className='membership-card__body'
        css={{
          borderTopLeftRadius: '$3',
          borderTopRightRadius: '$3',
        }}
      >
        <Image
          w='100%'
          // src={data.coverImage}
          src={Asset.Image.DummyMembershipCover}
          fallbackSrc={Asset.Image.LightPlaceholder}
          alt={`${data.name}'s club cover image.`}
        />
      </CardBody>
      <CardFooter
        h={`calc(${h}px + 2*$4)`}
        w='100%'
        className='membership-card__footer'
        overflow='hidden'
        css={{
          borderBottomLeftRadius: '$2',
          borderBottomRightRadius: '$2',
        }}
      >
        {/* Content */}
        <Box className='membership-card-footer__content' w='100%'>
          <VStack gap={3} id='membership_footer' p={4} h='fit-content'>
            {data.name && (
              <Heading size={5} weight={400} color='white100'>
                {data.name}
              </Heading>
            )}
            {data.price && (
              <TextGroup gap={0}>
                <TextGroupHeading size={1} weight={400} casing='uppercase'>
                  Entry Price
                </TextGroupHeading>
                <TextGroupSubheading size={5} weight={500}>
                  ${data.price.toFixed(2)} USD
                </TextGroupSubheading>
              </TextGroup>
            )}
          </VStack>
        </Box>
        {/* Overlay */}
        <Box
          className='membership-card-footer__overlay'
          position='absolute'
          bgColor='#30304bcf'
          blur='sm'
          h={0}
          b={0}
          w='100%'
          r={0}
        >
          <Box position='relative' display='none' h='100%'>
            <Box position='absolute' b={0} l={0} w='100%' p={4} h='87.5%'>
              <VStack gap={3}>
                <Heading noOfLines={1} size={5} weight={400} as='h5'>
                  {data.name}
                </Heading>
                {data.price && (
                  <TextGroup gap={0}>
                    <TextGroupHeading
                      size={1}
                      weight={400}
                      casing='uppercase'
                    >
                      Entry Price
                    </TextGroupHeading>
                    <TextGroupSubheading size={5} weight={500}>
                      ${data.price} USD
                    </TextGroupSubheading>
                  </TextGroup>
                )}
              </VStack>
              <Box
                my={4}
                bgColor='rgba(152, 152, 255, 0.10)'
                h='1px'
                w='100%'
              />
              {data.perks && (
                <VStack maxHeight='50%' overflow='hidden'>
                  <Heading color='purple50' size={3} as='h3' weight={500}>
                    Membership Perks
                  </Heading>
                  <FlatList
                    mt={3}
                    gap={2}
                    direction='vertical'
                    data={data.perks.slice(0, 3)}
                    renderItem={(item) => (
                      <HStack gap={2} items='center'>
                        <Circle size='4px' bgColor='purple50' />
                        <Text noOfLines={1} size={2}>
                          {item}
                        </Text>
                      </HStack>
                    )}
                    keyExtractor={(item) => item}
                  />
                </VStack>
              )}
            </Box>
          </Box>
        </Box>
      </CardFooter>
    </Card>
  );
}

export default MembershipCard;
