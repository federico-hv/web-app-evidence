import { Heading, useDisclosure } from '@holdr-ui/react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  DialogContextProvider,
  Head,
  Menu,
  MenuHeader,
  MenuTrigger,
  Paths,
  useAlertDialog,
} from '../../../shared';
import { useSuspenseQuery } from '@apollo/client';
import {
  GET_BOOKMARK_GROUP,
  IBookmarkGroup,
  IUpdateBookmarkGroup,
  RenameBookmarkGroupDialog,
  UpdateBookmarkSchema,
  useRemoveBookmarkGroup,
  useRenameBookmarkGroup,
} from '../../../features';
import { Fragment } from 'react';
import { Formik } from 'formik';
import { UpdateBookmarkGroupValues } from '../constants';

function Header() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const navigate = useNavigate();

  const { openWith } = useAlertDialog();

  const params = useParams();

  const { data } = useSuspenseQuery<
    { bookmarkGroup: IBookmarkGroup },
    { id: string }
  >(GET_BOOKMARK_GROUP, {
    variables: {
      id: params.id || '',
    },
  });

  const { removeBookmarkGroup } = useRemoveBookmarkGroup();
  const { renameBookmarkGroup } = useRenameBookmarkGroup();

  return (
    <Fragment>
      <Head prefix={`Bookmarks -`} title={data.bookmarkGroup.name} />
      <Fragment>
        {data.bookmarkGroup.name}
        <Menu>
          <MenuTrigger />
          <MenuHeader items='center' justify='center'>
            <Heading size={3} weight={500}>
              {data.bookmarkGroup.name}
            </Heading>
          </MenuHeader>
          <Menu.Content>
            <Menu.Item
              label='Rename bookmark'
              icon='edit-box-outline'
              action={onOpen}
            />
            <Menu.Item
              icon='close'
              label='Remove group'
              dangerous
              action={() =>
                openWith({
                  onAction: async () => {
                    const success = await removeBookmarkGroup(
                      data.bookmarkGroup.id,
                    );

                    if (success) {
                      // navigate to all bookmarks
                      navigate(`/${Paths.bookmarks}/all`);
                    }
                  },
                  actionText: 'Remove',
                  title: 'Remove bookmark group',
                  description:
                    'Removing this bookmark group will remove all bookmarks in the group. Are you sure you want to remove the group?',
                })
              }
            />
          </Menu.Content>
        </Menu>

        <DialogContextProvider value={{ isOpen, onOpen, onClose }}>
          <Formik<IUpdateBookmarkGroup>
            initialValues={UpdateBookmarkGroupValues}
            validationSchema={UpdateBookmarkSchema}
            onSubmit={async (values, { resetForm }) => {
              const success = await renameBookmarkGroup(
                data.bookmarkGroup.id,
                values.name,
              );

              if (success) {
                onClose();
                resetForm();
              }
            }}
          >
            <RenameBookmarkGroupDialog />
          </Formik>
        </DialogContextProvider>
      </Fragment>
    </Fragment>
  );
}
Header.displayName = 'Header';

export default Header;
