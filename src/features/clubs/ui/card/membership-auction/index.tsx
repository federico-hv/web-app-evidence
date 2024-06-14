import {
  Box,
  Card,
  IconButton,
  Image,
  Text,
  VStack,
} from '@holdr-ui/react';
import {
  Asset,
  LiveTag,
  TextGroup,
  TextGroupSubheading,
} from '../../../../../shared';
import {
  cardFooterStyle,
  cardHoverStyle,
  transitionDelay,
} from '../../../shared';
import { MembershipAuctionCardProps } from './types';
import { MembershipPerkDetails } from '../../groups';

// TODO: DEPRECATE

function MembershipAuctionCard({ data }: MembershipAuctionCardProps) {
  return (
    <Card
      w='100%'
      minWidth='288px'
      h={376}
      boxShadow='none'
      position='relative'
      css={{
        border: '1px solid rgba(152, 152, 255, 0.10)',
      }}
      _hover={cardHoverStyle}
    >
      <Card.Header
        className='membership-card__header'
        position='absolute'
        l='16px'
        r='16px'
        t='16px'
        justify='space-between'
        direction='horizontal'
        items='center'
        zIndex={1}
      >
        <LiveTag />
        <IconButton
          colorTheme='darkTint500'
          icon='eye-show'
          ariaLabel='add to watchlist'
        />
      </Card.Header>
      <Card.Body className='membership-card__body' h={376}>
        <Image
          src={data.coverImage}
          // fallback src not working
          fallbackSrc={Asset.Image.LightPlaceholder}
        />
      </Card.Body>
      <Card.Footer
        position='relative'
        className='membership-card__footer'
        css={cardFooterStyle}
        px={4}
        pt={4}
        pb={6}
      >
        <VStack h={376} position='relative'>
          <Box
            className='membership-card__footer-wrapper'
            t={0}
            l={0}
            h='100%'
            w='100%'
            position='absolute'
            css={{
              transitionDelay: `${transitionDelay}s`,
            }}
          >
            <VStack
              h={90}
              className='membership-card__footer-content'
              gap={4}
            >
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
            <MembershipPerkDetails
              perks={['Perk 1', 'Perk 2', 'Perk 3']}
            />
          </Box>
        </VStack>
      </Card.Footer>
    </Card>
  );
}

MembershipAuctionCard.displayName = 'MembershipAuctionCard';

export default MembershipAuctionCard;
