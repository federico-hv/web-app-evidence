import { IconButton } from '@holdr-ui/react';
import { useGoBack } from '../../hooks';
import { css } from '../../../configs';

const noShrink = css({
  flexShrink: 0,
});

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
