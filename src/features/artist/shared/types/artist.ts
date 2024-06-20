export interface IArtist {
  id: string;
  name: string;
  bio?: string;
  avatar?: string;
  location?: string;
  username: string;
  accountId: string;
  isVerified: boolean;
}

export interface IMeArtist {
  id: string;
}
