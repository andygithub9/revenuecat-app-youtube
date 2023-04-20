import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screens/HomeScreen";
import DemoScreen from "./screens/DemoScreen";
import Paywall from "./screens/Paywall";

// https://reactnavigation.org/docs/typescript/#type-checking-the-navigator
// 定義可以傳入的 screen
export type RootStackParamList = {
  Home: undefined;
  Paywall: undefined;
  Demo: undefined;
};

// 將定義好的 screen 類型  RootStackParamList  傳入 createNativeStackNavigator 函數的泛型中
const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          options={{ headerShown: false }}
          name="Home"
          component={HomeScreen}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="Demo"
          component={DemoScreen}
        />
        <Stack.Screen
          options={{ headerShown: false, presentation: "modal" }}
          name="Paywall"
          component={Paywall}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
