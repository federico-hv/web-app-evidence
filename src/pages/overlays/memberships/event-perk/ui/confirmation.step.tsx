import { useLocation, useNavigate } from 'react-router-dom';
import { Button, Heading, Text, VStack } from '@holdr-ui/react';
import { makeButtonLarger } from '../../../../../shared';

function ConfirmationStep() {
  const navigate = useNavigate();
  const location = useLocation();

  const close = () => navigate(location.state?.previousLocation || '/');

  return (
    <VStack>
      <Heading align='center' size={6} weight={500}>
        Exclusive Perk Unlocked!
      </Heading>
      <Text weight={300} align='center'>
        Check your email to access your perk and follow the instructions to
        apply your perk
      </Text>
      <Button
        onClick={close}
        radius={1}
        className={makeButtonLarger('2.75rem')}
        colorTheme='purple500'
        fullWidth
        css={{ marginTop: '48px' }}
      >
        Close
      </Button>
    </VStack>
  );
}

export default ConfirmationStep;
