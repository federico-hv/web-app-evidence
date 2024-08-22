import { useLocation, useNavigate } from 'react-router-dom';
import {
  Button,
  HStack,
  useGeneralContext,
  useInputChange,
  VStack,
} from '@holdr-ui/react';
import {
  InputTextField,
  makeButtonLarger,
  makePath,
  Paths,
  TextGroup,
  TextGroupHeading,
  TextGroupSubheading,
  useStepperContext,
} from '../../../../../shared';
import {
  ContactChannelEnum,
  useUpdateContactInfoMutation,
} from '../../../../../features';
import { IUpdateEmail } from '../shared';
import { useState } from 'react';

function ChangeEmailVerificationStep() {
  const { state } = useGeneralContext<IUpdateEmail>();

  const [errorText, setErrorText] = useState('');

  const location = useLocation();
  const navigate = useNavigate();

  const { updateContactInfo, loading } = useUpdateContactInfoMutation();

  const { value, handleOnChange } = useInputChange('');

  const { decrement } = useStepperContext();

  return (
    <VStack flex={1} px={5} pb={5}>
      <TextGroup>
        <TextGroupHeading as='h2' weight={500} size={3}>
          Verify Code
        </TextGroupHeading>
        <TextGroupSubheading size={2} color='white700'>
          Enter the code that has been sent to the email address that you
          provided and we will confirm your identity.
        </TextGroupSubheading>
      </TextGroup>
      <VStack
        as='form'
        mt={8}
        onSubmit={async (e) => {
          e.preventDefault();

          const res = await updateContactInfo({
            code: value,
            contact: state.email,
            channel: ContactChannelEnum.Email,
          });

          if (!res || !res.data || !res.data.updateContactInfo) return;

          if (!res.data.updateContactInfo.isSuccess) {
            setErrorText(res.data.updateContactInfo.message);
            return;
          }

          navigate(
            location.state.previousLocation ??
              makePath([Paths.settings, Paths.setting.account]),
          );
        }}
        flex={1}
        justify='space-between'
      >
        <InputTextField
          value={value}
          onChange={(e) => {
            handleOnChange(e);
            setErrorText('');
          }}
          name='code'
          label='Enter verification code'
          errorText={errorText}
        />
        <HStack
          justify='flex-end'
          borderTop={1}
          borderColor='rgba(152, 152, 255, 0.1)'
          pt={5}
          gap={5}
        >
          <Button
            onClick={decrement}
            variant='ghost'
            colorTheme='white700'
            className={makeButtonLarger('2.75rem')}
            css={{ px: '$8', py: '$4', border: 'unset' }}
            radius={1}
          >
            Back
          </Button>
          <Button
            disabled={value.length === 0 || loading}
            isLoading={loading}
            loadingText='Update'
            type='submit'
            colorTheme='purple500'
            className={makeButtonLarger('2.75rem')}
            css={{ px: '$8', py: '$4' }}
            radius={1}
          >
            Update
          </Button>
        </HStack>
      </VStack>
    </VStack>
  );
}

export default ChangeEmailVerificationStep;
