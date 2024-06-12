import {
  Box,
  Heading,
  HStack,
  IconButton,
  StackDivider,
  useDisclosure,
} from '@holdr-ui/react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import {
  DialogContextProvider,
  Head,
  makePath,
  Menu,
  MenuHeader,
  MenuTrigger,
  Paths,
  useAlertDialog,
  usePreviousLocation,
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
  const { pathname } = useLocation();
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

  return (
    <Fragment>
      <Head prefix={`Bookmarks -`} title={data.bookmarkGroup.name} />
      <HStack
        items='center'
        justify='space-between'
        p={3}
        border={1}
        borderColor='rgba(152, 152, 255, 0.10)'
      >
        <Box>
          <Heading color='white600' size={4} weight={500}>
            {data.bookmarkGroup.name}
          </Heading>
        </Box>
        <Menu minWidth={270}>
          <MenuTrigger>
            <IconButton
              size='sm'
              variant='ghost'
              icon='more-fill'
              colorTheme='white500'
              ariaLabel='view options'
            />
          </MenuTrigger>
          <MenuHeader items='center' justify='center'>
            <Heading size={3} weight={500}>
              {data.bookmarkGroup.name}
            </Heading>
          </MenuHeader>
          <Menu.Content>
            <Menu.Item
              label='Rename bookmark group'
              icon='edit-box-outline'
              action={() =>
                navigate(
                  makePath([
                    Paths.bookmarks,
                    'rename',
                    data.bookmarkGroup.id,
                  ]),
                  {
                    state: {
                      name: data.bookmarkGroup.name,
                      previousLocation: pathname,
                    },
                  },
                )
              }
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
      </HStack>
    </Fragment>
  );
}
Header.displayName = 'Header';

export default Header;
