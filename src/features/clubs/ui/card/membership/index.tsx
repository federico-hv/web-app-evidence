import {
  Box,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  IconButton,
  Image,
  Text,
  VStack,
} from '@holdr-ui/react';
import { MembershipCardProps } from './types';
import {
  cardFooterStyle,
  cardHoverStyle,
  transitionDelay,
} from '../../../shared';
import { Asset } from '../../../../../shared';
import { MembershipPerkDetails } from '../../groups';

//TODO: Extend card to work as an auction card, membership card and secondary sale card
// using props

function MembershipCard({ data }: MembershipCardProps) {
  return (
    <Card
      w='100%'
      minWidth='272px'
      maxWidth='272px'
      h={376}
      boxShadow='none'
      position='relative'
      _hover={cardHoverStyle}
      css={{ border: '1px solid rgba(152, 152, 255, 0.10)' }}
    >
      <CardHeader
        className='membership-card__header'
        position='absolute'
        l='16px'
        r='16px'
        t='16px'
        justify='flex-end'
        direction='horizontal'
        items='center'
        zIndex={1}
      >
        <IconButton
          colorTheme='darkTint500'
          icon='eye-show'
          ariaLabel='add to watchlist'
        />
      </CardHeader>
      <CardBody className='membership-card__body' h={376}>
        <Image
          src={data.coverImage}
          fallbackSrc={Asset.Image.LightPlaceholder}
        />
      </CardBody>
      <CardFooter
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
            </VStack>
            <MembershipPerkDetails
              perks={['Perk 1', 'Perk 2', 'Perk 3']}
            />
          </Box>
        </VStack>
      </CardFooter>
    </Card>
  );
}
MembershipCard.displayName = 'MembershipCard';

export default MembershipCard;
