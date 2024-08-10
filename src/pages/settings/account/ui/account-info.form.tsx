import {
  CountryPicker,
  DatePicker,
  DateUtility,
  FieldLengths,
  handleFieldError,
  hasAllUndefinedKeyValues,
  InputLoadingIndicator,
  InputTextField,
  MinAge,
  missingField,
  Patterns,
  PrimaryTooltip,
  RoleGuard,
  TextGroup,
  TextGroupHeading,
  TextGroupSubheading,
} from '../../../../shared';
import {
  Box,
  Button,
  HStack,
  useRecordState,
  VStack,
} from '@holdr-ui/react';
import dayjs from 'dayjs';
import {
  useAccountInfoSuspenseQuery,
  useDebouncedCheckIsUniqueField,
  UserRoleEnum,
} from '../../../../features';
import { Fragment } from 'react';
import { useUpdateAccountInfoMutation } from '../../../../features/user/mutations/use-update-account-info.mutation';

interface IAccountInfo {
  username: string;
  birthday: string;
  country: string;
}

function AccountInfoForm() {
  const { data } = useAccountInfoSuspenseQuery();
  const { update: updateAccountInfo, loading: loadingMutation } =
    useUpdateAccountInfoMutation();

  const birthdayAsTZ = dayjs(data.accountInfo.birthday, 'X').toString();

  const [state, update] = useRecordState<IAccountInfo>({
    username: data.accountInfo.username,
    birthday: birthdayAsTZ,
    country: data.accountInfo.country,
  });

  const nothingHasChanged =
    state.country === data.accountInfo.country &&
    state.birthday === birthdayAsTZ &&
    state.username === data.accountInfo.username;

  const [checkIsUnique, { loading: loadingCheckResult, isUnique }] =
    useDebouncedCheckIsUniqueField();

  const minAgeYear = dayjs().subtract(MinAge, 'years');
  const birthday = dayjs(state.birthday, 'YYYY-MM-DD');

  const usernameError =
    !nothingHasChanged && isUnique !== undefined && !isUnique
      ? 'Username is already in use.'
      : handleFieldError(state.username, {
          keyName: 'Username',
          min: { length: FieldLengths.username.min },
          max: { length: FieldLengths.username.max },
          pattern: {
            value: Patterns.Username,
            message: 'Username must be alphanumeric',
          },
        });

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
    <Fragment>
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
        as='form'
        onSubmit={async (e) => {
          e.preventDefault();

          const res = await updateAccountInfo(state);

          if (!res || !res.data || !res.data.updateAccountInfo) return;

          update({
            username: res.data.updateAccountInfo.username,
            country: res.data.updateAccountInfo.country,
            birthday: dayjs(
              res.data.updateAccountInfo.birthday,
              'X',
            ).toString(),
          });
        }}
      >
        <InputTextField
          rightElement={
            <InputLoadingIndicator loading={loadingCheckResult} />
          }
          minLength={FieldLengths.username.min}
          maxLength={FieldLengths.username.max}
          value={state.username}
          errorText={usernameError}
          onChange={async (e) => {
            const value = e.target.value.replace(/[^\w]/gm, '');

            update({ username: value });

            checkIsUnique(value, 'username');
          }}
          label='Username'
          name='username'
        />

        <RoleGuard roles={[UserRoleEnum.GeneralUser]}>
          <Box
            my={5}
            h='1px'
            w='full'
            bgColor='rgba(152, 152, 255, 0.05)'
          />
          <CountryPicker
            value={state.country}
            onChange={(country) =>
              update({
                country,
              })
            }
          />
        </RoleGuard>

        <Box h='1px' my={5} w='full' bgColor='rgba(152, 152, 255, 0.05)' />

        <DatePicker
          label='Date of Birth'
          name='birthday'
          tooltip={
            <PrimaryTooltip text='We will never share your date of birth publicly.' />
          }
          date={state.birthday}
          onChange={(birthday) => update({ birthday })}
          errorText={birthdayError}
        />
        <HStack my={5} py={3} justify='flex-end'>
          <Button
            isLoading={loadingMutation}
            loadingText='Update'
            disabled={
              loadingMutation ||
              loadingCheckResult ||
              nothingHasChanged ||
              missingField({
                username: state.username,
                birthday: state.birthday,
              }) ||
              !hasAllUndefinedKeyValues({
                usernameError,
                birthdayError,
              })
            }
            colorTheme='purple500'
            radius={1}
            css={{ px: '30px' }}
          >
            Update
          </Button>
        </HStack>
      </VStack>
    </Fragment>
  );
}
AccountInfoForm.displayName = 'AccountInfoForm';

export default AccountInfoForm;

// const radioStyles = {
//   '& > label > span:nth-of-type(1)': {
//     backgroundColor: 'rgba(152, 152, 255, 0.1) !important',
//     outline: '1px solid rgba(152, 152, 255, 0.4)',
//   },
//
//   '& > label > span:nth-of-type(1) > span': {
//     backgroundColor: 'white',
//   },
// };
//
// const RadioItem = ({ label, value }: { label: string; value: string }) => {
//   return (
//     <HStack p={2} justify='space-between' as='label' css={radioStyles}>
//       <Text>{label}</Text>
//       <Radio value={value} labelledBy={value} />
//     </HStack>
//   );
// };
//
// RadioItem.displayName = 'Radio';
//
// function ChangeGender() {
//   return (
//     <VStack>
//       <Label name='gender' text='Gender' />
//       <RadioGroup defaultValue='male' gap={2} direction='vertical'>
//         <RadioItem value='female' label='Female' />
//         <RadioItem value='male' label='Male' />
//         <RadioItem value='specify' label='Specify' />
//       </RadioGroup>
//     </VStack>
//   );
// }
