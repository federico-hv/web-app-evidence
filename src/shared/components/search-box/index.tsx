import { Box, Icon, Input, InputGroup } from '@holdr-ui/react';
import { BoxProps } from '@holdr-ui/react/dist/components/box/src/box.types';

function SearchBox(props: Omit<BoxProps, 'children'>) {
  return (
    <Box {...props}>
      <InputGroup radius='full'>
        <InputGroup.LeftElement>
          <Icon name='search-outline' />
        </InputGroup.LeftElement>
        <Input
          css={{
            '@bp1': {
              fontSize: '$2',
            },
            '@bp3': {
              fontSize: '$3',
            },
          }}
          placeholder='Search'
        />
      </InputGroup>
    </Box>
  );
}
SearchBox.displayName = 'SearchBox';

export default SearchBox;
