import React, { ReactNode } from 'react';
import { Dialog } from '@holdr-ui/react';
import { getSubComponent } from '../../../utilities';
import { CustomDialog1Props } from './custom-dialog-1.types';

export function CustomDialog1({
  children,
  isOpen,
  onOpen,
  onClose,
}: CustomDialog1Props) {
  const Header = getSubComponent(children, 'CustomDialog1Header');
  const Body = getSubComponent(children, 'CustomDialog1Body');
  const Footer = getSubComponent(children, 'CustomDialog1Footer');

  return (
    <Dialog
      isOpen={isOpen}
      onClose={onClose}
      onOpen={onOpen}
      ariaDescribedBy='channels-modal__heading'
    >
      <Dialog.Portal>
        <Dialog.Overlay />
        <Dialog.Content
          h={{ '@bp1': '100vh', '@bp3': 650 }}
          maxHeight={{ '@bp1': '100vh', '@bp3': '85vh' }}
          radius={{ '@bp1': 0, '@bp2': 3 }}
          maxWidth={650}
          w={{ '@bp1': '100vw', '@bp2': '95vw', '@bp3': '90vw' }}
        >
          <Dialog.Header>{Header}</Dialog.Header>
          <Dialog.Body>{Body}</Dialog.Body>
          <Dialog.Footer>{Footer}</Dialog.Footer>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog>
  );
}

export const CustomDialog1Header = ({
  children,
}: {
  children: ReactNode;
}) => {
  return <>{children}</>;
};
CustomDialog1Header.displayName = 'CustomDialog1Header';

export const CustomDialog1Body = ({
  children,
}: {
  children: ReactNode;
}) => {
  return <>{children}</>;
};
CustomDialog1Body.displayName = 'CustomDialog1Body';

export const CustomDialog1Footer = ({
  children,
}: {
  children: ReactNode;
}) => {
  return <>{children}</>;
};
CustomDialog1Footer.displayName = 'CustomDialog1Footer';

export default CustomDialog1;
