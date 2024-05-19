import React, { useContext, useEffect, useState, useCallback } from "react";
import {
  FlatList,
  StyleSheet,
  View,
  Text,
  Pressable,
  ImageBackground,
  Image,
} from "react-native";
import { TextInput, Button, Menu, Divider, Provider } from "react-native-paper";
import CardComp from "../Components/Card";
import { movieContext } from "../Context/MovieContext";
import { useNavigation } from "@react-navigation/native";
import { routes } from "../routes/routes";

const HomePage = () => {
  const {
    movies,
    popularMovies,
    nowPlayingMovies,
    upcomingMovies,
    topRatedMovies,
  } = useContext(movieContext);

  const [inputValue, setInputValue] = useState("");
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [visible, setVisible] = useState(false);
  const { navigate } = useNavigation();

  useEffect(() => {
    setFilteredMovies(movies);
  }, [movies]);

  const handleInputChange = (txt) => {
    setInputValue(txt);
    searchMovie(txt);
  };

  const renderMovieItem = useCallback(
    ({ item }) => (
      <Pressable onPress={() => navigate(routes.movieDetails, item.id)}>
        <CardComp
          isHomePage={true}
          key={item.id}
          movie={item}
          style={styles.card}
        />
      </Pressable>
    ),
    [navigate]
  );

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

  const handleFilterClick = (filterMovies) => {
    setFilteredMovies(filterMovies);
    setVisible(false);
  };

  return (
    <Provider>
      <ImageBackground
        source={{ uri: "https://example.com/background.jpg" }}
        style={styles.background}
      >
        <View style={styles.overlay}>
          <View style={styles.searchContainer}>
            <TextInput
              style={[styles.txtInput, { color: "white" }]}
              placeholder="Search a Movie"
              selectionColor="white"
              textColor="white"
              placeholderTextColor="gray"
              value={inputValue}
              onChangeText={handleInputChange}
              underlineColor="transparent"
              theme={{ colors: { text: "white", primary: "white" } }}
            />
            <Menu
              visible={visible}
              style={{ color: "black" }}
              contentStyle={{ backgroundColor: "black" }}
              onDismiss={() => setVisible(false)}
              anchor={
                <Button
                  onPress={() => setVisible(true)}
                  style={styles.filterButton}
                  mode="contained"
                >
                  Filter
                </Button>
              }
            >
              <Menu.Item
                onPress={() => handleFilterClick(nowPlayingMovies)}
                titleStyle={{ color: "white" }}
                title="Now Playing"
              />
              <Menu.Item
                onPress={() => handleFilterClick(upcomingMovies)}
                titleStyle={{ color: "white" }}
                title="Upcoming"
              />
              <Divider />
            </Menu>
          </View>
          <FlatList
            ListHeaderComponent={
              <>
                <Text style={styles.popularTitle}>Top Rated Movies</Text>
                <View style={styles.popMoviesSection}>
                  <FlatList
                    horizontal
                    data={topRatedMovies}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                      <View style={styles.popMovieContainer}>
                        <Image
                          source={{
                            uri: `https://image.tmdb.org/t/p/w300${item.poster_path}`,
                          }}
                          style={styles.popMoviePoster}
                        />
                        <Text style={styles.popMovieTitle}>{item.title}</Text>
                      </View>
                    )}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.popMoviesList}
                  />
                </View>
                <Text style={styles.popularTitle}>Popular Movies</Text>
                <View style={styles.popMoviesSection}>
                  <FlatList
                    horizontal
                    data={popularMovies}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                      <View style={styles.popMovieContainer}>
                        <Image
                          source={{
                            uri: `https://image.tmdb.org/t/p/w300${item.poster_path}`,
                          }}
                          style={styles.popMoviePoster}
                        />
                        <Text style={styles.popMovieTitle}>{item.title}</Text>
                      </View>
                    )}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.popMoviesList}
                  />
                </View>
              </>
            }
            contentContainerStyle={styles.listContent}
            data={filteredMovies}
            renderItem={renderMovieItem}
            keyExtractor={(item) => item.id.toString()}
            horizontal={false}
          />
        </View>
      </ImageBackground>
    </Provider>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: "#141414",
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
  },
  container: {
    flex: 1,
  },
  searchContainer: {
    flexDirection: "row",
    marginHorizontal: 10,
    marginTop: 20,
    alignItems: "center",
  },
  txtInput: {
    flex: 1,
    height: 45,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 5,
    paddingHorizontal: 10,
    borderRadius: 15,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    marginHorizontal: 5,
  },
  filterButton: {
    backgroundColor: "#009688", // Teal
  },
  listContent: {
    padding: 10,
  },
  popularTitle: {
    fontSize: 24,
    color: "#fff",
    marginTop: 20,
    marginLeft: 10,
    marginBottom: 10,
  },
  popMoviesSection: {
    marginBottom: 30,
  },
  popMoviesList: {
    paddingLeft: 10,
  },
  popMovieContainer: {
    marginRight: 15,
    alignItems: "center",
  },
  popMoviePoster: {
    width: 150,
    height: 225,
    borderRadius: 10,
  },
  popMovieTitle: {
    fontSize: 16,
    color: "#fff",
    textAlign: "center",
    marginTop: 10,
    width: 150,
  },
});

export default HomePage;
