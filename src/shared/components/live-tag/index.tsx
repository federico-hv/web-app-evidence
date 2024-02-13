import { Circle, HStack, Text } from '@holdr-ui/react';
import { blink } from '../../styles';

function LiveTag() {
  return (
    <HStack
      items='center'
      px='12px'
      py='10px'
      gap={2}
      bgColor='darkTint500'
      radius='full'
      css={{
        userSelect: 'none',
        backdropFilter: 'blur(4px)',
        border: '1px solid rgba(254, 254, 253, 0.25)',
      }}
    >
      <Circle
        size='6px'
        css={{
          backgroundColor: '#5CE581',
          animation: `1s ease 0s infinite normal none running ${blink}`,
        }}
      />
      <Text size='12px' casing='uppercase' css={{ color: '#5CE581' }}>
        Live
      </Text>
    </HStack>
  );
}
LiveTag.displayName = 'LiveTag';

export default LiveTag;
