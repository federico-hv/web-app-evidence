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
  StackDivider,
  useDisclosure,
} from '@holdr-ui/react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import {
  customBgColor,
  DialogContextProvider,
  Head,
  makeButtonLarger,
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
          <Heading as='h2' size={5} weight={400}>
            {data.bookmarkGroup.name}
          </Heading>
        </Box>
        <HStack gap={3} items='center'>
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
          <Select value='private'>
            <SelectTrigger
              radius={2}
              css={{
                whiteSpace: 'nowrap',
                border: '1px solid rgba(152, 152, 255, 0.10)',
                background: 'rgba(152, 152, 255, 0.1)',
              }}
            />
            <SelectContent sticky='always'>
              <SelectItemList
                _active={{ color: '$purple200' }}
                _hover={{ background: 'rgba(14, 14, 27, 0.50)' }}
                _highlighted={{ background: 'rgba(14, 14, 27, 0.50)' }}
                // w={180}
                divider={
                  <Box
                    h='1px'
                    w='100%'
                    css={{
                      background: 'rgba(152, 152, 255, 0.1)',
                    }}
                  />
                }
                position='relative'
                css={{
                  boxShadow: '0px 4px 12px 0px rgba(14, 14, 27, 0.08)',
                  backgroundColor: 'rgba(49, 49, 73, 0.85)',
                  backdropFilter: 'blur(40px)',
                  borderBottomLeftRadius: '$2',
                  borderBottomRightRadius: '$2',
                  border: '1px solid rgba(152, 152, 255, 0.1)',
                  borderTop: 'none',
                }}
              >
                <SelectItem
                  icon='global-outline'
                  py={2}
                  radius={1}
                  css={{ fontSize: '$2' }}
                  value='public'
                  label='Public'
                />
                <SelectItem
                  icon='lock-outline'
                  py={2}
                  radius={1}
                  css={{ fontSize: '$2' }}
                  value='private'
                  label='Private'
                />
              </SelectItemList>
            </SelectContent>
          </Select>
        </HStack>
      </HStack>
    </Fragment>
  );
}
Header.displayName = 'Header';

export default Header;
