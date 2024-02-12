import {
  Box,
  Card,
  Circle,
  HStack,
  IconButton,
  Image,
  Text,
  VStack,
} from '@holdr-ui/react';
import { Asset, TextGroup, TextGroupSubheading } from '../../../shared';
import { OnSaleMembershipModel } from '../shared';
import { keyframes } from '@stitches/react';

export const blink = keyframes({
  '0%': { opacity: 1 },
  '100%': { opacity: 0 },
});

function MembershipAuctionCard({ data }: { data: OnSaleMembershipModel }) {
  return (
    <Card w='288px' minWidth='288px' boxShadow='none' position='relative'>
      <Card.Header
        position='absolute'
        zIndex={1}
        l='16px'
        r='16px'
        t='16px'
        justify='space-between'
        direction='horizontal'
        items='center'
      >
        <HStack
          items='center'
          px='12px'
          py='10px'
          gap={2}
          bgColor='darkTint500'
          radius='full'
          css={{
            userSelect: 'none',
            backdropFilter: 'blur(4px)',
            border: '1px solid rgba(254, 254, 253, 0.25)',
          }}
        >
          <Circle
            size='6px'
            css={{
              backgroundColor: '#5CE581',
              animation: `1s ease 0s infinite normal none running ${blink}`,
            }}
          />
          <Text size='12px' casing='uppercase' css={{ color: '#5CE581' }}>
            Live
          </Text>
        </HStack>
        <IconButton
          colorTheme='darkTint500'
          icon='eye-show'
          ariaLabel='add to watchlist'
        />
      </Card.Header>
      <Card.Body h={256}>
        <Image
          src={data.coverImage}
          fallbackSrc={Asset.Image.LightPlaceholder}
        />
      </Card.Body>
      <Card.Footer
        css={{
          backgroundColor: '#30304B',
          border: '1px solid rgba(152, 152, 255, 0.10)',
        }}
        px={4}
        pt={4}
        pb={6}
      >
        <VStack gap={4}>
          <Box fontSize='20px'>
            <Text>{data.name}</Text>
          </Box>
          <TextGroup>
            <TextGroupSubheading size='12px' casing='uppercase'>
              Entry Price
            </TextGroupSubheading>
            <TextGroupSubheading weight={500} size='18px'>
              ${data.price.toFixed(2)} USD
            </TextGroupSubheading>
          </TextGroup>
        </VStack>
      </Card.Footer>
    </Card>
  );
}

MembershipAuctionCard.displayName = 'MembershipAuctionCard';

export default MembershipAuctionCard;
