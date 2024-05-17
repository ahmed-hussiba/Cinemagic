import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, Image, ScrollView } from "react-native";

const MovieDetailsPage = ({ route }) => {
  const { params } = route;
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${params}?api_key=750ea252b384c0245473348ca6525dc0`
    )
      .then((res) => res.json())
      .then((res) => {
        setMovie(res);
      })
      .catch((err) => console.log("Error: ", err));
  }, [params]);

  if (!movie) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Image
        source={{ uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}` }}
        style={styles.poster}
      />
      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{movie.title}</Text>
        {movie.tagline ? <Text style={styles.tagline}>"{movie.tagline}"</Text> : null}
        <Text style={styles.overview}>{movie.overview}</Text>
        <View style={styles.infoContainer}>
          <Text style={styles.infoLabel}>Release Date:</Text>
          <Text style={styles.infoValue}>{movie.release_date}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.infoLabel}>Runtime:</Text>
          <Text style={styles.infoValue}>{movie.runtime} minutes</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.infoLabel}>Vote Average:</Text>
          <Text style={styles.infoValue}>{movie.vote_average}</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#141414",
    // paddingTop: 10,
    marginTop:30
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#141414",
  },
  loadingText: {
    color: "#fff",
    fontSize: 18,
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
});

export default MovieDetailsPage;
