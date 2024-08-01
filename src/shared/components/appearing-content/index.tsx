import React from 'react';
import { GenericProps } from '@holdr-ui/react';
import { MotionBox } from '../../styles';

function AppearingContent({ children }: GenericProps) {
  return (
    <MotionBox
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      flex={1}
    >
      {children}
    </MotionBox>
  );
}
AppearingContent.displayName = 'AppearingContent';

export default AppearingContent;
