export interface HeadProps {
  title: string;
  prefix?: string;
  description: string;
  /** image url */
  image?: string;
  /** canonical version - no url params example: '/releases/boslen/levels'*/
  url?: string;
  type?: string;
}
