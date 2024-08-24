import { useEffect, useState } from 'react';
import {
  Box,
  Card,
  CardBody,
  CardFooter,
  Circle,
  Heading,
  HStack,
  Image,
  Text,
  VStack,
} from '@holdr-ui/react';
import { Asset } from '../../../shared';
import { FlatList } from '../../../tmp/flat-list';

function MembershipCard({
  data,
  showPerksOnHover = true,
}: {
  /** Show the perks when hovered. Set to true by default */
  showPerksOnHover?: boolean;
  data: {
    /** The date that an auction ends */
    coverImage?: string;
    /** The id of the club*/
    id?: string;
    /** The artist name */
    name?: string;
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
      cursor={data.id ? 'pointer' : undefined}
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
          src={data.coverImage}
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
          borderBottomLeftRadius: '$3',
          borderBottomRightRadius: '$3',
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
            <VStack
              position='absolute'
              b={0}
              l={0}
              w='100%'
              p={4}
              h='100%'
            >
              <VStack gap={3}>
                <Heading noOfLines={1} size={5} weight={400} as='h5'>
                  {data.name}
                </Heading>
              </VStack>
              <Box
                my={4}
                bgColor='rgba(152, 152, 255, 0.10)'
                h='1px'
                w='100%'
              />
              {data.perks && (
                <VStack flex={1} overflow='hidden'>
                  <Heading color='purple50' size={3} as='h3' weight={500}>
                    Membership Perks
                  </Heading>
                  <FlatList
                    mt={3}
                    gap={2}
                    direction='vertical'
                    // data={data.perks.slice(0, 3)}
                    data={data.perks}
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
            </VStack>
          </Box>
        </Box>
      </CardFooter>
    </Card>
  );
}

export default MembershipCard;
