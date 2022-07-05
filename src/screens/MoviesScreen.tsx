import React, { FC, useCallback, useState, useEffect } from "react";
import { View, Text, Button, FlatList, Image, TouchableHighlight } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import { logout } from "../state/reducer/auth.reducer";
import { RootState } from "../state/store";
import { useNavigation } from "@react-navigation/native";
import { Nav } from "../type/Nav";
import { Movie } from "../type/Movie";
import fetchAllMoviesService from "../services/fetchAllMoviesService";

const Welcome: FC = () => {
  const dispatch = useDispatch();
  const { navigate } = useNavigation<Nav>();
  const [allMoviesList, setAllMoviesList] = useState<Movie[]>();

  const handleLogout = useCallback(() => {
    dispatch(logout());
  }, []);

  const token = useSelector((state: RootState) => state.auth.token);
  
  useEffect(() => {
    const fetchAllMovies = async () => {
      const result = await fetchAllMoviesService(token);
      setAllMoviesList(result.data);
    }
    fetchAllMovies();
  }, []);

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Button title="logout" onPress={handleLogout}></Button>
      <Text>Movies</Text>
      <FlatList
        data={allMoviesList}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <TouchableHighlight onPress={() => navigate('Movie', {movieId: item._id})}>
            <View>
              <Text>{item.title}</Text>
              <Image
                style={{ width: 100, height: 100 }}
                source={{
                  uri: item.poster_path,
                }}
              />
              {item.genre_ids.map((genre) => {
                return <Text key={genre.id}>{genre.name}</Text>
              })}
            </View>
          </TouchableHighlight>
        )}
      />
    </View>
  );
};

export default Welcome;
