import { Heading, HStack, useDisclosure } from '@holdr-ui/react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  DialogContextProvider,
  Menu,
  Paths,
  useAlertDialog,
} from '../../../shared';
import { useSuspenseQuery } from '@apollo/client';
import {
  GET_BOOKMARK_GROUP,
  IBookmarkGroup,
  IUpdateBookmarkGroup,
  UpdateBookmarkSchema,
  useRemoveBookmarkGroup,
  useRenameBookmarkGroup,
} from '../../../features';
import { Fragment } from 'react';
import RenameBookmarkGroupDialog from './rename-bookmark-group.dialog';
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
      <HStack
        w='100%'
        as='header'
        p={4}
        h={58}
        borderBottom={2}
        borderColor='base100'
        items='center'
        justify='space-between'
        position='sticky'
        t={65}
        css={{
          backgroundColor: '#FFF',
          zIndex: 10,
        }}
      >
        <Heading as='h2' size={4}>
          {data.bookmarkGroup.name}
        </Heading>
        <Menu>
          <Menu.Trigger />
          <Menu.Header>{data.bookmarkGroup.name}</Menu.Header>
          <Menu.Content>
            <Menu.Item icon='edit-box-outline' action={onOpen}>
              Rename group
            </Menu.Item>
            <Menu.Item
              icon='close'
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
            >
              Remove group
            </Menu.Item>
          </Menu.Content>
        </Menu>
      </HStack>
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
  );
}
Header.displayName = 'Header';

export default Header;
