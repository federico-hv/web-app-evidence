import { Icon } from '@holdr-ui/react';
import { Fragment } from 'react';

// TODO: Change the icons to 'triangle-up-fill' and 'triangle-down-fill' when the React Library
//       is updated
function GainLossIndicator({ isGain }: { isGain: boolean }) {
  return (
    <Fragment>
      {isGain ? (
        <Icon name='arrow-up-outline' color='success500' size='xl' />
      ) : (
        <Icon name='arrow-down-outline' color='danger400' size='xl' />
      )}
    </Fragment>
  );
}

export default GainLossIndicator;
