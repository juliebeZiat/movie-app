import { FC } from "react";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { SearchBar } from "react-native-screens";
import { LoadingIndicator } from "../../components/LoadingIndicator";
import { useSearchMovie } from "../../services/queries";

const SearchMovieScreen: FC = () => {

  const { data, isLoading, isFetching, isSuccess } = useSearchMovie("harry potter");
  console.log(data);

  if (!data) return null;
  
  if (isLoading || isFetching) return <LoadingIndicator />;

  return (
    <SafeAreaView>
      <Text style={{color: "black"}}>Hello</Text>
      {/* <SearchBar
        placeholder="Search movie..."
      /> */}
    </SafeAreaView>
  )
}

export default SearchMovieScreen;