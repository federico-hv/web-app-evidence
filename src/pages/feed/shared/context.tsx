import { GeneralContextProvider, GenericProps } from '../../../shared';
import { useParams } from 'react-router-dom';
import { useSuspenseQuery } from '@apollo/client';
import { FeedModel, GET_FEED } from '../../../features';

function FeedProvider({ children }: GenericProps) {
  const { id } = useParams();
  const { data } = useSuspenseQuery<{ feed: FeedModel }, { id: string }>(
    GET_FEED,
    { variables: { id: id || '' } },
  );

  return (
    <GeneralContextProvider
      value={{
        state: data.feed,
        update: () => {
          return;
        },
      }}
    >
      {children}
    </GeneralContextProvider>
  );
}
FeedProvider.displayName = 'FeedProvider';

export { FeedProvider };
