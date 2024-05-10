import { createContext, useState } from 'react';
import { Box, Toast } from '@holdr-ui/react';
import { IToastContext, ToastContextState } from './toast.types';
import { dummyFn } from '../../utilities';
import { GenericProps } from '../../interfaces';
import { ThemeColor } from '@holdr-ui/react/dist/shared/types';
import { AlertStatus } from '@holdr-ui/react/dist/compositions/alert/src/alert.types';

const StatusColor: Record<AlertStatus, ThemeColor> = {
  success: 'success500',
  danger: 'danger500',
  info: 'info500',
  warning: 'warning500',
};

const ToastContext = createContext<IToastContext>({
  current: undefined,
  isOpen: false,
  onClose: dummyFn,
  onOpen: dummyFn,
});

function ToastProvider({ children }: GenericProps) {
  const [current, set] = useState<ToastContextState>();
  const [isOpen, setOpen] = useState(false);
  const onOpen = () => setOpen(true);
  const onClose = () => setOpen(false);

  return (
    <ToastContext.Provider
      value={{ current, isOpen, onClose, onOpen, set }}
    >
      <Box
        css={{
          zIndex: 200,
          position: 'relative',
        }}
      >
        <Toast.Provider>
          <Toast.Item
            position={
              ['danger', 'info', 'success'].includes(
                current?.status || 'info',
              )
                ? 'top-center'
                : 'bottom-center'
            }
            open={isOpen}
            onOpenChange={setOpen}
          >
            <Toast.Message
              color={
                current && current.status
                  ? StatusColor[current.status]
                  : 'inherit'
              }
              closeButtonProps={{
                colorTheme:
                  current && current.status
                    ? StatusColor[current.status]
                    : 'inherit',
              }}
              status={current?.status}
              description={current?.description}
              onCloseClick={onClose}
            />
            <Toast.Viewport />
          </Toast.Item>
        </Toast.Provider>
      </Box>
      {children}
    </ToastContext.Provider>
  );
}

export { ToastContext, ToastProvider };
export type { ToastContextState, IToastContext };
