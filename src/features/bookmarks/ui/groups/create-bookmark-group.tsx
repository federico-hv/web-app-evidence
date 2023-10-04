import {
  CreateBookmarkSchema,
  ICreateBookmarkGroup,
  useCreateBookmarkGroup,
} from '../../shared';
import { CreateBookmarkGroupValues } from '../../../../pages/bookmarks/constants';
import { GenericProps, getSubComponent } from '../../../../shared';
import { useDisclosure } from '@holdr-ui/react';
import { Formik } from 'formik';
import { Fragment } from 'react';
import { CreateBookmarkGroupDialog } from '../dialogs';

function CreateBookmarkGroup({
  children,
  onCreated,
}: GenericProps & { onCreated?: (id: string) => void }) {
  const Trigger = getSubComponent<'CreateBookmarkGroupTrigger'>(
    children,
    'CreateBookmarkGroupTrigger',
  );

  const { isOpen, onOpen, onClose } = useDisclosure();

  const { createBookmarkGroup } = useCreateBookmarkGroup();

  return (
    <Formik<ICreateBookmarkGroup>
      initialValues={CreateBookmarkGroupValues}
      validationSchema={CreateBookmarkSchema}
      onSubmit={async (values, { resetForm }) => {
        const id = await createBookmarkGroup(
          values.name,
          values.isPrivate,
        );

        if (id) {
          onClose();
          resetForm();
          onCreated && onCreated(id);
        }
      }}
    >
      <CreateBookmarkGroupDialog
        isOpen={isOpen}
        onClose={onClose}
        onOpen={onOpen}
      >
        {Trigger}
      </CreateBookmarkGroupDialog>
    </Formik>
  );
}

function CreateBookmarkGroupTrigger({ children }: GenericProps) {
  return <Fragment>{children}</Fragment>;
}
CreateBookmarkGroupTrigger.displayName = 'CreateBookmarkGroupTrigger';

CreateBookmarkGroup.Trigger = CreateBookmarkGroupTrigger;

export { CreateBookmarkGroupTrigger };
export default CreateBookmarkGroup;
