import { useLocation, useNavigate, useParams } from 'react-router-dom';
import {
  customInputStyles,
  InformationTooltip,
  makeButtonLarger,
  usePreviousLocation,
} from '../../../../shared';
import {
  Box,
  Button,
  FormControl,
  Heading,
  HStack,
  Input,
  Text,
  useRecordState,
  VStack,
} from '@holdr-ui/react';
import {
  ICreateBookmarkGroup,
  useRenameBookmarkGroup,
} from '../../../../features';

function RenameBookmarkGroup() {
  const { id } = useParams();
  const { state: locState } = useLocation();

  const node =
    document.getElementById('page-dialog-container') || document.body;

  const previousLocation = usePreviousLocation('/');
  const navigate = useNavigate();

  const [state, update] = useRecordState<ICreateBookmarkGroup>({
    name: locState.name.trim() || '',
    isPrivate: false,
  });

  const { loading, renameBookmarkGroup } = useRenameBookmarkGroup();

  return (
    <VStack w={450} color='white500'>
      <Box borderBottom={1} borderColor='rgba(152, 152, 255, 0.10)' p={4}>
        <Heading color='white500' weight={500} size={6} as='h2'>
          Rename Bookmark Group
        </Heading>
      </Box>
      <VStack as='form' px={4} py={4} gap={5} h='100%'>
        <Box>
          <HStack mb={3} items='center' gap={2}>
            <Text as='label'>Title</Text>
            <Box fontSize={2}>
              <InformationTooltip
                side='right'
                sideOffset={1}
                container={node}
                color='white700'
                description='Waiting for info'
              />
            </Box>
          </HStack>
          <FormControl>
            <Input
              autoFocus
              onChange={(e) => update({ name: e.target.value })}
              name={state.name}
              value={state.name}
              focusColor='purple500'
              type='text'
              maxLength={60}
              radius={1}
              className={customInputStyles()}
              color='white500'
              placeholder='Enter group name'
            />
            <FormControl.HelperText>
              {state.name.length} / 60
            </FormControl.HelperText>
          </FormControl>
        </Box>
        <HStack gap={2} justify='flex-end'>
          <Button
            type='submit'
            onClick={() => navigate(previousLocation)}
            variant='ghost'
            colorTheme='purple300'
            radius={1}
            css={{
              px: '$7',
            }}
          >
            Close
          </Button>
          <Button
            type='submit'
            disabled={state.name.length === 0}
            isLoading={loading}
            loadingText='Edit Group'
            onClick={async () => {
              await renameBookmarkGroup(id || '', state.name).then(() =>
                navigate(previousLocation),
              );
            }}
            colorTheme='purple500'
            radius={1}
            css={{
              px: '$7',
            }}
            // className={makeButtonLarger('2.5rem', '15px')}
          >
            Save
          </Button>
        </HStack>
      </VStack>
    </VStack>
  );
}
RenameBookmarkGroup.displayName = 'RenameBookmarkGroup';

export default RenameBookmarkGroup;
