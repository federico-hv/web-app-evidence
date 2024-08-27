import { OgSite } from '../../../../shared';
import { FeedAudienceEnum } from '../enum';

export interface CreateArticleInput {
  title: string;
  description: string;
  imageUrl: string;
  url: string;
  site: OgSite;
  audience?: FeedAudienceEnum;
}
