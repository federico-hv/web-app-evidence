import {
  CommonDialog,
  CommonDialogHeader,
  DateUtility,
  useDialogContext,
} from 'shared';

function DateDialog({ date }: { date: Date }) {
  const { isOpen, onOpen, onClose } = useDialogContext();

  const today = DateUtility.equal(date, new Date());
  const dateString = today ? 'Today' : DateUtility.toDateString(date);

  return (
    <CommonDialog isOpen={isOpen} onOpen={onOpen} onClose={onClose}>
      <CommonDialogHeader label={dateString} />
    </CommonDialog>
  );
}

DateDialog.displayName = 'DateDialogue';
export default DateDialog;
