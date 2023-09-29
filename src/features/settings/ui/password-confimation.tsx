import {
  Button,
  Heading,
  HStack,
  Input,
  Text,
  VStack,
} from '@holdr-ui/react';
import { ForgotPasswordLink } from '../../../shared';
import { HeaderLayout } from '../../../layout';

interface Props {
  backLink: string;
  name: string;
}

function PasswordConfirmation({ name, backLink }: Props) {
  return (
    <HeaderLayout title={name} backLink={backLink}>
      <VStack
        px={4}
        gap={2}
        borderBottom={2}
        borderColor='base100'
        minHeight={70}
        justify='center'
      >
        <Heading
          as='h2'
          size={4}
          weight={600}
          css={{ fontSize: 'larger' }}
        >
          Confirm your password
        </Heading>
        <Text color='base400' size={2}>
          Please enter your password to continue.
        </Text>
      </VStack>
      <VStack as='form' px={4} mt={5} gap={3}>
        <VStack gap={3}>
          <Input />
          <ForgotPasswordLink />
        </VStack>
        <HStack justify='flex-end'>
          <Button type='submit'>Continue</Button>
        </HStack>
      </VStack>
    </HeaderLayout>
  );
}

PasswordConfirmation.displayName = 'PasswordConfirmation';

export default PasswordConfirmation;
