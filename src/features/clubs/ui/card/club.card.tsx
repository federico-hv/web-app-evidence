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
import FollowCountItem from '../../../../features/relationships/ui/follow-count-item';

export interface ClubCardData {
  clubId: string;
  /** The date that an auction ends */
  coverImage?: string;
  /** The artist name */
  name?: string;

  followers: number;
  following: number;
}

function ClubCard({
  data,
  showPerksOnHover = true,
  onWatchClick,
  watchlist,
}: {
  /** Show the perks when hovered. Set to true by default */
  showPerksOnHover?: boolean;
  data: ClubCardData;
  onWatchClick: () => void;
  watchlist?: boolean;
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
      cursor={'pointer'}
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
        <Box />
        <IconButton
          onClick={onWatchClick}
          ariaLabel='add to watchlist'
          icon='eye-show'
          css={
            watchlist
              ? {
                  color: '$purple200',
                }
              : {}
          }
        />
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
          src={data.coverImage}
          srcSet={data.coverImage}
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
              <Heading size={'20px'} weight={400} color='white100'>
                {data.name}
              </Heading>
            )}
            <Box bgColor='rgba(152, 152, 255, 0.10)' h='1px' w='100%' />
            <HStack
              items='center'
              gap={3}
              divider={<Circle bgColor='black300' size='5px' />}
            >
              <FollowCountItem
                onClick={() => {}}
                count={data.followers}
                label='Followers'
                labelOneSize='14px'
                labelTwoSize='12px'
              />
              <FollowCountItem
                onClick={() => {}}
                count={data.following}
                label='Following'
                labelOneSize='14px'
                labelTwoSize='12px'
              />
            </HStack>
          </VStack>
        </Box>
        {/* Overlay */}
        <Box
          className='membership-card-footer__overlay'
          position='absolute'
          bgColor='#30304bcf'
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
              h='87.5%'
            >
              <Box
                my={4}
                bgColor='rgba(152, 152, 255, 0.10)'
                h='1px'
                w='100%'
              />
              <HStack
                items='center'
                gap={3}
                divider={<Circle bgColor='black300' size='5px' />}
              >
                <FollowCountItem
                  onClick={() => {}}
                  count={data.followers}
                  label='Followers'
                  labelOneSize='14px'
                  labelTwoSize='12px'
                />
                <FollowCountItem
                  onClick={() => {}}
                  count={data.following}
                  label='Following'
                  labelOneSize='14px'
                  labelTwoSize='12px'
                />
              </HStack>
            </VStack>
          </Box>
        </Box>
      </CardFooter>
    </Card>
  );
}

export default ClubCard;
