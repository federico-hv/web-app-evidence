import { ISocialLink } from '../../../../shared';

export interface IArtist {
  id: string;
  name: string;
  bio?: string;
  avatar?: string;
  location?: string;
  username: string;
  accountId: string;
  isVerified: boolean;
  socialLinks?: ISocialLink[];
  collaborators?: ICollaborator[];
}

export interface IUpdateArtistProfile {
  name?: string;
  url?: string;
  bio?: string;
  avatar?: string;
  location?: string;
  username: string;
  isVerified: boolean;
  socialLinks?: ISocialLink[];
  collaborators?: string[];
}

export interface ICollaborator {
  name: string;
  id: number;
}

export interface IMeArtist {
  id: string;
}
