import { HStack, Text, Circle } from '@holdr-ui/react';
import { keyframes } from '@stitches/react';

const blink = keyframes({
  '0%': { opacity: 1 },
  '100%': { opacity: 0 },
});

function LiveTag() {
  return (
    <HStack gap={2} items='center'>
      <Circle
        size='6px'
        bgColor='success500'
        css={{
          animation: `1s ease 0s infinite normal none running ${blink}`,
        }}
      />

      <Text size={1} weight={500} color='success500' casing='uppercase'>
        Live
      </Text>
    </HStack>
  );
}

LiveTag.displayName = 'LiveTag';

export default LiveTag;
