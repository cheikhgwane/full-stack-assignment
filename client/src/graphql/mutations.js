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
