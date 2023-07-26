import { OgSite } from '../../../../shared';

export interface CreateArticleInput {
  title: string;
  description: string;
  imageUrl: string;
  url: string;
  site: OgSite;
}
