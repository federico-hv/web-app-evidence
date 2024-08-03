import { useMutation } from '@apollo/client';
import { REMOVE_FROM_WATCHLIST } from '../../../../../features/watchlist/mutations';
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
  endsAt: Date;
  entryPrice: number;
}

interface Club {
  id: string;
  url: string | null;
  coverImage: string;
}

interface RemoveFromWatchlistResponse {
  id: number;
  artist: Artist;
  auction: Auction | null;
  club: Club | null;
}

export function useRemoveFromWatchlist(accountId: string) {
  const { openWith } = useToast();
  const [mutation, { loading, error }] = useMutation<
    {
      removeFromWatchlist: RemoveFromWatchlistResponse;
    },
    {
      id: string | number;
    }
  >(REMOVE_FROM_WATCHLIST);

  const removeItem = async (id: string | number) => {
    try {
      await mutation({
        variables: { id },
      });
      openWith({
        status: 'success',
        description: 'Item removed from watchlist',
      });
    } catch (e) {
      if (import.meta.env.DEV) {
        console.error(e);
      }
      openWith({
        status: 'danger',
        description: ErrorMessage.Any,
      });
    }
  };

  return { removeItem };
}
