import React, { FC, useCallback, useState, useEffect } from "react";
import { View, Text, Button, FlatList, Image, TouchableHighlight, Pressable } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import { logout } from "../state/reducer/auth.reducer";
import { RootState } from "../state/store";
import { useNavigation } from "@react-navigation/native";
import { Nav } from "../type/Nav";

import { Endpoints } from "../type/endpoints";
import movieService from "../services/movieService";

const Welcome: FC = () => {
  const dispatch = useDispatch();
  const { navigate } = useNavigation<Nav>();
  const [allMoviesList, setAllMoviesList] = useState<Endpoints.ListMovies.Response>();

  const handleLogout = useCallback(() => {
    dispatch(logout());
  }, []);

  const token = useSelector((state: RootState) => state.auth.token);
  
  useEffect(() => {
    const fetchAllMovies = async () => {
      const result = await movieService.fetchAllMoviesService(token);
      setAllMoviesList(result.data);
    }
    fetchAllMovies();
  }, []);

  if (!allMoviesList) {
    return null;
  }

  return (
    <View style={{ flex: 1, width: 350, margin: 15 }}>
      <Button title="logout" onPress={handleLogout}></Button>

      <View style={{ margin: 10}}>
        <Image
          style={{ width: 320, height: 220, borderRadius: 20, overflow: "hidden", opacity: 5 }}
          source={{ uri: allMoviesList[0].poster_path }}
        />
        <View style={{ position: 'absolute', bottom: 20, left: 15, right: 15 }} >
          <Text style={{ color: 'white', fontSize: 25, fontWeight: 'bold', marginBottom: 10 }}>{(allMoviesList[0].title)}</Text>
          <View style={{ flex:1, flexDirection: 'row', flexWrap: 'wrap', marginBottom: 15 }}>
            {allMoviesList[0].genre_ids.map((genre) => {
              return <Text style={{ color: 'white', fontSize: 15 }} key={genre.id}>{genre.name.toUpperCase()}</Text>
            })}
          </View>
          <Pressable
            onPress={() => navigate('Movie', {movieId: allMoviesList[0]._id})}
            style={{ backgroundColor: '#E50909', width: 120, padding: 8, borderRadius: 18 }}
          >
            <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold', textAlign: 'center' }}>Details</Text>
          </Pressable>
        </View>
      </View>

      <Text style={{ fontSize: 30, fontWeight: 'bold', margin: 15 }}>Movies</Text>

      <FlatList
        data={allMoviesList?.slice(1, allMoviesList.length)}
        keyExtractor={(item) => item._id}
        numColumns={2}
        
        renderItem={({ item }) => (
          <TouchableHighlight onPress={() => navigate('Movie', {movieId: item._id})}>

            <View style={{ width: 150, margin: 10 }}>
              <Image
                style={{ width: 150, height: 150, borderRadius: 20, overflow: "hidden", opacity: 5 }}
                source={{ uri: item.backdrop_path }}
              />
              <View style={{ position: 'absolute', bottom: 8, left: 8, right: 8 }}>
                <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white', marginBottom: 5 }}>
                  {item.title.split(" ").slice(0, 2).join(' ')}{item.title.split(" ").length > 1 ? '...' : ''}
                </Text>
                <View style={{ flex:1, flexDirection: 'row', flexWrap: 'wrap' }}>
                  {item.genre_ids.map((genre) => {
                    return <Text style={{ color: 'white', fontSize: 12 }} key={genre.id}>{genre.name.toUpperCase()} </Text>
                  })}
                </View>
              </View>
            </View>

          </TouchableHighlight>
        )}
      />

    </View>
  );
};

export default Welcome;
