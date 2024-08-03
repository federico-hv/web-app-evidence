import { useMutation } from '@apollo/client';
import { ADD_TO_WATCHLIST } from '../../../../../features/watchlist/mutations';
import { ErrorMessage, useToast } from '../../../../../shared';
import { GET_WATCHLIST } from '../../../../../features/watchlist/queries';

interface Artist {
  id: string;
  name: string;
  avatar: string;
  username: string;
}

interface Auction {
  id: string;
  endsAt: number;
  entryPrice: number;
}

interface Club {
  id: string;
  url: string | null;
  coverImage: string;
}

interface AddToWatchListResponse {
  id: number;
  artist: Artist;
  auction: Auction | null;
  club: Club | null;
}

export function useAddToWatchList(accountId: string) {
  const { openWith } = useToast();
  const [mutation, { loading, error }] = useMutation<
    {
      addToWatchList: AddToWatchListResponse;
    },
    { clubId: string }
  >(ADD_TO_WATCHLIST);

  const addItem = async (clubId: string) => {
    try {
      await mutation({
        variables: { clubId },
      });

      openWith({
        status: 'success',
        description: 'Item saved to watchlist',
      });
    } catch (e: any) {
      if (import.meta.env.DEV) {
        console.error(e);
      }

      const itemAlreadySavedMessage =
        'You have already saved this club to your watchlist.';

      const itemAlreadySaved = e.networkError?.result?.errors[0]?.message;

      if (
        itemAlreadySaved &&
        itemAlreadySaved === itemAlreadySavedMessage
      ) {
        return openWith({
          status: 'danger',
          description: itemAlreadySavedMessage,
        });
      }

      openWith({
        status: 'danger',
        description: ErrorMessage.Any,
      });
    }
  };

  return { addItem };
}
