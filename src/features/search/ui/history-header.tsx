import { IReturnMany, UserModel } from '../../../shared';
import { useRemoveSearchHistoryItems } from '../shared';
import { Fragment } from 'react';
import {
  Box,
  Button,
  Center,
  Heading,
  HStack,
  Text,
} from '@holdr-ui/react';

function HistoryHeader({ history }: { history: IReturnMany<UserModel> }) {
  const { removeAll } = useRemoveSearchHistoryItems();

  return (
    <Fragment>
      {history.count === 0 && (
        <Box p={1}>
          <Box p={2}>
            <Center py={4}>
              <Text size={2} color='base400'>
                No recent searches
              </Text>
            </Center>
          </Box>
        </Box>
      )}
      {history.count > 0 && (
        <HStack
          items='center'
          justify='space-between'
          px={3}
          pt={2}
          pb={4}
        >
          <Heading as='h3' size={{ '@bp1': 3, '@bp3': 4 }}>
            Recent
          </Heading>
          <Button
            onClick={() => removeAll()}
            //size='sm'
            radius={2}
            colorTheme='white500'
            variant='ghost'
            label='Clear'
          />
        </HStack>
      )}
    </Fragment>
  );
}

export default HistoryHeader;
