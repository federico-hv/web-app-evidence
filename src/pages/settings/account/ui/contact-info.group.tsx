import { Box, VStack } from '@holdr-ui/react';
import {
  Label,
  makePath,
  Paths,
  TextGroup,
  TextGroupHeading,
  TextGroupSubheading,
  useNavigateWithPreviousLocation,
} from '../../../../shared';
import { useLocation } from 'react-router-dom';

function ChangeEmailAddress() {
  const location = useLocation();

  const navigate = useNavigateWithPreviousLocation(location.pathname);

  const goto = () =>
    navigate(
      makePath([
        Paths.settings,
        Paths.setting.account,
        Paths.setting.change_email,
      ]),
    );

  return (
    <VStack>
      <Label
        onClick={goto}
        name='email'
        text='Email address'
        css={{ cursor: 'pointer' }}
      />
      <Box
        onClick={goto}
        bgColor='rgba(152, 152, 255, 0.15)'
        border={1}
        h={45}
        radius={1}
        borderColor='rgba(152, 152, 255, 0.35)'
      />
    </VStack>
  );
}

function ChangePhoneNumber() {
  const location = useLocation();

  const navigate = useNavigateWithPreviousLocation(location.pathname);

  const goto = () =>
    navigate(
      makePath([
        Paths.settings,
        Paths.setting.account,
        Paths.setting.change_phone_number,
      ]),
    );

  return (
    <VStack>
      <Label
        onClick={goto}
        tooltip='We will not share your phone number publicly. It is used to verify you are a real person.'
        name='phone'
        text='Phone number'
        css={{ cursor: 'pointer' }}
      />
      <Box
        onClick={goto}
        bgColor='rgba(152, 152, 255, 0.15)'
        border={1}
        h={45}
        radius={1}
        borderColor='rgba(152, 152, 255, 0.35)'
      />
    </VStack>
  );
}

function ContactInfoGroup() {
  return (
    <Box>
      <TextGroup>
        <TextGroupHeading size={3} weight={400}>
          Contact Information
        </TextGroupHeading>
        <TextGroupSubheading size={2} weight={300} color='white700'>
          Update your email address or phone number
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
      >
        <ChangeEmailAddress />
        <ChangePhoneNumber />
      </VStack>
    </Box>
  );
}
ContactInfoGroup.displayName = 'ContactInfoGroup';

export default ContactInfoGroup;
