import { ReactNode } from 'react';
import { Text, VStack } from '@holdr-ui/react';
// Need to start exporting this properly
import { TextProps } from '@holdr-ui/react/dist/components/text/src/text.types';

function TextGroup({ children }: { children?: ReactNode }) {
  return (
    <VStack
      gap={1}
      w='100%'
      borderBottom={2}
      borderColor='base100'
      css={{
        '@bp4': {
          borderBottom: 'none',
        },
      }}
    >
      {children}
    </VStack>
  );
}
TextGroup.displayName = 'TextGroup';

const TextGroupItem = ({ children }: TextProps) => {
  return (
    <Text weight={600} size={4}>
      {children}
    </Text>
  );
};
TextGroupItem.displayName = 'TextGroupItem';

TextGroup.Item = TextGroupItem;

export { TextGroupItem };

export default TextGroup;
