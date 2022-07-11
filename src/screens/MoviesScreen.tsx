import React, { FC } from "react";
import { View } from "react-native";
import { dimensions } from "../styles";
import { SafeAreaView } from "react-native-safe-area-context";

import movieService from "../services/movieService";

import { FirstItemMoviesScreen } from "../components/MoviesScreen/FirstItem";
import { ListItems } from "../components/MoviesScreen/ListItems";
import { useQuery } from "react-query";

const Welcome: FC = () => {

  const result = async() => await movieService.fetchAllMoviesService();
  const query = useQuery(['movies'], result);
  const allMoviesList = query.data?.data;

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
