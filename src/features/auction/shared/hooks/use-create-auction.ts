import { useMutation } from '@apollo/client';
import { CREATE_LIVE_AUCTION } from '../../mutations';
import { useToast } from '../../../../shared';
import {
  ErrorMessage,
  Paths,
  prefix,
  usePreviousLocation,
} from '../../../../shared';
import { useNavigate } from 'react-router-dom';
import { GET_AUCTION } from '../../queries';
import { CreateAuctionPayload, IAuction } from '../types';

export function useCreateAuction() {
  const { openWith } = useToast();

  const navigate = useNavigate();

  const previousLocation = usePreviousLocation(prefix('/', Paths.clubs));

  const [mutation, results] = useMutation<
    { createAuction: IAuction },
    { payload: CreateAuctionPayload }
  >(CREATE_LIVE_AUCTION);

  const createAuction = async (payload: CreateAuctionPayload) => {
    try {
      return await mutation({
        variables: { payload: payload },
        refetchQueries: [
          { query: GET_AUCTION, variables: { clubId: payload.clubId } },
        ],
      }).then((r) => {
        if (r.data?.createAuction) {
          openWith({
            status: 'success',
            description: 'We have successfully initiated your auction!',
          });

          navigate(previousLocation);
        }

        return r;
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

  return {
    createAuction,
    ...results,
  };
}
