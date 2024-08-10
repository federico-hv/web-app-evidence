import { HStack, Icon, Text } from '@holdr-ui/react';

function ErrorItem({
  text,
  hasError,
}: {
  hasError?: boolean;
  text: string;
}) {
  const getColor = (hasError?: boolean) => {
    if (hasError === undefined) return 'white700';

    return hasError ? 'danger200' : 'success400';
  };

  const getIcon = (hasError?: boolean) => {
    if (hasError === undefined) return 'close';

    return hasError ? 'close' : 'check';
  };

  return (
    <HStack color={getColor(hasError)} items='center' gap={2}>
      {<Icon size='xl' name={getIcon(hasError)} />}
      <Text size={2}>{text}</Text>
    </HStack>
  );
}
export default ErrorItem;
