import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import React, { FC, useEffect, useState } from "react";
import { Image, Text, View } from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "../state/store";
import { Movie } from "../type/Movie";

const MovieDetail: FC = ({ route }) => {
  const [movie, setMovie] = useState<Movie>();
  const { movieId } = route.params;
  const token = useSelector((state: RootState) => state.auth.token);

  useEffect(() => {
    const fetchMovie = async (movieId: string) => {
      const response = await axios.get(`movies/${movieId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.data.access_token) {
        AsyncStorage.setItem("user", JSON.stringify(response.data));
      }
      setMovie(response.data);
    };
    fetchMovie(movieId);
  }, []);

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Image
        style={{ width: 500, height: 500 }}
        source={{
          uri: movie?.poster_path,
        }}
      />
      <Text>{movie?.title}</Text>
      <Text>{movie?.release_date}</Text>
      <View>
        {movie?.genre_ids.map((genre) => {
          return <Text key={genre.id}>{genre.name}</Text>
        })}
      </View>
      <Text>{movie?.vote_average}</Text>
      <Text>{movie?.overview}</Text>
    </View>
  );
};

export default MovieDetail;