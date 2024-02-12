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
} from '../../../shared';
import { OnSaleMembershipModel } from '../shared';
import { cardFooterStyle, cardHoverStyle } from '../shared/styles';
import OpaquePlaceholder from './opaque-placeholder';
import MembershipCardPerkDetails from './membership-card-perk-details';

function MembershipAuctionCard({ data }: { data: OnSaleMembershipModel }) {
  return (
    <Card
      w='288px'
      minWidth='288px'
      h={376}
      boxShadow='none'
      position='relative'
      _hover={cardHoverStyle}
    >
      <Card.Header
        className='membership-card__header'
        position='absolute'
        zIndex={2}
        l='16px'
        r='16px'
        t='16px'
        justify='space-between'
        direction='horizontal'
        items='center'
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
        <OpaquePlaceholder />
        <VStack h={376}>
          <VStack
            className='membership-card__footer-content'
            gap={4}
            css={{
              transition: 'all 0.25s linear',
            }}
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
          <MembershipCardPerkDetails
            perks={['Perk 1', 'Perk 2', 'Perk 3']}
          />
        </VStack>
      </Card.Footer>
    </Card>
  );
}

MembershipAuctionCard.displayName = 'MembershipAuctionCard';

export default MembershipAuctionCard;
