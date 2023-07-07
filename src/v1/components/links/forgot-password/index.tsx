import { Text } from '@holdr-ui/react';

function ForgotPasswordLink() {
  return (
    <a
      href={`${import.meta.env.VITE_AUTH_APP_URL}/reset-password/request`}
    >
      <Text size={2} color='base400' css={{ textDecoration: 'underline' }}>
        Forgot Password?
      </Text>
    </a>
  );
}
ForgotPasswordLink.displayName = 'ForgotPasswordLink';

export default ForgotPasswordLink;
