import { HStack, Text, Icon } from '@holdr-ui/react';

function LiveTag() {
  return (
    <HStack gap={2} items='center'>
      <Icon name="middle-dot-fill" color="success500"/>
      <Text size={1} weight={500} color='success500' casing='uppercase'>
        Live
      </Text>
    </HStack>
  );
}

LiveTag.displayName = 'LiveTag';

export default LiveTag;
