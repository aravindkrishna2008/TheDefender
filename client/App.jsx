import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SignInScreen from "./src/screens/SignInScreen";
import SignUpScreen from "./src/screens/SignUpscreen";
import CameraScreen from "./src/ml_screen/LoadModel";
import { Provider as AuthProvider } from "./src/context/AuthContext.jsx";
import { navigationRef } from "./src/RootNavigation";
import Result from "./src/ml_screen/Result";

const Stack = createNativeStackNavigator();

function App() {
  return (
    <AuthProvider>
      <NavigationContainer ref={navigationRef}>
        <Stack.Navigator>
          {/* <Stack.Screen
            name="Sign In"
            component={SignInScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Sign Up"
            component={SignUpScreen}
            options={{ headerShown: false }}
          /> */}
          <Stack.Screen
            name="Camera"
            component={CameraScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Result"
            component={Result}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
}

export default App;
