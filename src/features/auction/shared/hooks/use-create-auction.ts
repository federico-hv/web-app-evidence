import { useMutation } from '@apollo/client';
import { CREATE_LIVE_AUCTION } from '../../mutations';
import { makePath, useToast } from '../../../../shared';
import { ErrorMessage, Paths } from '../../../../shared';
import { useNavigate, useParams } from 'react-router-dom';
import { GET_AUCTION } from '../../queries';
import { CreateAuctionPayload, IAuction } from '../types';

export function useCreateAuction() {
  const { slug } = useParams();

  const { openWith } = useToast();

  const navigate = useNavigate();

  const [mutate, results] = useMutation<
    { createAuction: IAuction },
    { payload: CreateAuctionPayload }
  >(CREATE_LIVE_AUCTION);

  const createAuction = async (payload: CreateAuctionPayload) => {
    try {
      return await mutate({
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

          navigate(makePath([Paths.clubs, slug || '', Paths.bids]));
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
