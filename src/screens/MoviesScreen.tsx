import React, { FC, useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image
} from "react-native";

import { useNavigation } from "@react-navigation/native";
import { Nav } from "../type/Nav";

import { Endpoints } from "../type/endpoints";
import movieService from "../services/movieService";
import TextTypography from "../styles/generalStyles/text.typography";
import { ButtonTypography } from "../styles/generalStyles/buttons.style";
import { color, dimensions, font, margin, radius } from "../styles";
import { ScrollView } from "react-native-gesture-handler";

const Welcome: FC = () => {
  const { navigate } = useNavigation<Nav>();
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
      <ScrollView
        style={{ width: dimensions.fullWidth - 50 }}
        showsVerticalScrollIndicator={false}
      >
        {/* // First element */}
        <TouchableOpacity onPress={() => navigate("Movie", { movieId: allMoviesList[0]._id })}>
          <Image
            style={{
              height: 220,
              borderRadius: radius.xlg,
              overflow: "hidden",
            }}
            source={{ uri: allMoviesList[0].poster_path }}
          />
          <View
            style={{ position: "absolute", bottom: 20, left: 15, right: 15 }}
          >
            <TextTypography.Subtitle
              style={{ color: color.light, marginBottom: margin.tiny }}
            >
              {allMoviesList[0].title}
            </TextTypography.Subtitle>
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                flexWrap: "wrap",
                marginBottom: margin.sm,
              }}
            >
              {allMoviesList[0].genre_ids.map((genre) => {
                return (
                  <TextTypography.Caption
                    style={{ color: color.light, fontSize: font.sm }}
                    key={genre.id}
                  >
                    {genre.name.toUpperCase() + " "}
                  </TextTypography.Caption>
                );
              })}
            </View>
            <ButtonTypography.Small
              onPress={() =>
                navigate("Movie", { movieId: allMoviesList[0]._id })
              }
              style={{ backgroundColor: "#E50909" }}
            >
              <Text>Details</Text>
            </ButtonTypography.Small>
          </View>
        </TouchableOpacity>

        {/* List */}
        <TextTypography.Subtitle style={{ marginVertical: margin.sm }}>Movies</TextTypography.Subtitle>

        <FlatList
          data={allMoviesList?.slice(1, allMoviesList.length)}
          keyExtractor={(item) => item._id}
          numColumns={2}
          columnWrapperStyle={{ flex: 1, justifyContent: "space-between" }}
          style={{ height: 500 }}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => navigate("Movie", { movieId: item._id })}
            >
              <View style={{marginBottom: margin.lg}}>
                <Image
                  style={{
                    width: 160,
                    height: 160,
                    borderRadius: radius.xlg,
                    overflow: "hidden",
                  }}
                  source={{ uri: item.backdrop_path }}
                />
                <View
                  style={{
                    position: "absolute",
                    bottom: 8,
                    left: 8,
                    right: 8,
                  }}
                >
                  <Text
                    style={{
                      fontSize: font.md,
                      fontWeight: "bold",
                      color: color.light,
                      marginBottom: margin.xtiny,
                    }}
                  >
                    {item.title.split(" ").slice(0, 2).join(" ")}
                    {item.title.split(" ").length > 1 ? "..." : ""}
                  </Text>
                  <View
                    style={{
                      flex: 1,
                      flexDirection: "row",
                      flexWrap: "wrap",
                    }}
                  >
                    {item.genre_ids.map((genre) => {
                      return (
                        <TextTypography.Caption
                          style={{ color: color.light }}
                          key={genre.id}
                        >
                          {genre.name.toUpperCase() + " "}
                        </TextTypography.Caption>
                      );
                    })}
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
      </ScrollView>
    </View>
  );
};

export default Welcome;
