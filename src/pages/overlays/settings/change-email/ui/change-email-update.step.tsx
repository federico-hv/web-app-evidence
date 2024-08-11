import {
  Button,
  HStack,
  useGeneralContext,
  VStack,
} from '@holdr-ui/react';
import {
  useDebouncedCheckIsUniqueField,
  useSendVerificationCodeMutation,
  VerificationChannelEnum,
} from '../../../../../features';
import {
  handleFieldError,
  hasAllUndefinedKeyValues,
  InputTextField,
  makeButtonLarger,
  missingField,
  Patterns,
  TextGroup,
  TextGroupHeading,
  TextGroupSubheading,
  useStepperContext,
} from '../../../../../shared';
import { IUpdateEmail } from '../shared/types';
import { useState } from 'react';

function ChangeEmailUpdateStep() {
  const { state, update } = useGeneralContext<IUpdateEmail>();

  const [initialEmail] = useState(state.email);

  const [checkIsUnique, { loading: loadingCheckUniqueness, isUnique }] =
    useDebouncedCheckIsUniqueField();

  const { sendVerificationCode, loading } =
    useSendVerificationCodeMutation();

  const { increment, decrement } = useStepperContext();

  const nothingHasChanged = initialEmail === state.email;

  const emailError =
    !nothingHasChanged && isUnique !== undefined && !isUnique
      ? 'Email is already in use.'
      : handleFieldError(state.email, {
          keyName: 'email',
          pattern: {
            value: Patterns.Email,
            message: 'Enter a valid email address.',
          },
        });

  return (
    <VStack flex={1} px={5} pb={5}>
      <TextGroup>
        <TextGroupHeading as='h2' weight={500} size={3}>
          Update your email
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

          const res = await sendVerificationCode(
            state.email,
            VerificationChannelEnum.Email,
          );

          if (!res || !res.data || !res.data.sendVerificationCode) return;

          increment();
        }}
        flex={1}
        justify='space-between'
      >
        <InputTextField
          value={state.email}
          onChange={async (e) => {
            const email = e.target.value;

            update({ email });

            await checkIsUnique(email, 'email');
          }}
          name='email'
          label='Email'
          errorText={emailError}
          onFocus={(e) => e.target.select()}
        />
        <HStack
          justify='flex-end'
          borderTop={1}
          borderColor='rgba(152, 152, 255, 0.1)'
          pt={5}
          gap={5}
        >
          <Button
            onClick={() => {
              update({ email: initialEmail });
              decrement();
            }}
            variant='ghost'
            colorTheme='white700'
            className={makeButtonLarger('2.75rem')}
            css={{ px: '$8', py: '$4', border: 'unset' }}
            radius={1}
          >
            Back
          </Button>
          <Button
            isLoading={loading}
            loadingText='Send code'
            disabled={
              loading ||
              loadingCheckUniqueness ||
              nothingHasChanged ||
              missingField(state) ||
              !hasAllUndefinedKeyValues({
                emailError,
              })
            }
            type='submit'
            colorTheme='purple500'
            className={makeButtonLarger('2.75rem')}
            css={{ px: '$8', py: '$4' }}
            radius={1}
          >
            Send code
          </Button>
        </HStack>
      </VStack>
    </VStack>
  );
}

export default ChangeEmailUpdateStep;
