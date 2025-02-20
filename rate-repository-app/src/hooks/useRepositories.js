import { useQuery } from "@apollo/client";
import {  useState } from "react";
import { GET_REPOSITORIES } from "../graphql/queries";

const useRepositories = () => {
  const [orderDirection, setOrderDirection] = useState('DESC');
  const [orderBy, setOrderBy] = useState('CREATED_AT');
  const [searchQuery,setSearchQuery] = useState('');

  const variables = {
    orderDirection,
    orderBy,
    searchKeyword:searchQuery
  }

  const { data, loading,fetchMore,  refetch } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: 'cache-and-network',
     variables:{
      ...variables
     }
  });
  const handleFetchMore = () => {
    const canFetchMore = !loading && data?.repositories.pageInfo.hasNextPage;
    if (!canFetchMore) {
      return;
    }

    fetchMore({
      variables: {
        after: data.repositories.pageInfo.endCursor,
        ...variables,
      },
    });
  };

  

  const changeOrderDirection = (direction) => {
    setOrderDirection(direction);
    refetch({
      orderDirection: direction,
      orderBy,
    });
  };

  const changeOrderBy = (newOrderBy) => {
    setOrderBy(newOrderBy);
    refetch({
      orderDirection,
      orderBy: newOrderBy,
    });
  };

  const changeSearchQuery = (query) =>{
    setSearchQuery(query);
  }

  return {fetchMore:handleFetchMore, repositories:data?.repositories, loading, refetch, changeOrderDirection, changeOrderBy, changeSearchQuery };
};

export default useRepositories;
