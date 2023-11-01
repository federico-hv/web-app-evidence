import { HStack, Image, Text } from '@holdr-ui/react';
import { Responsive, ResponsiveItem } from '../../../../../shared';
import { AddToPostButtonProps } from './type';

function AddToPostButton({ logo, label, onClick }: AddToPostButtonProps) {
  return (
    <HStack
      items='center'
      radius={3}
      cursor='pointer'
      justify='center'
      gap={4}
      flex={1}
      onClick={onClick}
      h={{ '@bp1': 30, '@bp3': 40 }}
      _hover={{ backgroundColor: '$base100' }}
    >
      <Image
        size={{ '@bp1': 18, '@bp3': 20 }}
        src={logo}
        alt='media icon'
      />
      <Responsive>
        <ResponsiveItem tablet='show' laptop='show' desktop='show'>
          <Text
            size={{ '@bp1': 2, '@bp3': 3 }}
            color='base400'
            weight={500}
          >
            {label}
          </Text>
        </ResponsiveItem>
      </Responsive>
    </HStack>
  );
}
AddToPostButton.displayName = 'AddToPostButton';

export default AddToPostButton;
