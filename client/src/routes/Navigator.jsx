import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CameraScreen from "../screens/CameraScreen";
import SignInScreen from "../screens/SignInScreen";
import { navigatorRef } from "../RootNavigation";

const Stack = createNativeStackNavigator();

export function MyStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={SignInScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
