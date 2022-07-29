import { FC } from "react";
import { View } from "react-native";
import { useFetchUserList } from "../services/queries";
import { padding } from "../styles";
import TextTypography from "../styles/generalStyles/text.typography";

const UserList: FC = () => {
  const { data, isLoading, isSuccess, isFetching } = useFetchUserList();
  console.log(data);
  
  return (
    <View style={{ paddingTop: 100, paddingHorizontal: padding.md }}>
      <TextTypography.Title>My list</TextTypography.Title>
    </View>
  )
}

export default UserList;