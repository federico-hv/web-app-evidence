import {
  Box,
  Heading,
  HStack,
  IconButton,
  mergeStyles,
  Select,
  SelectContent,
  SelectItem,
  SelectItemList,
  SelectTrigger,
} from '@holdr-ui/react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import {
  customBgColor,
  Head,
  makeButtonLarger,
  makePath,
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
  useRemoveBookmarkGroup,
} from '../../../features';
import { Fragment } from 'react';
import SelectVisibility from './visibility.select';

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
          <Heading as='h2' size={5} weight={400}>
            {data.bookmarkGroup.name}
          </Heading>
        </Box>
        <HStack gap={3} items='center'>
          {/* ⚙️ Hide this for Beta v1*}
          {/*<SelectVisibility />*/}
          <Menu minWidth={270} offset={12}>
            <MenuTrigger>
              <IconButton
                className={mergeStyles([
                  customBgColor(),
                  makeButtonLarger('2rem'),
                ])}
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
                label='Rename group'
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
                    title: 'Remove group',
                    description:
                      'Removing this bookmark group will remove all bookmarks in the group. Are you sure you want to remove the group?',
                  })
                }
              />
            </Menu.Content>
          </Menu>
        </HStack>
      </HStack>
    </Fragment>
  );
}
Header.displayName = 'Header';

export default Header;
