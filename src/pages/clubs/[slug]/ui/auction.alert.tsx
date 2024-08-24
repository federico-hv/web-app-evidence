import { Fragment, useRef } from 'react';
import {
  Alert,
  AlertActions,
  AlertClose,
  AlertContent,
  AlertDescription,
  AlertTitle,
  Box,
} from '@holdr-ui/react';
import { useAuctionAlertContext } from '../shared/contexts';
import { ThemeColor } from '@holdr-ui/react/dist/shared/types';

const Colors: Record<
  'success' | 'warning',
  { backgroundColor: string; color: ThemeColor }
> = {
  success: {
    backgroundColor: 'rgb(70, 105, 76)',
    color: 'success50',
  },
  warning: {
    backgroundColor: 'rgb(114, 93,52)',
    color: 'warning50',
  },
};

const BidEvent = {
  success: {
    title: 'Your bid has been successfully placed',
    description:
      'A confirmation of your bid has been sent to your email address',
  },
  updated: {
    title: 'Your updated bid has been successfully placed',
    description:
      'A confirmation of your bid has been sent to your email address',
  },
  outbid: {
    title: 'Update your bid',
    description: `You are no longer on track for a chance to win a  membership. Update your bid to continue being eligible to win a membership.`,
  },
};

function AuctionAlert() {
  const ref = useRef<HTMLDivElement>();

  const { state } = useAuctionAlertContext();

  if (!state || !state.status || !state.eventName) {
    return <Fragment />;
  }

  const statusColor = Colors[state.status];

  const statusEvent = BidEvent[state.eventName];

  return (
    <Box innerRef={ref} position='sticky' t={0} zIndex={5}>
      <Alert
        status={state.status}
        radius={1}
        position='relative'
        css={{ backgroundColor: statusColor.backgroundColor }}
      >
        <AlertContent>
          <AlertTitle color={statusColor.color}>
            {statusEvent.title}
          </AlertTitle>
          <AlertDescription color={statusColor.color}>
            {statusEvent.description}
          </AlertDescription>
        </AlertContent>
        <AlertActions>
          <AlertClose
            colorTheme={statusColor.color}
            onClick={() => {
              if (ref && ref.current) {
                ref.current.remove();
              }
            }}
          />
        </AlertActions>
      </Alert>
    </Box>
  );
}

export default AuctionAlert;
