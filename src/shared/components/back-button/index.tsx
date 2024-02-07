import { css, IconButton } from '@holdr-ui/react';
import { useGoBack } from '../../hooks';
import { noShrink } from '../../styles';

function BackButton({ fallbackPath }: { fallbackPath?: string }) {
  const goBack = useGoBack(fallbackPath);

  return (
    <IconButton
      variant='ghost'
      icon='arrow-left-outline'
      ariaLabel='go back'
      onClick={goBack}
      className={noShrink()}
    />
  );
}
BackButton.displayName = 'BackButton';

export default BackButton;
