import * as React from "react";
import { StyleSheet } from "react-native";
import { Button, Card, Text } from "react-native-paper";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { favoutriteMoviesContext } from "../Context/FavouriteMoviesContext";

const FavouriteCardComp = ({ movie }) => {
  const { setFavMovies, FavMovies } = React.useContext(favoutriteMoviesContext);

  const handleFavMoviesClickedFP = (movie) => {
    setFavMovies((oldState) => oldState.filter((m) => m.id !== movie.id));
  };

  return (
    <Card style={styles.CardStyle}>
      <Card.Cover
        source={{
          uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
        }}
        style={styles.cover}
      />
      <Card.Content>
        <Text style={styles.title} variant="titleLarge">
          {movie.original_title}
        </Text>
        <Text style={styles.subtitle}>
          {movie.release_date ? `Release Date: ${movie.release_date}` : ""}
        </Text>
        <Text style={styles.overview}>
          {movie.overview ? `${movie.overview.substring(0, 100)}...` : ""}
        </Text>
      </Card.Content>
      <Card.Actions style={styles.actions}>
        <MaterialIcons
          name="favorite"
          onPress={() => handleFavMoviesClickedFP(movie)}
          color={"#009688"}
          size={28}
          style={styles.icon}
        />
      </Card.Actions>
    </Card>
  );
};

const styles = StyleSheet.create({
  CardStyle: {
    backgroundColor: "#282c34", // Dark blue-grey
    margin: 15,
    borderRadius: 10,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cover: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  title: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
    fontStyle: "italic",
    marginVertical: 10,
  },
  subtitle: {
    color: "gray",
    textAlign: "center",
    marginBottom: 10,
  },
  overview: {
    color: "white",
    textAlign: "justify",
    marginBottom: 10,
  },
  actions: {
    justifyContent: "flex-end",
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
  icon: {
    padding: 5,
  },
});

export default FavouriteCardComp;
