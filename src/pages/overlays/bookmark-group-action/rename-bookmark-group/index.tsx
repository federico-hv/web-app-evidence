import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { makeButtonLarger, usePreviousLocation } from '../../../../shared';
import {
  Box,
  Button,
  FormControl,
  Heading,
  Input,
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

  const previousLocation = usePreviousLocation('/');
  const navigate = useNavigate();

  const [state, update] = useRecordState<ICreateBookmarkGroup>({
    name: locState.name.trim() || '',
    isPrivate: false,
  });

  const { loading, renameBookmarkGroup } = useRenameBookmarkGroup();

  return (
    <VStack>
      <Box borderBottom={1} borderColor='rgba(152, 152, 255, 0.10)' p={4}>
        <Heading color='white500' weight={400} size={4} as='h2'>
          Rename Bookmark Group
        </Heading>
      </Box>
      <VStack as='form' px={4} pb={4} gap={5} h='100%'>
        <Box>
          <FormControl>
            <Input
              autoFocus
              onChange={(e) => update({ name: e.target.value })}
              name={state.name}
              value={state.name}
              color='white500'
              focusColor='purple500'
              type='text'
              maxLength={60}
              variant='flushed'
              placeholder='Group Name'
            />
            <FormControl.HelperText>
              {state.name.length} / 60
            </FormControl.HelperText>
          </FormControl>
        </Box>
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
          fullWidth
          radius={2}
          className={makeButtonLarger('2.5rem', '15px')}
        >
          Edit Group
        </Button>
      </VStack>
    </VStack>
  );
}
RenameBookmarkGroup.displayName = 'RenameBookmarkGroup';

export default RenameBookmarkGroup;
