import { useNavigate } from 'react-router-dom';
import {
  arrayFrom,
  TextGroup,
  TextGroupHeading,
  TextGroupSubheading,
  usePreviousLocation,
} from '../../../../shared';
import { Avatar, Button, HStack, VStack } from '@holdr-ui/react';

function FanRecommendationsPage() {
  const navigate = useNavigate();

  const previousLocation = usePreviousLocation('/');

  return (
    <VStack h='100%' justify='space-between'>
      <TextGroup>
        <TextGroupHeading
          weight={600}
          size='36px'
          align='center'
          css={{ lineHeight: '115%' }}
        >
          Start following
        </TextGroupHeading>
        <TextGroupSubheading
          weight={300}
          size='16px'
          align='center'
          css={{ lineHeight: '115%' }}
        >
          To stay informed about your favorite artists, start following
          them now
        </TextGroupSubheading>
      </TextGroup>

      <VStack h={288} overflowY='auto' pr={4} className='thin-scrollbar'>
        {arrayFrom(10).map((id) => (
          <HStack
            items='center'
            justify='space-between'
            key={'artist-stub_' + id}
            py={1}
          >
            <HStack gap={2}>
              <Avatar variant='squircle' css={{ size: '40px' }} />
              <TextGroup gap={0}>
                <TextGroupHeading as='h5' size={1} weight={500}>
                  artist name
                </TextGroupHeading>
                <TextGroupSubheading color='white700' size={1}>
                  @handle
                </TextGroupSubheading>
              </TextGroup>
            </HStack>
            <Button
              variant='outline'
              colorTheme='white500'
              size='sm'
              css={{ minHeight: '1.75rem' }}
            >
              Follow
            </Button>
          </HStack>
        ))}
      </VStack>

      <Button
        onClick={() => navigate(previousLocation)}
        fullWidth
        colorTheme='purple500'
        radius={2}
        css={{
          minHeight: '2.75rem',
        }}
      >
        Continue
      </Button>
    </VStack>
  );
}
FanRecommendationsPage.displayName = 'FanRecommendationsPage';

export default FanRecommendationsPage;
