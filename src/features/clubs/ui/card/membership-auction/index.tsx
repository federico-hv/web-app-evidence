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
} from '../../../shared/styles';
import { MembershipAuctionCardProps } from './types';
import { MembershipPerkDetails } from '../../groups';

function MembershipAuctionCard({ data }: MembershipAuctionCardProps) {
  return (
    <Card
      w='100%'
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
