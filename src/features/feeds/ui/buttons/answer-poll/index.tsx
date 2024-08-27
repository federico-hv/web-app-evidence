import { Circle, HStack, Text } from '@holdr-ui/react';
import { AnswerPollButtonProps } from './types';

function AnswerPollButton({ label, onClick }: AnswerPollButtonProps) {
  return (
    <HStack
      as='button'
      onClick={onClick}
      cursor='pointer'
      role='button'
      p={2}
      position='relative'
      overflow='hidden'
      items='center'
      radius={1}
      gap={2}
      _hover={{
        backgroundColor: 'rgba(152, 152, 255, 0.1)',
      }}
      css={{
        userSelect: 'none',
      }}
    >
      {/** 👇🏾 Label */}
      <Circle
        bgColor='rbg(60,60,75)'
        size={16}
        border={2}
        borderColor='white500'
      />
      <Text
        size={{ '@bp1': 2, '@bp3': 3 }}
        weight={500}
        noOfLines={1}
        css={{ zIndex: 10 }}
      >
        {label}
      </Text>
    </HStack>
  );
}
AnswerPollButton.displayName = 'AnswerPollButton';

export default AnswerPollButton;
