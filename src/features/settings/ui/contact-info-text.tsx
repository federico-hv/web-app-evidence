import { TextGroup, TextGroupSubheading } from '../../../shared';
import { Text, VStack } from '@holdr-ui/react';

function ContactInfoText({
  type,
  value,
}: {
  type: 'email' | 'phone number';
  value: string;
}) {
  return (
    <>
      {value ? (
        <TextGroup gap={3}>
          <TextGroupSubheading>
            Your current {type} is{' '}
            <Text as='span' weight={500} css={{ display: 'inline' }}>
              {value}
            </Text>
            . What would you like to change it to?
          </TextGroupSubheading>
          <TextGroupSubheading size={2} color='base400'>
            Your {type} is not publicly visible on Holdr.
          </TextGroupSubheading>
        </TextGroup>
      ) : (
        <VStack gap={2}>
          <Text>
            Provide the {type} you would like to link to your Holdr
            account.
          </Text>
        </VStack>
      )}
    </>
  );
}

export default ContactInfoText;
