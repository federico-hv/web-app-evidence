import {
  Box,
  Button,
  Heading,
  HStack,
  useRecordState,
  VStack,
} from '@holdr-ui/react';
import {
  AppearingContent,
  FieldLengths,
  handleFieldError,
  hasAllBooleanKeys,
  hasAllUndefinedKeyValues,
  InputTextField,
  LinkText,
  makeButtonLarger,
  makePath,
  missingField,
  PasswordErrorChecker,
  PasswordErrors,
  Paths,
  ShowPasswordButton,
  useToast,
} from '../../../../shared';
import { useLocation, useNavigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { ChangeEvent, useState } from 'react';
import { useUpdatePasswordMutation } from '../../../../features';

interface IChangeEmailPayload {
  currentPassword: string;
  newPassword: string;
  newPasswordVerification: string;
}

function ChangeEmailPage() {
  const { openWith } = useToast();

  const [errorText, setErrorText] = useState('');

  const { updatePassword, loading } = useUpdatePasswordMutation();

  const [passwordErrors, setPasswordErrors] = useState<PasswordErrors>();

  const [show, updateShow] = useRecordState<{
    currentPassword: boolean;
    newPassword: boolean;
  }>({
    currentPassword: false,
    newPassword: false,
  });

  const location = useLocation();
  const navigate = useNavigate();

  const close = () =>
    navigate(
      location.state.previousLocation ??
        makePath([Paths.settings, Paths.setting.account]),
    );

  const [state, update] = useRecordState<IChangeEmailPayload>({
    currentPassword: '',
    newPassword: '',
    newPasswordVerification: '',
  });

  const newPasswordVerificationError = handleFieldError(
    state.newPasswordVerification,
    {
      keyName: 'Password confirmation',
      same: {
        value: state.newPassword,
        refName: 'password',
      },
    },
  );

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) =>
    update({ [e.target.name]: e.target.value });

  return (
    <VStack
      h={600}
      gap={4}
      divider={<Box h='1px' w='full' bgColor='rgba(152, 152, 255, 0.1)' />}
    >
      <Box px={5} pt={5}>
        <Heading size={6} weight={500}>
          Change Password
        </Heading>
      </Box>
      <VStack
        data-private
        as='form'
        onSubmit={async (e) => {
          e.preventDefault();

          const res = await updatePassword(state);

          if (!res || !res.data || !res.data.updatePassword) return;

          if (!res.data.updatePassword.isSuccess) {
            setErrorText(res.data.updatePassword.message);
            return;
          }

          openWith({
            description: res.data.updatePassword.message,
            status: 'success',
          });

          close();
        }}
        px={5}
        flex={1}
        justify='space-between'
      >
        <VStack mt={2} gap={5}>
          <VStack>
            <InputTextField
              rightElement={
                <ShowPasswordButton
                  show={show.currentPassword}
                  onClick={() =>
                    updateShow({ currentPassword: !show.currentPassword })
                  }
                />
              }
              autoComplete='password'
              name='currentPassword'
              label='Current password'
              value={state.currentPassword}
              onChange={handleOnChange}
              type={show.currentPassword ? 'text' : 'password'}
              placeholder='Enter current password'
              errorText={errorText}
            />
            <LinkText
              replace
              to={`${import.meta.env.VITE_AUTH_APP_URL}/${
                Paths.resetPassword
              }`}
              color='white700'
              size={1}
              mt={3}
            >
              Forgot password
            </LinkText>
          </VStack>
          <Box h='1px' w='full' bgColor='rgba(152, 152, 255, 0.1)' />
          <VStack>
            <InputTextField
              rightElement={
                <ShowPasswordButton
                  show={show.newPassword}
                  onClick={() =>
                    updateShow({ newPassword: !show.newPassword })
                  }
                />
              }
              minLength={FieldLengths.password.min}
              maxLength={FieldLengths.password.max}
              value={state.newPassword}
              onChange={handleOnChange}
              name='newPassword'
              label='New password'
              type={show.newPassword ? 'text' : 'password'}
              placeholder='Enter new password'
            />

            <PasswordErrorChecker
              value={state.newPassword}
              update={(errors) => setPasswordErrors(errors)}
            />
          </VStack>

          <AnimatePresence>
            {!hasAllBooleanKeys(passwordErrors, true) && (
              <AppearingContent>
                <InputTextField
                  minLength={FieldLengths.password.min}
                  maxLength={FieldLengths.password.max}
                  value={state.newPasswordVerification}
                  onChange={handleOnChange}
                  autoComplete='password'
                  name='newPasswordVerification'
                  label='Confirm new password'
                  type='password'
                  placeholder='Reconfirm password'
                  errorText={newPasswordVerificationError}
                />
              </AppearingContent>
            )}
          </AnimatePresence>
        </VStack>
        <HStack
          justify='flex-end'
          borderTop={1}
          borderColor='rgba(152, 152, 255, 0.1)'
          py={5}
          gap={5}
        >
          <Button
            onClick={close}
            variant='ghost'
            colorTheme='white700'
            className={makeButtonLarger('2.75rem')}
            css={{ px: '$8', py: '$4', border: 'unset' }}
            radius={1}
          >
            Cancel
          </Button>
          <Button
            isLoading={loading}
            loadingText='Change Password'
            type='submit'
            colorTheme='purple500'
            disabled={
              missingField(state) ||
              !hasAllUndefinedKeyValues({
                newPasswordVerificationError,
              }) ||
              hasAllBooleanKeys(passwordErrors, true)
            }
            className={makeButtonLarger('2.75rem')}
            css={{ px: '$8', py: '$4' }}
            radius={1}
          >
            Change Password
          </Button>
        </HStack>
      </VStack>
    </VStack>
  );
}

export default ChangeEmailPage;
