import { ITinyClub } from '../../clubs';

export interface ITinyMembership {
  id: string;
  number: number;
  createdAt: Date;
}

export interface IMembership extends ITinyMembership {
  club: ITinyClub;
}
