import {
  Alert,
  AlertContent,
  AlertDescription,
  AlertIcon,
  AlertTitle,
} from '@holdr-ui/react';

export enum AlertOrder {
  succesfulBid,
  updateBid,
  successfulBidUpdate,
  bidSuccesfullyPlaced,
  successBidDrawal,
}

enum AlertType {
  success = 'success',
  warning = 'warning',
}

export const livebidsAlerts = [
  {
    title: 'Your bid has been successfully placed',
    description:
      'A confirmation of your bid has been sent to email@gmail.com',
    type: AlertType.success,
  },
  {
    title: 'Update your bid!',
    description:
      'You are no longer on track for a chance to win a Boslen membership. Update your bid to continue or click cancel to stop participating in the live auction',
    type: AlertType.warning,
  },
  {
    title: 'Your updated bid has been successfully placed',
    description:
      'A confirmation of your bid has been sent to email@gmail.com',
    type: AlertType.success,
  },
  {
    title:
      'Your have been successfully withdrawn from this membership auction',
    description:
      'A confirmation of your bid has been sent to email@gmail.com',
    type: AlertType.success,
  },
];

interface LiveBidAlertProps {
  title: string;
  description: string;
  type: AlertType;
}

export function LiveBidsAlert({
  title,
  description,
  type,
}: LiveBidAlertProps) {
  const isSuccess = type == AlertType.success;
  const styles = {
    background: isSuccess
      ? 'rgba(93, 205, 123, 0.25)'
      : 'rgba(232, 174, 56, 0.45)',
    iconColor: isSuccess ? 'success500' : 'warning100',
    titleColor: isSuccess ? 'success50' : 'warning200',
    descriptionColor: isSuccess ? 'success100' : 'warning400',
  };
  const iconName = isSuccess ? 'circle-check-fill' : 'warning-fill';

  return (
    <Alert
      css={{
        outline: 'none',
        background: styles.background,
        // height: '90px', -> Breaks icon position
        padding: '16px 24px',
      }}
    >
      <AlertIcon
        color={styles.iconColor}
        alignSelfStart
        icon={iconName}
        // css={{ marginTop: '5px' }} // If height needs to be 90px fixed
      />
      <AlertContent>
        <AlertTitle color={styles.titleColor}>{title}</AlertTitle>
        <AlertDescription color={styles.descriptionColor}>
          {description}
        </AlertDescription>
      </AlertContent>
    </Alert>
  );
}
