import React, { FC, useEffect, useState } from "react";
import { Image, Text, View } from "react-native";
import { useSelector } from "react-redux";

import { RootState } from "../state/store";
import { Endpoints } from "../type/endpoints";

import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/Navigation";
import movieService from "../services/movieService";

type Props = NativeStackScreenProps<RootStackParamList, 'Movie'>;

const MovieDetail: FC<Props> = ({ route } : Props) => {

  const [movie, setMovie] = useState<Endpoints.GetMovie.Response>();
  const { movieId } = route.params;

  const token = useSelector((state: RootState) => state.auth.token);

  useEffect(() => {
    const fetchMovie = async (movieId: string) => {
      const result = await movieService.fetchMovieService(movieId, token);
      setMovie(result.data);
    }
    fetchMovie(movieId);
  }, []);

  if (!movie) {
    return null;
  };
  
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Image
        style={{ width: 500, height: 500 }}
        source={{
          uri: movie?.poster_path,
        }}
      />
      <Text>{movie.title}</Text>
      <Text>{movie.release_date}</Text>
      <View>
        {movie.genre_ids.map((genre) => {
          return <Text key={genre.id}>{genre.name}</Text>
        })}
      </View>
      <Text>{movie.vote_average}</Text>
      <Text>{movie.overview}</Text>
    </View>
  );
};

export default MovieDetail;