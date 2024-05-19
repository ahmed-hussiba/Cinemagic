import React, { useEffect, useState, useContext, useCallback } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  FlatList,
  Pressable,
} from "react-native";
import { movieContext } from "../Context/MovieContext";
import YoutubePlayer from "react-native-youtube-iframe";
import { Dialog } from "@rneui/base/dist";

const MovieDetailsPage = ({ route }) => {
  const { params } = route;
  const [movie, setMovie] = useState(null);
  const [popMovies, setPopMovies] = useState([]);
  const [trailerId, setTrailerId] = useState("");
  const { popularMovies } = useContext(movieContext);
  const [visible, setVisible] = useState(false);
  const [playing, setPlaying] = useState(false);

  const fetchMovieDetails = useCallback(() => {
    console.log("Fetching movie details...");
    fetch(
      `https://api.themoviedb.org/3/movie/${params}?api_key=750ea252b384c0245473348ca6525dc0&append_to_response=videos`
    )
      .then((res) => res.json())
      .then((res) => {
        console.log("Movie details fetched: ", res);
        setMovie(res);
        const trailer = res.videos.results.find(
          (video) => video.type === "Trailer"
        );
        if (trailer) {
          setTrailerId(trailer.key);
          console.log("Trailer ID: ", trailer.key);
        } else {
          console.log("No trailer found");
        }
      })
      .catch((err) => console.log("Error fetching movie details: ", err));
  }, [params]);

  useEffect(() => {
    fetchMovieDetails();
  }, [fetchMovieDetails]);

  useEffect(() => {
    setPopMovies(popularMovies);
  }, [popularMovies]);

  const toggleDialog = () => {
    setVisible(!visible);
  };

  const togglePlaying = useCallback(() => {
    setPlaying((prev) => !prev);
  }, []);

  const onReady = useCallback(() => {
    setPlaying(true); // Start playing automatically when the player is ready
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Image
        source={{ uri: `https://image.tmdb.org/t/p/w500${movie?.poster_path}` }}
        style={styles.poster}
      />
      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{movie?.title}</Text>
        {movie?.tagline ? (
          <Text style={styles.tagline}>"{movie.tagline}"</Text>
        ) : null}
        <Text style={styles.overview}>{movie?.overview}</Text>
        <View style={styles.infoContainer}>
          <Text style={styles.infoLabel}>Release Date:</Text>
          <Text style={styles.infoValue}>{movie?.release_date}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.infoLabel}>Runtime:</Text>
          <Text style={styles.infoValue}>{movie?.runtime} minutes</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.infoLabel}>Vote Average:</Text>
          <Text style={styles.infoValue}>{movie?.vote_average}</Text>
        </View>
        {trailerId ? (
          <Pressable style={styles.trailerButton} onPress={toggleDialog}>
            <Text style={styles.trailerButtonText}>Watch the Trailer</Text>
          </Pressable>
        ) : null}
      </View>
      <Text style={styles.popularTitle}>Similar Movies</Text>
      <View style={styles.popMoviesSection}>
        <FlatList
          horizontal
          data={popMovies}
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
      <Dialog style={styles.centeredView}  isVisible={visible} onBackdropPress={toggleDialog}>
            
              {/* <View style={styles.centeredView}> */}
          <YoutubePlayer
            
            width={300}
            height={180}
            videoId={trailerId}
            play={true}
            onReady={onReady}
            onChangeState={(event) =>
              console.log("Player state changed: ", event)
            }
          />
        {/* </View> */}
      </Dialog>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#141414",
    marginTop: 30,
  },
  poster: {
    width: "100%",
    height: 500,
    resizeMode: "cover",
    marginBottom: 20,
  },
  detailsContainer: {
    padding: 20,
    backgroundColor: "#1c1c1c",
    borderRadius: 10,
    marginHorizontal: 10,
    elevation: 5,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#fff",
    textAlign: "center",
  },
  tagline: {
    fontStyle: "italic",
    fontSize: 18,
    marginBottom: 10,
    color: "#bbb",
    textAlign: "center",
  },
  overview: {
    fontSize: 16,
    marginBottom: 20,
    color: "#ddd",
    textAlign: "justify",
  },
  infoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  infoLabel: {
    fontSize: 16,
    color: "#888",
  },
  infoValue: {
    fontSize: 16,
    color: "#ddd",
  },
  trailerButton: {
    backgroundColor: "#009688",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginVertical: 10,
  },
  trailerButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
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
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default MovieDetailsPage;
