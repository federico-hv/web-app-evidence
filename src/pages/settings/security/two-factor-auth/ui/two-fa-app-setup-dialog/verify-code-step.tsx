import { FormControl, Input, VStack } from '@holdr-ui/react';
import {
  TextGroup,
  TextGroupHeading,
  TextGroupSubheading,
  useGeneralContext,
} from '../../../../../../shared';
import { ITwoFASetupContext } from './index';

function VerifyCodeStep() {
  const { state, update } = useGeneralContext<ITwoFASetupContext>();

  return (
    <VStack gap={6}>
      <TextGroup gap={{ '@bp1': 0, '@bp3': 2 }}>
        <TextGroupHeading
          size={{ '@bp1': 3, '@bp3': 4 }}
          casing='capitalize'
        >
          Confirm code
        </TextGroupHeading>
        <TextGroupSubheading size={2}>
          Follow the instructions on the authentication app. Once the
          authentication app generates a code enter it here.
        </TextGroupSubheading>
      </TextGroup>

      <FormControl>
        <FormControl.Label>Code</FormControl.Label>
        <Input
          value={state.userCode}
          onChange={(e) => update({ userCode: e.currentTarget.value })}
        />
      </FormControl>
    </VStack>
  );
}
VerifyCodeStep.displayName = 'VerifyCodeStep';

export default VerifyCodeStep;
