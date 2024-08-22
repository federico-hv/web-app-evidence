import { Box, GenericProps, Icon } from '@holdr-ui/react';

function ShowPasswordButton({
  show,
  onClick,
}: GenericProps & { show: boolean }) {
  return (
    <Box onClick={onClick}>
      <Icon name={show ? 'eye-show' : 'eye-hide'} />
    </Box>
  );
}

export default ShowPasswordButton;
