import {
  Box,
  Center,
  CircularProgress,
  FormControl,
  HStack,
  Icon,
  Input,
  InputGroup,
  Text,
  VStack,
} from '@holdr-ui/react';
import { ChangeEvent, useEffect, useState } from 'react';
import { CreatePostInput } from '../shared';

function Choice({
  title,
  value,
  update,
}: {
  title: string;
  value: string;
  update: (value: string) => void;
}) {
  const MAXIMUM_CHARACTERS = 25;

  return (
    <Box>
      <FormControl>
        <FormControl.Label>{title}</FormControl.Label>
        <InputGroup>
          <Input
            value={value}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              update(e.target.value)
            }
            maxLength={MAXIMUM_CHARACTERS}
            placeholder={title}
          />
          <InputGroup.RightElement>
            <CircularProgress
              thickness={3}
              value={Math.ceil((value.length / MAXIMUM_CHARACTERS) * 100)}
            />
          </InputGroup.RightElement>
        </InputGroup>
      </FormControl>
    </Box>
  );
}

function AddPoll({
  update,
  remove,
  reset,
  increaseHeight,
}: {
  update: (state: Partial<CreatePostInput>) => void;
  remove: VoidFunction;
  reset: VoidFunction;
  increaseHeight: (amount: number) => void;
}) {
  const MaximumOptions = 4;
  const [responses, set] = useState(['', '']);

  const addPoll = () => set((prev) => [...prev, '']);

  const updatePoll = (text: string, idx: number) =>
    set((prev) => {
      // replace elem at idx
      const newResponses = [
        ...prev.slice(0, idx),
        text,
        ...prev.slice(idx + 1),
      ];
      // update state
      update({ responses: newResponses });
      // return new responses
      return newResponses;
    });

  useEffect(() => {
    update({ responses });
  }, []);

  return (
    <VStack
      position='relative'
      border={1}
      borderColor='base200'
      maxHeight={350}
      h='auto'
      w='100%'
      radius={2}
    >
      <VStack h='full' w='full' radius={2} p={3}>
        {responses.map((current, idx) => (
          <Choice
            key={`choice-${idx + 1}`}
            title={`Choice ${idx + 1}`}
            value={responses[idx]}
            update={(value) => updatePoll(value, idx)}
          />
        ))}
        {responses.length < MaximumOptions && (
          <HStack
            py={4}
            gap={3}
            items='center'
            justify='center'
            bgColor='base100'
            radius={2}
            _hover={{ backgroundColor: '$base200' }}
            onClick={() => {
              increaseHeight(62.5);
              addPoll();
            }}
          >
            <Icon color='base600' name='add' size='lg' />
            <Text weight={500} color='base600'>
              Add Choice
            </Text>
          </HStack>
        )}
      </VStack>
      <Center
        onClick={() => {
          remove();
          reset();
        }}
        p={4}
        borderTop={1}
        borderColor='base200'
        _hover={{ backgroundColor: '#f2464617' }}
      >
        <Text weight={500} color='danger'>
          Remove poll
        </Text>
      </Center>
    </VStack>
  );
}
AddPoll.displayName = 'AddPoll';

export default AddPoll;
