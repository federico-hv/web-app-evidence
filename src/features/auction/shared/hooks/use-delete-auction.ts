import { useMutation } from '@apollo/client';
import { DELETE_LIVE_AUCTION } from '../../mutations';
import {
  ErrorMessage,
  makePath,
  Paths,
  useToast,
} from '../../../../shared';
import { IAuction } from '../types';
import { GET_AUCTION } from '../../queries';
import { useNavigate, useParams } from 'react-router-dom';

export function useDeleteAuction() {
  const navigate = useNavigate();

  const { slug } = useParams();

  const { openWith } = useToast();

  const [mutation, results] = useMutation<
    { deleteAuction: IAuction },
    { id: number }
  >(DELETE_LIVE_AUCTION);

  const deleteAuction = async (auctionId: number, clubId: string) => {
    try {
      return await mutation({
        variables: { id: auctionId },
        refetchQueries: [{ query: GET_AUCTION, variables: { clubId } }],
      }).then((r) => {
        if (r.data?.deleteAuction) {
          openWith({
            status: 'success',
            description: 'We have successfully deleted the live auction',
          });

          navigate(makePath([Paths.clubs, slug || '']));
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
    deleteAuction,
    ...results,
  };
}
