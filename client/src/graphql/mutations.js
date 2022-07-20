import { gql } from "@apollo/client";

export const CREATE_RELEASE = gql`
  mutation createRelease($release: ReleaseInput!) {
    createRelease(release: $release) {
      release {
        id
        status
      }
    }
  }
`;

export const UPDATE_RELEASE = gql`
  mutation updateRelease($release: ReleaseUpdateInput!) {
    updateRelease(release: $release) {
      release {
        id
        name
        info
        date
        status
      }
    }
  }
`;

export const DELETE_RELEASE = gql`
  mutation deleteRelease($id: ID!) {
    deleteRelease(id: $id) {
      release {
        id
      }
    }
  }
`;
