import { gql } from "@apollo/client";

export const GET_RELEASES = gql`
  query {
    allReleases {
      id
      name
      date
      status
    }
  }
`;
