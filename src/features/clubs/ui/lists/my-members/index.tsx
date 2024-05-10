import { useCurrentUser } from '../../../../auth';
import { Fragment } from 'react';
import {
  Box,
  Button,
  Heading,
  HStack,
  Icon,
  Text,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  VStack,
} from '@holdr-ui/react';

import { dummyMember } from '../../../../../pages/clubs/shared';
import { MyMemberItem } from '../../groups';
import millify from 'millify';
import { Link } from 'react-router-dom';
import { makeButtonLarger, Paths, prefix } from '../../../../../shared';

function MyMembers() {
  const currentUser = useCurrentUser();

  if (!currentUser || (currentUser && currentUser.role === 'general')) {
    return <Fragment />;
  }

  return (
    <VStack minHeight={292} p={4}>
      <HStack items='center' justify='space-between'>
        <HStack items='center' gap={1}>
          <Heading size={3} weight={500} css={{ userSelect: 'none' }}>
            My Members
          </Heading>
          <Tooltip>
            <TooltipTrigger>
              <Box fontSize='12px' mt='5px'>
                <Icon color='base400' name='information-outline' />
              </Box>
            </TooltipTrigger>
            <TooltipContent>These are your top members</TooltipContent>
          </Tooltip>
        </HStack>
        {/*<Text color='white700' size={1}>*/}
        {/*  {millify(3, { precision: 2 })} Members Online*/}
        {/*</Text>*/}
      </HStack>
      <Box
        mt={{ '@bp1': '8px', '@bp3': '8px' }}
        mb={{ '@bp1': '16px', '@bp3': '16px' }}
        h='1px'
        w='100%'
        css={{
          backgroundColor: 'rgba(152, 152, 255, 0.10)',
        }}
      />
      <Link to={prefix('/', Paths.clubs)}>
        <Button
          fullWidth
          className={makeButtonLarger('2.5rem')}
          colorTheme='purple500'
        >
          Browse Club
        </Button>
      </Link>
      {/*<VStack>*/}
      {/*  <MyMemberItem data={dummyMember} isOnline={true} />*/}
      {/*  <MyMemberItem data={dummyMember} isOnline={true} />*/}
      {/*  <MyMemberItem data={dummyMember} isOnline={false} />*/}
      {/*  <MyMemberItem data={dummyMember} isOnline={false} />*/}
      {/*</VStack>*/}
    </VStack>
  );
}
MyMembers.displayName = 'MyMembers';

export default MyMembers;
