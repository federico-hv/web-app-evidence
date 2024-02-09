import { HStack, Text } from '@holdr-ui/react';
import { MiddleDotFill } from '@holdr-ui/icons';

function LiveTag() {
  return (
    <HStack gap={2} items='center'>
      <MiddleDotFill color='success500' />
      <Text size={1} weight={500} color='success500' casing='uppercase'>
        Live
      </Text>
    </HStack>
  );
}

LiveTag.displayName = 'LiveTag';

export default LiveTag;
