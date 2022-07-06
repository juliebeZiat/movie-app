import React, { FC, useEffect, useState } from "react";
import { Image, Text, View } from "react-native";
import { useSelector } from "react-redux";

import { RootState } from "../state/store";
import { Endpoints } from "../type/endpoints";

import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/Navigation";
import movieService from "../services/movieService";

type Props = NativeStackScreenProps<RootStackParamList, "Movie">;

const MovieDetail: FC<Props> = ({ route }: Props) => {
  const [movie, setMovie] = useState<Endpoints.GetMovie.Response>();
  const { movieId } = route.params;

  const token = useSelector((state: RootState) => state.auth.token);

  useEffect(() => {
    const fetchMovie = async (movieId: string) => {
      const result = await movieService.fetchMovieService(movieId, token);
      setMovie(result.data);
    };
    fetchMovie(movieId);
  }, []);

  if (!movie) {
    return null;
  }

  return (
    <View style={{ flex: 1, marginTop: 100 }}>
        <View style={{ alignItems: 'center', margin: 20 }}>
          <Image
            style={{ width: 200, height: 350, borderRadius: 20 }}
            source={{
              uri: movie.poster_path,
            }}
          />
        </View>
        <View style={{ margin: 15 }}>
          <Text style={{ fontSize: 30, fontWeight: 'bold' }}>{movie.title}</Text>
          <View style={{ flex:1, flexDirection: 'row', flexWrap: 'wrap', marginVertical: 10 }}>
            <Text>{new Date(movie.release_date).getFullYear()} - </Text>
              {movie.genre_ids.map((genre) => {
                return <Text key={genre.id}>{genre.name.toUpperCase()} </Text>;
              })}
          </View>
          <Text style={{ marginVertical: 10 }}>{movie.vote_average}</Text>
          <Text style={{ fontSize: 18 }}>{movie.overview}</Text>
        </View>
    </View>
  );
};

export default MovieDetail;