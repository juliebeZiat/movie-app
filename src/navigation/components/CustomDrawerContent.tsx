import { DrawerContentScrollView, DrawerItem, DrawerItemList } from "@react-navigation/drawer";
import { ComponentProps, FC } from "react";
import { Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../state/reducer/auth.reducer";
import { RootState } from "../../state/store";

const CustomDrawerContent: FC<ComponentProps<typeof DrawerItemList>> = (props) => {
  const dispatch = useDispatch();
  const isLogged = useSelector((state: RootState) => state.auth.isLoggedIn);

  const handleLogout = () => {
    dispatch(logout());
  };
  
  return (
    <DrawerContentScrollView {...props}>
      <View>
        <Text style={{ color: "white"}}>Hello</Text>
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