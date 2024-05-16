import * as React from "react";
import { StyleSheet } from "react-native";
import { Button, Card, Text } from "react-native-paper";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { favoutriteMoviesContext } from "../Context/FavouriteMoviesContext";
import { useAnimatedKeyboard } from "react-native-reanimated";

const FavouriteCardComp = ({ movie}) => {


  const {setFavMovies, FavMovie}  = React.useContext(favoutriteMoviesContext)

    const handleFavMoviesClickedFP = (movie) => {
      setFavMovies((oldState) => oldState.filter((m) => m.id !== movie.id));
    }


  return (
    <>
      <Card style={styles.CardStyle}>
        <Card.Cover
          source={{
            uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
          }}
        />
        <Card.Content>
          <Text
            style={[
              styles.txt,
              { textAlign: "center", fontWeight: "bold", fontStyle: "italic" },
            ]}
            variant="titleLarge"
          >
            {movie.original_title}
          </Text>
          <Text style={styles.txt} variant="bodyMedium">
            {movie.overview}
          </Text>
        </Card.Content>
        <Card.Actions>
          <MaterialIcons
            name="favorite"
            onPress={() => {
                handleFavMoviesClickedFP(movie)
            }}
            color={"red"}
            size={28}
          ></MaterialIcons>
        </Card.Actions>
      </Card>
    </>
  );
};

const styles = StyleSheet.create({
  CardStyle: {
    backgroundColor: "black",
    color: "white",
    margin: 15,
  },
  txt: {
    color: "white",
    marginTop: 15,
  },
});
export default FavouriteCardComp;
