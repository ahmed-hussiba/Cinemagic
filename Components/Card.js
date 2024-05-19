import * as React from "react";
import { StyleSheet, View } from "react-native";
import { Button, Card, Text } from "react-native-paper";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { favoutriteMoviesContext } from "../Context/FavouriteMoviesContext";

const CardComp = ({ movie }) => {
  const [isLiked, setIsLiked] = React.useState(false);
  const { setFavMovies, FavMovies } = React.useContext(favoutriteMoviesContext);

  React.useEffect(() => {
    const isFav = FavMovies?.find((m) => m.id === movie.id);
    setIsLiked(isFav);
  }, [FavMovies]);

  const handleFavMoviesClicked = (movie) => {
    if (!isLiked) {
      setIsLiked(true);
      setFavMovies((oldState) => [...oldState, movie]);
    } else {
      setIsLiked(false);
      setFavMovies((oldState) => oldState.filter((m) => m.id !== movie.id));
    }
  };

  const renderStars = (rating) => {
    const stars = [];
    const starCount = Math.round(rating / 2); // Convert rating to 5-star scale
    for (let i = 1; i <= 5; i++) {
      let name = "star-border";
      if (i <= starCount) {
        name = "star";
      } else if (i - starCount < 1) {
        name = "star-half";
      }
      stars.push(
        <MaterialIcons
          key={i}
          name={name}
          size={20}
          color="#FFD700" // Gold color for stars
        />
      );
    }
    return stars;
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
        <View style={styles.ratingContainer}>
          {renderStars(movie.vote_average)}
        </View>
        <Text style={styles.genres}>
          {movie.genres ? `Genres: ${movie.genres.map((g) => g.name).join(", ")}` : ""}
        </Text>
        <Text style={styles.overview}>
          {movie.overview ? `${movie.overview.substring(0, 100)}...` : ""}
        </Text>
      </Card.Content>
      <Card.Actions style={styles.actions}>
        <MaterialIcons
          name="favorite"
          onPress={() => handleFavMoviesClicked(movie)}
          color={isLiked ? "#009688" : "white"}
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
  ratingContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 10,
  },
  genres: {
    color: "lightgray",
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
  txt: {
    color: "white",
    marginTop: 15,
  },
});

export default CardComp;
