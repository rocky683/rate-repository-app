import { FlatList, Linking, Pressable, StyleSheet, View } from "react-native";
import RepositoryItem from "./RepositoryItem";
import Text from "./Text";
import { useParams } from "react-router-native";
import useRepoReviews from "../hooks/useRepoReviews";
export const ItemSeparator = () => <View style={ReviewStyle.separator} />;

export const ReviewStyle = StyleSheet.create({
  separator: {
    height: 20,
    backgroundColor: "#ffaddf",
  },
  count: {
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 4,
    borderRadius: 100,
    height: 80,
    width: 80,
    borderBlockColor: "green",
  },
  githubUrl: {
    color: "white",
    padding: 6,
    textAlign: "center",
    borderRadius: 5,
  },
  reviewContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    display: "flex",
    flexDirection: "row",
    gap: 30,
  },
  reviewUser: {
    fontWeight: "bold",
    marginBottom: 5,
  },
  reviewText: { 
    maxWidth: "80%",

  },
});

const RepositoryInfo = ({ repository }) => (
  <View>
    <RepositoryItem item={repository} />
    <Pressable onPress={() => Linking.openURL(repository.url)}>
      <Text
        style={ReviewStyle.githubUrl}
        backgroundColor={"primary"}
        fontSize={"heading"}
      >
        Open In Github
      </Text>
    </Pressable>
  </View>
);
export const formatDateToDMY = (date) => {
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
  const year = date.getFullYear().toString();

  return `${day}/${month}/${year}`;
};
const DisplayReviewItem = ({ review }) => {
  const timestamp = review.user.createdAt;
  const date = new Date(timestamp);
  // log('dad',review);
  return (
    <View style={ReviewStyle.reviewContainer}>
      <View style={ReviewStyle.count}>
        <Text   fontSize={"heading"}>{review.rating}</Text>
      </View>
      <View>
        <Text fontSize={"subheading"}>{formatDateToDMY(date)}</Text>
        <Text fontSize={"subheading"} style={ReviewStyle.reviewUser}>{review.user.username}</Text>
        <Text style={ReviewStyle.reviewText}>{review.text}</Text>
      </View>
    </View>
  );
};

const SingleRepository = () => {
  const { id } = useParams("/repositoryView/:id");
  const {fetchMore, data, loading, error } = useRepoReviews(id)

  const onEndReach = () => {
    console.log('You have reached the end of the list');
    fetchMore();
  };
  if (error) {
    return (
      <Text color={"primary"} fontSize={"heading"}>
        Something went wrong
      </Text>
    );
  }

  if (loading) {
    return (
      <Text color={"primary"} fontSize={"heading"}>
        Loading...
      </Text>
    );
  }

  const repository = data?.repository;
  const reviews = repository.reviews.edges.map((edge) => edge.node);
  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => <DisplayReviewItem review={item} />}
      keyExtractor={({ id }) => id}
      ListHeaderComponent={() => <RepositoryInfo repository={repository} />}
      ItemSeparatorComponent={ItemSeparator}
      onEndReached={onEndReach}
      onEndReachedThreshold={0.5}
    />
  );
};

export default SingleRepository;
