import { gql } from "@apollo/client";
import { REPOSITORY_DETAILS } from "./fragment";

export const GET_REPOSITORIES = gql`
  query ($orderDirection: OrderDirection, $orderBy: AllRepositoriesOrderBy, $searchKeyword: String) {
    repositories(orderDirection: $orderDirection, orderBy: $orderBy, searchKeyword: $searchKeyword) {
      edges {
        node {
          ...RepositoryDetails
          ownerName
          createdAt
          ratingAverage
        }
      }
    }
  }
  ${REPOSITORY_DETAILS}
`;

export const GET_ME = gql`
  query {
    me {
      username
      id
    }
  }
`;
export const GET_SNGLE_REPO = gql`
  query ($repositoryId: ID!) {
    repository(id: $repositoryId) {
      ...RepositoryDetails
      url
      ownerName
      id
      fullName
      reviews {
        edges {
          node {
            id
            text
            rating
            createdAt
            user {
              id
              username
              createdAt
              reviewCount
             
            }
          }
        }
      }
    }
  }
  ${REPOSITORY_DETAILS}
`;

export const GET_MY_REVIEWS = gql`
query{
  me{ 
    username
    createdAt
    reviews {
      edges {
        node {
          createdAt
          text
          rating
          repositoryId
        }
      }
    }
  }
}
`
// openIssuesCount
// url
// user
// userHasReviewed
// watchersCount
