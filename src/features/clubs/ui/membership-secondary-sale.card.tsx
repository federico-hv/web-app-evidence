import {
  Box,
  Card,
  IconButton,
  Image,
  Text,
  VStack,
} from '@holdr-ui/react';
import { Asset, TextGroup, TextGroupSubheading } from '../../../shared';
import { OnSaleMembershipModel } from '../shared';

function MembershipSecondarySaleCard({
  data,
}: {
  data: OnSaleMembershipModel;
}) {
  return (
    <Card w='288px' minWidth='288px' boxShadow='none' position='relative'>
      <Card.Header
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
MembershipSecondarySaleCard.displayName = 'MembershipSecondarySaleCard';

export default MembershipSecondarySaleCard;
