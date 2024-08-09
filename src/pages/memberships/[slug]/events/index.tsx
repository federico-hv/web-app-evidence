import {
  Box,
  Center,
  Container,
  Heading,
  Icon,
  VStack,
} from '@holdr-ui/react';
import { useLocation, useParams } from 'react-router-dom';
import {
  InputTextField,
  makePath,
  useNavigateWithPreviousLocation,
} from '../../../../shared';
import { CreateMembershipItem } from '../ui';
import { MembershipEventSection } from './ui';
import { dummyMembershipEvents } from './constants';

function MembershipEventPage() {
  const { slug } = useParams();

  const location = useLocation();
  const navigate = useNavigateWithPreviousLocation(location.pathname);

  const goto = () =>
    navigate(
      makePath(['memberships', slug ?? '', 'create', 'event-perk']),
    );

  return (
    <Container maxWidth={1280} pb={10}>
      <VStack w='full'>
        <Heading size={6} weight={400}>
          Event Perks
        </Heading>
        <Box mt={4}>
          <InputTextField
            className=''
            color='black500'
            leftElement={
              <Center pr={3}>
                <Icon name='search-outline' />
              </Center>
            }
            placeholder='Country, City or Zip Code'
            radius='full'
            name='search'
            type='search'
          />
        </Box>
        <Box mt={8}>
          <CreateMembershipItem
            text='Add a new event perk'
            onClick={goto}
          />
        </Box>
        <VStack mt={8} css={{ gap: '48px' }}>
          <MembershipEventSection
            data={{ month: 'September', events: dummyMembershipEvents }}
          />
        </VStack>
      </VStack>
    </Container>
  );
}

export default MembershipEventPage;
