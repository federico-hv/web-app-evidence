import { Fragment } from 'react';
import { Box, HStack } from '@holdr-ui/react';
import { usePresetPerks } from '../../../../../features';
import { IAboutMeState } from '../shared';
import PerksListLoader from './perk-list.loader';

function PerkList({
  selected,
  onSelect,
}: {
  selected: number[];
  onSelect: (next: Partial<IAboutMeState>) => void;
}) {
  const { loading, data, error } = usePresetPerks();

  if (error) {
    // should we show the error?
  }

  if (loading) {
    return <PerksListLoader />;
  }

  return (
    <Fragment>
      {data && (
        <HStack gap={2} wrap='wrap'>
          {data.presetPerks.map(({ id, label }) => {
            const isSelected =
              selected.findIndex((item) => item === id) > -1;

            const insert = (value: number) =>
              onSelect({ perks: [...selected, value] });

            const remove = (value: number) =>
              onSelect({
                perks: selected.filter((item) => item !== value),
              });

            return (
              <Box
                role='checkbox'
                onClick={() => {
                  isSelected ? remove(id) : insert(id);
                }}
                className='perk-option'
                fontSize={1}
                px={2}
                py={1}
                color={isSelected ? '#30304b' : 'purple100'}
                borderColor={isSelected ? '#30304b' : 'purple100'}
                border={1}
                radius='full'
                bgColor={isSelected ? 'purple100' : '#30304b'}
              >
                {label}
              </Box>
            );
          })}
        </HStack>
      )}
    </Fragment>
  );
}

export default PerkList;
