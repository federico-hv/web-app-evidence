import { ConnectedAccountStatus } from '../../../../../features';
import { Fragment } from 'react';
import { Box, HStack, Icon, Text, VStack } from '@holdr-ui/react';

function OnboardingStatus({ status }: { status: ConnectedAccountStatus }) {
  return (
    <Fragment>
      {status === 'Pending' && (
        <VStack
          divider={
            <Box
              my={3}
              h={48}
              ml={12}
              borderLeft={1}
              borderStyle='dashed'
              borderColor='clearTint300'
            />
          }
        >
          <HStack gap={1} items='center' fontSize={6}>
            <Icon color='success300' name='circle-check-fill' />
            <Text weight={500} size={2}>
              KYC Details Submitted
            </Text>
          </HStack>
          <VStack>
            <HStack gap={1} items='center' fontSize={6}>
              <Icon color='warning300' name='warning-fill' />
              <Text weight={500} size={2}>
                Verification Pending
              </Text>
            </HStack>
            <Text ml={7} size={1} color='white700'>
              {
                "It may take 1-2 days. We'll notify you once you're approved. Continue to complete your profile."
              }
            </Text>
          </VStack>
        </VStack>
      )}
      {status === 'Complete' && (
        <HStack gap={1} items='center' fontSize={6}>
          <Icon color='success300' name='circle-check-fill' />
          <Text weight={500} size={2}>
            KYC Verification Completed
          </Text>
        </HStack>
      )}
    </Fragment>
  );
}
OnboardingStatus.displayName = 'OnboardingStatus';

export default OnboardingStatus;
