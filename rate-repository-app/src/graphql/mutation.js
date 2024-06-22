import { gql } from "@apollo/client";

export const GET_USER_ACCESS_TOKEN = gql`
  mutation Authenticate($credentials: AuthenticateInput!) {
    authenticate(credentials: $credentials) {
      accessToken
      expiresAt
    }
  }
`;
export const CREATE_REVIEW = gql`
  mutation ($review: CreateReviewInput) {
    createReview(review: $review) {
      id
      user {
        username
      }
      repository {
        createdAt
        description
        ownerName
        ownerAvatarUrl
        fullName
        url
        watchersCount
      }

      userId
      repositoryId
      rating
      createdAt
      text
    }
  }
`;
