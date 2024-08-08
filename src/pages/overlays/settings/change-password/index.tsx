import {
  Box,
  Button,
  Heading,
  HStack,
  useRecordState,
  VStack,
} from '@holdr-ui/react';
import {
  InputTextField,
  LinkText,
  makeButtonLarger,
  makePath,
  Paths,
} from '../../../../shared';
import { useLocation, useNavigate } from 'react-router-dom';

interface IChangeEmailPayload {
  currentPassword: string;
  newPassword: string;
  newPasswordVerification: string;
}

function ChangeEmailPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const [state, update] = useRecordState<IChangeEmailPayload>({
    currentPassword: '',
    newPassword: '',
    newPasswordVerification: '',
  });

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
        as='form'
        onSubmit={async (e) => {
          e.preventDefault();
        }}
        px={5}
        flex={1}
        justify='space-between'
      >
        <VStack mt={2} gap={5}>
          <VStack>
            <InputTextField
              name='currentPassword'
              label='Current password'
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
          <InputTextField name='newPassword' label='New password' />
          <InputTextField
            name='newPasswordVerification'
            label='Confirm new password'
          />
        </VStack>
        <HStack
          justify='flex-end'
          borderTop={1}
          borderColor='rgba(152, 152, 255, 0.1)'
          py={5}
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
            type='submit'
            colorTheme='purple500'
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
