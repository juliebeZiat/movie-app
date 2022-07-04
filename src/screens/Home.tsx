import React, { FC, useCallback, useState, useEffect } from "react";
import { View, Text, Button, FlatList, Image, TouchableHighlight } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

import authService from "../services/authService";
import { logout } from "../state/reducer/auth.reducer";
import { RootState } from "../state/store";
import { Movies } from "../type/Movies";
import { useNavigation } from "@react-navigation/native";
import { Nav } from "../type/Nav";

const Welcome: FC = () => {
  const dispatch = useDispatch();
  const { navigate } = useNavigation<Nav>();
  const [allMoviesList, setAllMoviesList] = useState<Movies[]>();

  const handleLogout = useCallback(() => {
    authService.logout();
    dispatch(logout());
  }, []);

  const token = useSelector((state: RootState) => state.auth.token);

  useEffect(() => {
    const fetchAllMovies = async () => {
      const response = await axios.get("movies/popular", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.data.access_token) {
        AsyncStorage.setItem("user", JSON.stringify(response.data));
      }
      setAllMoviesList(response.data);
    };
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
