import { gql } from "@apollo/client";
import { REPOSITORY_DETAILS } from "./fragment";

export const GET_REPOSITORIES = gql`
  query ($orderDirection: OrderDirection, $orderBy: AllRepositoriesOrderBy, $searchKeyword: String , $after: String)  {
    repositories(orderDirection: $orderDirection, orderBy: $orderBy, searchKeyword: $searchKeyword ,after: $after, first: 20) {
      edges {
        node {
          ...RepositoryDetails
          ownerName
          createdAt
          ratingAverage
        }
      }
      pageInfo {
      endCursor
      startCursor
      hasNextPage
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
  query ($repositoryId: ID!,$after: String )  {
    repository(id: $repositoryId ) {
      ...RepositoryDetails
      url
      ownerName
      id
      fullName
      reviews( after: $after ) {
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
          pageInfo {
            endCursor
            startCursor
            hasNextPage
          }
      }
    
    }
  }
  ${REPOSITORY_DETAILS}
`;

export const d = gql`
query{
repository(id: "jaredpalmer.formik") {
    id
    fullName
    reviews(first: 2, after: "WyIxYjEwZTRkOC01N2VlLTRkMDAtODg4Ni1lNGEwNDlkN2ZmOGYuamFyZWRwYWxtZXIuZm9ybWlrIiwxNTg4NjU2NzUwMDgwXQ==") {
      totalCount
      edges {
        node {
          id
          text
          rating
          createdAt
          repositoryId
          user {
            id
            username
          }
        }
        cursor
      }
      pageInfo {
        endCursor
        startCursor
        hasNextPage
      }
    }
  }
}`
export const GET_MY_REVIEWS = gql`
query{
  me{ 
    username
    createdAt
    reviews {
      edges {
        node {
          id
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
