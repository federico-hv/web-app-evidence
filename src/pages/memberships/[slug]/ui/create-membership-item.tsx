import { MouseEventHandler } from 'react';
import { Center, Heading, Icon, VStack } from '@holdr-ui/react';

function CreateMembershipItem({
  text,
  onClick,
}: {
  text: string;
  onClick: MouseEventHandler<HTMLDivElement>;
}) {
  return (
    <VStack
      border={2}
      radius={3}
      borderColor='black500'
      borderStyle='dashed'
      items='center'
      p={8}
      gap={4}
      onClick={onClick}
    >
      <Heading size={5} weight={500} as='h5'>
        {text}
      </Heading>
      <Center radius='full' bgColor='base100' p={1} fontSize={6}>
        <Icon name='add' />
      </Center>
    </VStack>
  );
}

export default CreateMembershipItem;
