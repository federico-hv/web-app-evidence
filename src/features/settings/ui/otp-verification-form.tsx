import {
  Alert,
  Box,
  Button,
  FormControl,
  Input,
  Text,
  useInputChange,
  VStack,
} from '@holdr-ui/react';
import { useContext } from 'react';
import { ChangeContactInfoContext, useUpdateContactInfo } from '../shared';
import { extraBtnPadding } from '../../../shared';

function OTPVerificationForm() {
  const { value: code, handleOnChange } = useInputChange('');
  const { phone, email, name, close } = useContext(
    ChangeContactInfoContext,
  );
  const { onSubmit, loading, error } = useUpdateContactInfo();

  return (
    <VStack as='form' flex={1} justify='space-between'>
      <VStack gap={3}>
        {error && error.message && (
          <Alert status='danger' variant='subtle'>
            <Alert.Content>
              <Alert.Description>{error.message}</Alert.Description>
            </Alert.Content>
          </Alert>
        )}
        <FormControl>
          <FormControl.Label>Code</FormControl.Label>
          <Input
            value={code}
            onChange={handleOnChange}
            css={{
              'user-select': 'none',
            }}
          />
        </FormControl>
        <Box>
          <Text
            size={2}
            color='base400'
            css={{ textDecoration: 'underline' }}
          >
            {"Didn't receive code?"}
          </Text>
        </Box>
      </VStack>
      <Button
        type='button'
        isLoading={loading}
        loadingText={loading ? '' : 'Updating'}
        onClick={async () => {
          await onSubmit({
            contact: (name === 'email' ? email : phone) || '',
            code: code,
            type: name,
          });

          if (!error) close();
        }}
        fullWidth
        className={extraBtnPadding()}
      >
        Update
      </Button>
    </VStack>
  );
}
OTPVerificationForm.displayName = 'OTPVerificationForm';

export default OTPVerificationForm;
