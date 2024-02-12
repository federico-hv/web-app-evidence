import { UserModel } from "shared";

export interface MyMembersItemProps {
    data: UserModel;
    isOnline: boolean;
    to: string;
  }