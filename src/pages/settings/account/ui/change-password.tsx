import { Box, HStack, Icon, Text, VStack } from '@holdr-ui/react';
import {
  makePath,
  Paths,
  TextGroup,
  TextGroupHeading,
  TextGroupSubheading,
  useNavigateWithPreviousLocation,
} from '../../../../shared';
import { useLocation } from 'react-router-dom';

function ChangePassword() {
  const location = useLocation();

  const navigate = useNavigateWithPreviousLocation(location.pathname);

  const goto = () =>
    navigate(
      makePath([
        Paths.settings,
        Paths.setting.account,
        Paths.setting.change_password,
      ]),
    );

  return (
    <Box>
      <TextGroup>
        <TextGroupHeading size={3} weight={400}>
          Change Your Password
        </TextGroupHeading>
        <TextGroupSubheading size={2} weight={300} color='white700'>
          Update your password at any time
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
      >
        <HStack
          onClick={goto}
          items='center'
          justify='space-between'
          css={{ userSelect: 'none' }}
        >
          <Text>Change password</Text>
          <Icon name='caret-right-outline' />
        </HStack>
      </VStack>
    </Box>
  );
}
ChangePassword.displayName = 'ChangePassword';

export default ChangePassword;
