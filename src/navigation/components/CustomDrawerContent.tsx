import { DrawerContentScrollView, DrawerItem, DrawerItemList } from "@react-navigation/drawer";
import { useTheme } from "@react-navigation/native";
import { ComponentProps, FC } from "react";
import { Text, View } from "react-native";
import { EmojiHappyIcon } from "react-native-heroicons/outline";
import { useDispatch, useSelector } from "react-redux";
import { useFetchUserDetails } from "../../services/queries";
import { logout } from "../../state/reducer/auth.reducer";
import { RootState } from "../../state/store";
import { color, font, margin } from "../../styles";

const CustomDrawerContent: FC<ComponentProps<typeof DrawerItemList>> = (props) => {
  const dispatch = useDispatch();
  const isLogged = useSelector((state: RootState) => state.auth.isLoggedIn);
  const { colors } = useTheme();

  const handleLogout = () => {
    dispatch(logout());
  };

  const {data: user, isSuccess } = useFetchUserDetails();
  
  return (
    <DrawerContentScrollView {...props}>
      <View>
        {isSuccess && isLogged && (
          <View style={{ alignItems: 'center'}}>
            <EmojiHappyIcon style={{ marginBottom: margin.sm }} color={ color.green } />
            <Text style={{ color: colors.text, fontSize: font.xlg, marginBottom: margin.lg }}>
              Hello {user.name}
            </Text>
          </View>
        )}
      </View>
      <DrawerItemList {...props} />
      {isLogged && (
        <DrawerItem
          label="Logout"
          onPress={handleLogout}
        />
      )}
    </DrawerContentScrollView>
  )
}

export default CustomDrawerContent;