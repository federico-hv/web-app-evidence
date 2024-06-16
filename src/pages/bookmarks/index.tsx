import {
  Box,
  Heading,
  HStack,
  IconButton,
  StackDivider,
  VStack,
} from '@holdr-ui/react';
import { GQLRenderer, makePath, Paths, RadialSurface } from '../../shared';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { BookmarkGroupsList } from './ui';

function BookmarksPage() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  return (
    <RadialSurface
      divider={
        <StackDivider width={1} color='rgba(152, 152, 255, 0.10)' />
      }
      w='100%'
      radius={3}
      gap={6}
    >
      <HStack px={6} pt={6} justify='space-between' items='center'>
        <Heading weight={400} size={6}>
          Bookmarks
        </Heading>
        <IconButton
          colorTheme='purple100'
          icon='add'
          ariaLabel='add bookmark'
          onClick={() =>
            navigate(makePath([Paths.bookmarkGroups, 'create']), {
              state: {
                previousLocation: pathname,
              },
            })
          }
        />
      </HStack>
      <HStack
        px={6}
        pb={6}
        gap={4}
        w='100%'
        h='calc(100% - 52px)'
        overflowY='hidden'
      >
        <VStack
          border={1}
          borderColor='rgba(152, 152, 255, 0.10)'
          radius={2}
          bgColor='rgba(48, 48, 75, 0.60)'
          overflowY='auto'
          className='hide-scrollbar'
          basis={325}
        >
          <Box
            position='sticky'
            t={0}
            bgColor='#27263c'
            zIndex={1}
            borderBottom={1}
            borderColor='rgba(152, 152, 255, 0.10)'
            pb={3}
          >
            <Heading color='white600' px={3} pt={3} size={4} weight={500}>
              My Groups
            </Heading>
          </Box>
          <GQLRenderer>
            <BookmarkGroupsList />
          </GQLRenderer>
        </VStack>
        <Box
          overflow='hidden'
          border={1}
          borderColor='rgba(152, 152, 255, 0.10)'
          radius={2}
          bgColor='rgba(48, 48, 75, 0.60)'
          flex={1}
        >
          <Outlet />
        </Box>
      </HStack>
    </RadialSurface>
  );
}
BookmarksPage.displayName = 'Bookmarks Page';

export default BookmarksPage;
