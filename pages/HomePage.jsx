import React, { useContext, useEffect, useState } from "react";
import { FlatList, StyleSheet, View, Text } from "react-native";
import { TextInput, Button } from "react-native-paper";
import CardComp from "../Components/Card";
import { movieContext } from "../Context/MovieContext";

const HomePage = () => {
  const { movies } = useContext(movieContext);
  // const {setFavMovies, FavMovies} = useContext(favoutriteMoviesContext)
  const [inputValue, setInputValue] = useState("");
  const [filteredMovies, setFilteredMovies] = useState([]);
  
  // console.warn(filteredMovies);
  const renderMovieItem = ({ item }) => (
    <CardComp key={item.id} movie={item} style={styles.card} />
  );
  
  
  useEffect(() => {
    setFilteredMovies(movies)
    // console.log("Hi");
  }, [movies])


  const handleInputChange = (txt) => {
    setInputValue(txt);
    searchMovie(txt);
  };

  const searchMovie = (txt) => {
    if (!txt) {
      setFilteredMovies(movies);
    } else {
      const filtered = movies.filter((m) =>
        m.original_title.toLowerCase().includes(txt.toLowerCase())
      );
      setFilteredMovies(filtered);
    }
  };

  if(!filteredMovies){
    <Text>Loading...</Text>
  }
  return (
    <>
      <View style={styles.searchContainer}>
        <TextInput
          style={[styles.txtInput, { color: "white" }]}
          placeholder="Search a Movie"
          value={inputValue}
          onChangeText={handleInputChange}
        />
        <Button mode="contained" onPress={() => console.log("Pressed")}>
          Filter
        </Button>
      </View>
      <View style={styles.container}>
        <FlatList
          data={filteredMovies}
          renderItem={renderMovieItem}
          keyExtractor={(item) => item.id.toString()}
          horizontal={false}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchContainer: {
    flexDirection: "row",
    marginHorizontal: 10,
    alignItems: "center",
  },
  txtInput: {
    width: "70%",
    marginHorizontal: 10,
    height: 45,
  },
});

export default HomePage;
