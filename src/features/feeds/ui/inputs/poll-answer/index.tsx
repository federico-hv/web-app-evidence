import { PollAnswerInputProps } from './types';
import {
  InputGroup,
  InputGroupRightElement,
} from '../../../../../tmp/input-group';
import {
  Box,
  Circle,
  CircularProgress,
  HStack,
  Icon,
  Input,
} from '@holdr-ui/react';
import { darkInputStyles } from '../../../../../shared';
import { ChangeEvent } from 'react';

function PollAnswerInput({
  remove,
  title,
  value,
  update,
}: PollAnswerInputProps) {
  const MAXIMUM_CHARACTERS = 25;

  return (
    <InputGroup>
      <Input
        color='white500'
        className={darkInputStyles}
        placeholder={title}
        value={value}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          update(e.target.value)
        }
        maxLength={MAXIMUM_CHARACTERS}
      />
      <InputGroupRightElement>
        <HStack
          gap={3}
          items='center'
          divider={
            <Box h='18px' w='1px' bgColor='rgba(152, 152, 255, 0.1)' />
          }
        >
          <Box position='relative'>
            <CircularProgress
              colorTheme='purple500'
              size={24}
              thickness={{ '@bp1': 1, '@bp3': 3 }}
              value={Math.ceil((value.length / MAXIMUM_CHARACTERS) * 100)}
            />
            <Circle
              position='absolute'
              t='50%'
              l='50%'
              size={14}
              css={{
                transform: 'translate(-50%, -50%)',
              }}
              bgColor='white900'
            />
          </Box>
          <Circle
            as='button'
            onClick={remove}
            _hover={{
              backgroundColor: 'rgba(179, 180, 175, 0.75)',
            }}
            bgColor='rgba(179, 180, 175, 0.5)'
            size='18px'
            fontSize='12px'
          >
            <Icon name='close' />
          </Circle>
        </HStack>
      </InputGroupRightElement>
    </InputGroup>
    // <Box
    //   radius={1}
    //   css={{
    //     backgroundColor: hexToRGB('rgba(26, 26, 41, 0.75)'),
    //   }}
    // >
    //   <InputGroup focusColor='transparent' color='white500' radius={1}>
    //     <Input
    //       variant='unstyled'
    //       css={{
    //         '@bp1': { fontSize: '$2' },
    //         '@bp3': { fontSize: '$3' },
    //       }}
    //       color='white500'
    //       size={{ '@bp1': 'sm', '@bp3': 'base' }}
    //       value={value}
    //       onChange={(e: ChangeEvent<HTMLInputElement>) =>
    //         update(e.target.value)
    //       }
    //       maxLength={MAXIMUM_CHARACTERS}
    //       placeholder={title}
    //     />
    //     <InputGroup.RightElement>
    //       <CircularProgress
    //         colorTheme='purple500'
    //         size={{ '@bp1': 16, '@bp3': 24 }}
    //         thickness={{ '@bp1': 1, '@bp3': 3 }}
    //         value={Math.ceil((value.length / MAXIMUM_CHARACTERS) * 100)}
    //       />
    //     </InputGroup.RightElement>
    //   </InputGroup>
    // </Box>
  );
}
PollAnswerInput.displayName = 'PollAnswerInput';

export default PollAnswerInput;
