import {
  CountryPicker,
  DatePicker,
  DateUtility,
  handleFieldError,
  InputTextField,
  Label,
  MinAge,
  TextGroup,
  TextGroupHeading,
  TextGroupSubheading,
} from '../../../../shared';
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTrigger,
  HStack,
  Radio,
  RadioGroup,
  Text,
  useDisclosure,
  useRecordState,
  VStack,
} from '@holdr-ui/react';
import dayjs from 'dayjs';

const radioStyles = {
  '& > label > span:nth-of-type(1)': {
    backgroundColor: 'rgba(152, 152, 255, 0.1) !important',
    outline: '1px solid rgba(152, 152, 255, 0.4)',
  },

  '& > label > span:nth-of-type(1) > span': {
    backgroundColor: 'white',
  },
};

const RadioItem = ({ label, value }: { label: string; value: string }) => {
  return (
    <HStack p={2} justify='space-between' as='label' css={radioStyles}>
      <Text>{label}</Text>
      <Radio value={value} labelledBy={value} />
    </HStack>
  );
};

RadioItem.displayName = 'Radio';

function ChangeGender() {
  return (
    <VStack>
      <Label name='gender' text='Gender' />
      <RadioGroup defaultValue='male' gap={2} direction='vertical'>
        <RadioItem value='female' label='Female' />
        <RadioItem value='male' label='Male' />
        <RadioItem value='specify' label='Specify' />
      </RadioGroup>
    </VStack>
  );
}

function AccountInfoForm() {
  const [state, update] = useRecordState({
    username: '',
    gender: '',
    birthday: dayjs().subtract(MinAge, 'y').toString(),
  });

  const minAgeYear = dayjs().subtract(MinAge, 'years');
  const birthday = dayjs(state.birthday, 'YYYY-MM-DD');

  const birthdayError = handleFieldError(state.birthday, {
    keyName: 'Date of Birth',
    compare: {
      message: {
        fn: `You must be ${MinAge} years or older.`,
      },
      fn: DateUtility.difference(birthday, minAgeYear, 's') > 0,
    },
  });

  return (
    <Box>
      <TextGroup>
        <TextGroupHeading size={3} weight={400}>
          Account Information
        </TextGroupHeading>
        <TextGroupSubheading size={2} weight={300} color='white700'>
          Update information like your country or username
        </TextGroupSubheading>
      </TextGroup>
      <VStack
        border={1}
        borderColor='rgba(152, 152, 255, 0.1)'
        bgColor='rgba(48, 48, 75, 0.6)'
        py={5}
        px={4}
        radius={3}
        mt={4}
        gap={5}
        divider={
          <Box
            h='1px'
            w='full'
            bgColor='rgba(152, 152, 255, 0.05)
'
          />
        }
        as='form'
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <InputTextField label='Username' name='username' />
        <CountryPicker />
        {/*<ChangeGender />*/}
        <DatePicker
          label='Date of Birth'
          name='birthday'
          tooltip='We will never share your date of birth publicly.'
          date={state.birthday}
          onChange={(date) => update({ birthday: date })}
          errorText={birthdayError}
        />
        <HStack py={3} justify='flex-end'>
          <Button
            disabled
            colorTheme='purple500'
            radius={1}
            css={{ px: '30px' }}
          >
            Update
          </Button>
        </HStack>
      </VStack>
    </Box>
  );
}
AccountInfoForm.displayName = 'AccountInfoForm';

export default AccountInfoForm;
