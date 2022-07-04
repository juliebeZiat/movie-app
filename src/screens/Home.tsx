import React, { FC, useCallback, useState, useEffect } from "react";
import { View, Text, Button, FlatList, Image } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

import authService from "../services/authService";
import { logout } from "../state/reducer/auth.reducer";
import { RootState } from "../state/store";
import { Movies } from "../type/Movies";

const Welcome: FC = () => {
  const dispatch = useDispatch();
  const [data, setData] = useState<Movies[]>();

  const handleLogout = useCallback(() => {
    authService.logout();
    dispatch(logout());
  }, []);

  const token = useSelector((state: RootState) => state.auth.token);

  useEffect(() => {
    const fetchMovies = async () => {
      const response = await axios.get("movies/popular", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.data.access_token) {
        AsyncStorage.setItem("user", JSON.stringify(response.data));
      }
      setData(response.data);
    };
    fetchMovies();
  }, []);

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Button title="logout" onPress={handleLogout}></Button>
      <Text>Movies</Text>
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <View>
            <Text>{item.title}</Text>
            <Image
              style={{ width: 100, height: 100 }}
              source={{
                uri: item.poster_path,
              }}
            />
          </View>
        )}
        keyExtractor={(item) => item._id}
      />
    </View>
  );
};

export default Welcome;
