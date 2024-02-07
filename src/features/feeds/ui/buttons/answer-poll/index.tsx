import { Center, Text, theme } from '@holdr-ui/react';
import { AnswerPollButtonProps } from './types';

function AnswerPollButton({ label, onClick }: AnswerPollButtonProps) {
  return (
    <Center
      as='button'
      onClick={onClick}
      cursor='pointer'
      role='button'
      p={3}
      border={1}
      radius='full'
      borderColor='base200'
      position='relative'
      overflow='hidden'
      _hover={{
        backgroundColor: '$base100',
      }}
      css={{
        userSelect: 'none',
        '&:active': {
          scale: 0.95,
          transition: `all ${theme.transitions['duration-normal']} linear`,
        },
      }}
    >
      {/** 👇🏾 Label */}
      <Text
        size={{ '@bp1': 2, '@bp3': 3 }}
        weight={500}
        noOfLines={1}
        css={{ zIndex: 10 }}
      >
        {label}
      </Text>
    </Center>
  );
}
AnswerPollButton.displayName = 'AnswerPollButton';

export default AnswerPollButton;
