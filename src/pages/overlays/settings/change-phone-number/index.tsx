import {
  Box,
  Button,
  Heading,
  HStack,
  Image,
  useInputChange,
  VStack,
} from '@holdr-ui/react';
import {
  InputTextField,
  makeButtonLarger,
  makePath,
  Paths,
  Stepper,
  StepperStep,
  TextGroup,
  TextGroupHeading,
  TextGroupSubheading,
  useStepperContext,
} from '../../../../shared';
import { useLocation, useNavigate } from 'react-router-dom';

enum ChangeEmailStep {
  Overview,
  Update,
  Verification,
}

function ChangePhoneNumberOverviewStep() {
  const location = useLocation();
  const navigate = useNavigate();

  const { increment } = useStepperContext();

  return (
    <VStack flex={1} px={5} pb={5}>
      <TextGroup>
        <TextGroupHeading as='h2' weight={500} size={3}>
          Get started
        </TextGroupHeading>
        <TextGroupSubheading size={2} color='white700'>
          Change your phone number in two easy steps
        </TextGroupSubheading>
      </TextGroup>
      <VStack flex={1} justify='space-between'>
        <VStack mt={10} gap={8}>
          <HStack items='flex-start' gap={3}>
            <Image
              size={75}
              radius={1}
              css={{
                background: 'rgba(152, 152, 255, 0.15)',
                flexShrink: 0,
              }}
            />
            <TextGroup gap={0}>
              <TextGroupHeading
                size={3}
                as='h5'
                css={{ lineHeight: '150%' }}
              >
                Update your phone number
              </TextGroupHeading>
              <TextGroupSubheading size={2} color='white700' weight={500}>
                Provide us with the new phone number and we will send a
                verification code to the number you provided.
              </TextGroupSubheading>
            </TextGroup>
          </HStack>
          <HStack items='flex-start' gap={3}>
            <Image
              size={75}
              radius={1}
              css={{
                background: 'rgba(152, 152, 255, 0.15)',
                flexShrink: 0,
              }}
            />
            <TextGroup gap={0}>
              <TextGroupHeading
                size={3}
                as='h5'
                css={{ lineHeight: '150%' }}
              >
                Verify Code
              </TextGroupHeading>
              <TextGroupSubheading size={2} color='white700' weight={500}>
                Enter the code that has been sent to the phone number that
                you provided and we will confirm your identity.
              </TextGroupSubheading>
            </TextGroup>
          </HStack>
        </VStack>
        <HStack
          justify='flex-end'
          borderTop={1}
          borderColor='rgba(152, 152, 255, 0.1)'
          pt={5}
          gap={5}
        >
          <Button
            onClick={() =>
              navigate(
                location.state.previousLocation ??
                  makePath([Paths.settings, Paths.setting.account]),
              )
            }
            variant='ghost'
            colorTheme='white700'
            className={makeButtonLarger('2.75rem')}
            css={{ px: '$8', py: '$4', border: 'unset' }}
            radius={1}
          >
            Cancel
          </Button>
          <Button
            onClick={increment}
            colorTheme='purple500'
            className={makeButtonLarger('2.75rem')}
            css={{ px: '$8', py: '$4' }}
            radius={1}
          >
            Begin
          </Button>
        </HStack>
      </VStack>
    </VStack>
  );
}

function ChangePhoneNumberVerificationStep() {
  const location = useLocation();
  const navigate = useNavigate();

  const { value, handleOnChange } = useInputChange('');

  const { decrement } = useStepperContext();

  return (
    <VStack flex={1} px={5} pb={5}>
      <TextGroup gap={0}>
        <TextGroupHeading as='h2' weight={500} size={3}>
          Verify Code
        </TextGroupHeading>
        <TextGroupSubheading size={2} color='white700'>
          Enter the code that has been sent to the phone number that you
          provided and we will confirm your identity.
        </TextGroupSubheading>
      </TextGroup>
      <VStack
        as='form'
        mt={8}
        onSubmit={async (e) => {
          e.preventDefault();

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
          onChange={handleOnChange}
          name='code'
          label='Enter verification code'
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
            onClick={() =>
              navigate(
                location.state.previousLocation ??
                  makePath([Paths.settings, Paths.setting.account]),
              )
            }
            colorTheme='purple500'
            className={makeButtonLarger('2.75rem')}
            css={{ px: '$8', py: '$4' }}
            radius={1}
          >
            Verify
          </Button>
        </HStack>
      </VStack>
    </VStack>
  );
}

function ChangePhoneNumberUpdateStep() {
  const { value, handleOnChange } = useInputChange('');

  const { increment, decrement } = useStepperContext();

  return (
    <VStack flex={1} px={5} pb={5}>
      <TextGroup gap={0}>
        <TextGroupHeading as='h2' weight={500} size={3}>
          Update your phone number
        </TextGroupHeading>
        <TextGroupSubheading size={2} color='white700'>
          Enter the code that has been sent to the phone number that you
          provided and we will confirm your identity.
        </TextGroupSubheading>
      </TextGroup>
      <VStack
        as='form'
        mt={8}
        onSubmit={async (e) => {
          e.preventDefault();
          increment();
        }}
        flex={1}
        justify='space-between'
      >
        <InputTextField
          value={value}
          onChange={handleOnChange}
          name='phone'
          label='Phone number'
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
            onClick={increment}
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

function ChangePhoneNumberPage() {
  return (
    <VStack
      h={600}
      gap={4}
      divider={<Box h='1px' w='full' bgColor='rgba(152, 152, 255, 0.1)' />}
    >
      <Box px={5} pt={5}>
        <Heading size={6} weight={500}>
          Change Phone Number
        </Heading>
      </Box>
      <Stepper>
        <StepperStep step={ChangeEmailStep.Overview}>
          <ChangePhoneNumberOverviewStep />
        </StepperStep>
        <StepperStep step={ChangeEmailStep.Update}>
          <ChangePhoneNumberUpdateStep />
        </StepperStep>
        <StepperStep step={ChangeEmailStep.Verification}>
          <ChangePhoneNumberVerificationStep />
        </StepperStep>
      </Stepper>
    </VStack>
  );
}

export default ChangePhoneNumberPage;
