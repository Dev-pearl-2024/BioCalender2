import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import CustomDrawer from "./CustomDrawer";
import BottomTab from "./Bottomtab";

const Drawer = createDrawerNavigator();

const DrawerMenu = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        drawerPosition: "right",
        headerShown: false,
        drawerStyle: {
          width: "65%"
        }
      }}
      backBehavior="history"
      drawerContent={(props) => <CustomDrawer {...props} />}
    >
      <Drawer.Screen
        name="BottomTab"
        component={BottomTab}
        options={{ drawerItemStyle: { display: "none" } }}
      />
    </Drawer.Navigator>
  );
};

export default DrawerMenu;
