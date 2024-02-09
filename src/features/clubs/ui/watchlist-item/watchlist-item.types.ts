import { OnSaleMembershipModel } from "features/clubs/shared";

export interface WatchlistItemProps {
    data: OnSaleMembershipModel;
    active: boolean;
    to: string;
  }