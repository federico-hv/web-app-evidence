import { Heading } from '@holdr-ui/react';
import { useDialogContext } from '../../../../hooks';
import { DateUtility } from '../../../../utilities';
import EmptyMessage from '../../../empty-message';
import CommonDialog, {
  CommonDialogContent,
  CommonDialogHeader,
} from '../../../common-dialog';

function DateDialog({ date, past }: { date: Date; past: boolean }) {
  const { isOpen, onOpen, onClose } = useDialogContext();

  const today = DateUtility.equal(date, new Date());
  const dateString = today ? 'Today' : DateUtility.toDateString(date);

  return (
    <CommonDialog isOpen={isOpen} onOpen={onOpen} onClose={onClose}>
      <CommonDialogHeader>
        <Heading
          casing='uppercase'
          as='h2'
          size={{ '@bp1': 3, '@bp3': 4 }}
          {...(past && { weight: 400 })}
        >
          {dateString}
        </Heading>
      </CommonDialogHeader>
      <CommonDialogContent>
        <EmptyMessage
          title='No Events'
          subtitle='All events for this day will appear here'
        />
      </CommonDialogContent>
    </CommonDialog>
  );
}

DateDialog.displayName = 'DateDialogue';
export default DateDialog;
