import { createContext, useContext } from 'react';
import { GenericProps, useRecordState } from '@holdr-ui/react';

export enum AuctionEventNameEnum {
  'success' = 'success',
  'outbid' = 'outbid',
  'updated' = 'updated',
}

interface IAuctionAlertState {
  status?: 'success' | 'warning';
  eventName?: AuctionEventNameEnum;
}

const AuctionAlertContext = createContext<{
  state?: IAuctionAlertState;
  update: (data: Partial<IAuctionAlertState>) => void;
}>({
  update: (data) => console.log(data),
});

const AuctionAlertContextProvider = AuctionAlertContext.Provider;
const AuctionAlertContextConsumer = AuctionAlertContext.Consumer;

function useAuctionAlertContext() {
  return useContext(AuctionAlertContext);
}

function AuctionAlertProvider({ children }: GenericProps) {
  const [state, update] = useRecordState<IAuctionAlertState>({
    status: undefined,
    eventName: undefined,
  });

  return (
    <AuctionAlertContextProvider value={{ state, update }}>
      {children}
    </AuctionAlertContextProvider>
  );
}

export {
  AuctionAlertContext,
  AuctionAlertContextConsumer,
  AuctionAlertContextProvider,
  useAuctionAlertContext,
  AuctionAlertProvider,
};
