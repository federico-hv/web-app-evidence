import { IPerk, ITinyClub } from '../../clubs';

export interface IMembership {
  id: number;
  number: number;
  club: ITinyClub;
  perks: IPerk[];
}
