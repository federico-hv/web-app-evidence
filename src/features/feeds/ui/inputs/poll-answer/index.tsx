import {
  Box,
  CircularProgress,
  hexToRGB,
  Input,
  InputGroup,
} from '@holdr-ui/react';
import { ChangeEvent } from 'react';
import { PollAnswerInputProps } from './types';

function PollAnswerInput({ title, value, update }: PollAnswerInputProps) {
  const MAXIMUM_CHARACTERS = 25;

  return (
    <Box
      radius={1}
      css={{
        backgroundColor: hexToRGB('#9898FF', 0.15),
      }}
    >
      <InputGroup focusColor='transparent' color='white500' radius={1}>
        <Input
          variant='unstyled'
          css={{
            '@bp1': { fontSize: '$2' },
            '@bp3': { fontSize: '$3' },
          }}
          color='white500'
          size={{ '@bp1': 'sm', '@bp3': 'base' }}
          value={value}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            update(e.target.value)
          }
          maxLength={MAXIMUM_CHARACTERS}
          placeholder={title}
        />
        <InputGroup.RightElement>
          <CircularProgress
            colorTheme='purple500'
            size={{ '@bp1': 16, '@bp3': 24 }}
            thickness={{ '@bp1': 1, '@bp3': 3 }}
            value={Math.ceil((value.length / MAXIMUM_CHARACTERS) * 100)}
          />
        </InputGroup.RightElement>
      </InputGroup>
    </Box>
  );
}
PollAnswerInput.displayName = 'PollAnswerInput';

export default PollAnswerInput;
