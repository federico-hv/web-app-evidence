import { gql } from '@apollo/client';

export const GET_PRESET_PERKS = gql`
  query presetPerks {
    presetPerks {
      id
      label
      description
    }
  }
`;

export const GET_PRESET_GENRES = gql`
  query presetGenres {
    presetGenres {
      label
      id
    }
  }
`;
