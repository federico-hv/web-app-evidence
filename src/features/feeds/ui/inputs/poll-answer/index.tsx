import { Box, CircularProgress, Input, InputGroup } from '@holdr-ui/react';
import { ChangeEvent } from 'react';
import { PollAnswerInputProps } from './types';

function PollAnswerInput({ title, value, update }: PollAnswerInputProps) {
  const MAXIMUM_CHARACTERS = 25;

  return (
    <Box>
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
    </Box>
  );
}
PollAnswerInput.displayName = 'PollAnswerInput';

export default PollAnswerInput;
