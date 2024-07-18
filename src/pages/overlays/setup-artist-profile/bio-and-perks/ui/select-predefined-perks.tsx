import { Fragment } from 'react';
import { Box, HStack } from '@holdr-ui/react';
import { usePresetPerks } from '../../../../../features';
import PerksListLoader from './perk-list.loader';

interface ISelectPredefinedPerksProps {
  values: number[];
  onChange: (values: number[]) => void;
}

function SelectPredefinedPerks({
  values,
  onChange,
}: ISelectPredefinedPerksProps) {
  const { loading, data, error } = usePresetPerks();

  // const [selectedPerks, setSelectedPerks] = useState<number[]>([]);

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
              values.findIndex((item) => item === id) > -1;

            const insert = (value: number) => onChange([...values, value]);

            const remove = (value: number) =>
              onChange(values.filter((item) => item !== value));

            return (
              <Box
                key={label}
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

export default SelectPredefinedPerks;
