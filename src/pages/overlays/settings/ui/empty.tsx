import {
  Center,
  Heading,
  HStack,
  Icon,
  Text,
  VStack,
} from '@holdr-ui/react';

function Empty({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <HStack
      gap={2}
      radius={1}
      p={2}
      items='flex-start'
      bgColor='rgba(152, 152, 255, 0.25)'
    >
      <Center mt='6px'>
        <Icon name='information-outline' />
      </Center>
      <VStack>
        <Heading as='h2' weight={600} size={3}>
          {title}
        </Heading>
        <Text size={2} color='white700'>
          {subtitle}
        </Text>
      </VStack>
    </HStack>
  );
}

export default Empty;
