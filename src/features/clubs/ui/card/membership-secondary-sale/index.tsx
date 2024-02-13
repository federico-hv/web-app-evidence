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
  TextGroup,
  TextGroupSubheading,
} from '../../../../../shared';
import { cardFooterStyle, cardHoverStyle } from '../../../shared/styles';
import { MembershipPerkDetails } from '../../groups';
import { MembershipSecondarySaleCardProps } from './types';
import { OpaquePlaceholder } from '../../support';

function MembershipSecondarySaleCard({
  data,
}: MembershipSecondarySaleCardProps) {
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
        zIndex={1}
        l='16px'
        r='16px'
        t='16px'
        justify='flex-end'
        direction='horizontal'
      >
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
          <MembershipPerkDetails perks={['Perk 1', 'Perk 2', 'Perk 3']} />
        </VStack>
      </Card.Footer>
    </Card>
  );
}
MembershipSecondarySaleCard.displayName = 'MembershipSecondarySaleCard';

export default MembershipSecondarySaleCard;
