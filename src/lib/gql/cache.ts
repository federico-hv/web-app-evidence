import { InMemoryCache } from '@apollo/client';

export const GQLCache = new InMemoryCache({
  typePolicies: {
    SocialLinkModel: {
      // use the provider name as the ID for a SocialLinkModel
      keyFields: ['provider'],
    },
  },
});
