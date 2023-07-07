import { Heading, Text, VStack } from '@holdr-ui/react';
import { ChangeContactInfoDialogSupportProps } from './change-contact-info.type';

function ChangeContactInfoHeader({
  name,
  value,
}: ChangeContactInfoDialogSupportProps) {
  return (
    <>
      {value ? (
        <Heading as='h3' size={3} casing='uppercase'>
          Change {name}
        </Heading>
      ) : (
        <Heading as='h3' size={3} casing='uppercase'>
          Add {name}
        </Heading>
      )}
    </>
  );
}

function ChangeContactInfoDialogBody({
  name,
  value,
}: ChangeContactInfoDialogSupportProps) {
  return (
    <>
      {value ? (
        <VStack gap={3}>
          <Text>
            Your current {name} is{' '}
            <Text as='span' weight={500} css={{ display: 'inline' }}>
              {value}
            </Text>
            . What would you like to change it to?
          </Text>
          <Text size={2} color='base400'>
            Your {name} is not publicly visible on Holdr.
          </Text>
        </VStack>
      ) : (
        <VStack gap={2}>
          <Text>
            Provide the {name} you would like to link to your Holdr
            account.
          </Text>
        </VStack>
      )}
    </>
  );
}

export { ChangeContactInfoDialogBody, ChangeContactInfoHeader };
