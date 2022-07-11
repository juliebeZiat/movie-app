import React, { FC, useState, useEffect } from "react";
import { View } from "react-native";
import { dimensions } from "../styles";
import { SafeAreaView } from "react-native-safe-area-context";

import { Endpoints } from "../type/endpoints";
import movieService from "../services/movieService";

import { FirstItemMoviesScreen } from "../components/MoviesScreen/FirstItem";
import { ListItems } from "../components/MoviesScreen/ListItems";

const Welcome: FC = () => {
  const [allMoviesList, setAllMoviesList] = useState<Endpoints.ListMovies.Response>();

  useEffect(() => {
    const fetchAllMovies = async () => {
      const result = await movieService.fetchAllMoviesService();
      setAllMoviesList(result.data);
    };
    fetchAllMovies();
  }, []);

  if (!allMoviesList) {
    return null;
  }

  return (
    <View style={{ flex: 1, alignItems: "center" }}>
      <SafeAreaView
        style={{ width: dimensions.fullWidth - 50 }}
      >
        <FirstItemMoviesScreen allMoviesList={allMoviesList} />
        <ListItems allMoviesList={allMoviesList} />
      </SafeAreaView>
    </View>
  );
};

export default Welcome;
