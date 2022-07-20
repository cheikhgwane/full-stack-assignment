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

export const GET_ONE_RELEASE = gql`
  query getRelease($id: ID!) {
    release(id: $id) {
      id
      name
      date
      status
      info
      steps
    }
  }
`;
