import {
  CommonDialog,
  CommonDialogHeader,
  DateUtility,
  useDialogContext,
} from 'shared';

function CalendarDialog({ date }: { date: Date }) {
  const { isOpen, onOpen, onClose } = useDialogContext();

  const today = DateUtility.equal(date, new Date());
  const dateString = today ? 'Today' : DateUtility.toDateString(date);

  return (
    <CommonDialog isOpen={isOpen} onOpen={onOpen} onClose={onClose}>
      <CommonDialogHeader label={dateString} />
    </CommonDialog>
  );
}

CalendarDialog.displayName = 'CalendarDialogue';
export default CalendarDialog;
