import {
  Box,
  hexToRGB,
  HStack,
  Text,
  useRecordState,
  VStack,
} from '@holdr-ui/react';
import {
  Label,
  makePath,
  Paths,
  PrimaryTooltip,
  TextGroup,
  TextGroupHeading,
  TextGroupSubheading,
  useNavigateWithPreviousLocation,
} from '../../../../shared';
import { useLocation } from 'react-router-dom';
import { useAccountInfoSuspenseQuery } from '../../../../features';

function ChangeEmailAddress({ email }: { email: string }) {
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
    <VStack
      onClick={goto}
      role='link'
      css={{
        cursor: 'text',
      }}
    >
      <Label name='email' text='Email address' />
      <HStack
        items='center'
        bgColor='rgba(152, 152, 255, 0.15)'
        border={1}
        h={45}
        radius={1}
        borderColor='rgba(152, 152, 255, 0.35)'
        px={4}
      >
        <Text>{email}</Text>
      </HStack>
    </VStack>
  );
}

function ChangePhoneNumber({ phone }: { phone: string }) {
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
    <VStack
      onClick={goto}
      role='link'
      css={{
        cursor: 'text',
      }}
    >
      <Label
        node={document.body}
        tooltip={
          <PrimaryTooltip
            w={300}
            text='Your phone number is not shared publicly. It is used to send access codes and for identity verification.'
          />
        }
        name='phone'
        text='Phone number'
      />
      <HStack
        items='center'
        bgColor='rgba(152, 152, 255, 0.15)'
        border={1}
        h={45}
        radius={1}
        borderColor='rgba(152, 152, 255, 0.35)'
        px={4}
      >
        <Text>{phone}</Text>
      </HStack>
    </VStack>
  );
}

function ContactInfoGroup() {
  const { data } = useAccountInfoSuspenseQuery();

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
        <ChangeEmailAddress email={data.accountInfo.email} />
        <ChangePhoneNumber phone={data.accountInfo.phone} />
      </VStack>
    </Box>
  );
}
ContactInfoGroup.displayName = 'ContactInfoGroup';

export default ContactInfoGroup;
