import { useQuery } from '@apollo/client';
import { GET_CONTENDERS } from '../../../../features/auction/queries';

export interface ContenderEdge {
  node: {
    owner: {
      id: string;
      displayName: string;
      username: string;
      role: string;
    };
    bid: {
      id: number;
      amount: number;
      createdAt: Date;
    };
  };
}
export interface ContendersData {
  contenders: {
    edges: ContenderEdge[];
  };
}

export function useGetContenders(id: number = -1, filter: string) {
  //Upddate typescript types
  return useQuery<ContendersData, any>(GET_CONTENDERS, {
    variables: { id, filter },
    pollInterval: 1,
  });
}
