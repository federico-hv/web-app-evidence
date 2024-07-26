import {
  Box,
  Select,
  SelectContent,
  SelectItem,
  SelectItemList,
  SelectTrigger,
  useSwitch,
} from '@holdr-ui/react';
import { useParams } from 'react-router-dom';
import {
  useBookmarkGroupQuery,
  useChangeBookmarkGroupVisibilityMutation,
} from '../../../features';
import { Fragment, useEffect } from 'react';

enum BookmarkGroupVisibility {
  private = 'private',
  public = 'public',
}

function SelectVisibility() {
  const { id } = useParams();

  const { switchState: isPrivate, turnOn, turnOff } = useSwitch(false);

  const { data, loading, error } = useBookmarkGroupQuery(id || '');

  const { changeVisibility } = useChangeBookmarkGroupVisibilityMutation();

  useEffect(() => {
    if (data && data.bookmarkGroup.private) {
      turnOn();
    }
  }, [data]);

  if (error || loading) {
    return <Fragment />;
  }

  return (
    <Fragment>
      {data && (
        <Select
          value={
            isPrivate
              ? BookmarkGroupVisibility.private
              : BookmarkGroupVisibility.public
          }
          onValueChange={async (value) => {
            // optimistic update.
            value === BookmarkGroupVisibility.private
              ? turnOn()
              : turnOff();

            await changeVisibility(
              id || '',
              value === BookmarkGroupVisibility.private,
            );
          }}
        >
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
                value={BookmarkGroupVisibility.public}
                label='Public'
              />
              <SelectItem
                icon='lock-outline'
                py={2}
                radius={1}
                css={{ fontSize: '$2' }}
                value={BookmarkGroupVisibility.private}
                label='Private'
              />
            </SelectItemList>
          </SelectContent>
        </Select>
      )}
    </Fragment>
  );
}

export default SelectVisibility;
