import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../App";

// https://reactnavigation.org/docs/typescript/#type-checking-screens
// 為了確認 screens 的類型，我們引入 NativeStackNavigationProp 並傳入泛型到這個型別中，泛型的第一個參數是我們在 App.tsx 定義的 param list，第二個是我們所在的 screen 的 route name
export type NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Home"
>;

type Props = {
  title: string;
  screen: any;
  color: string;
  requirePro?: boolean;
  icon?: any;
  vertical?: boolean;
};

const ActionRow = ({
  title,
  screen,
  color,
  requirePro,
  icon,
  vertical,
}: Props) => {
  // https://reactnavigation.org/docs/typescript/#annotating-usenavigation
  // 將我們上面定義的 NavigationProp 傳入 useNavigation 函數的泛型裡
  const navigation = useNavigation<NavigationProp>();

  return (
    // 如果要傳入動態的值到 custom component 最好用 style prop，不要用 tailwind/nativewind 可能會有些問題
    <TouchableOpacity
      onPress={() => navigation.navigate(screen)}
      className={`flex m-2 flex-1 justify-center items-center py-6 rounded-lg space-x-2 ${
        vertical ? "flex-col" : "flex-row"
      }`}
      style={{ backgroundColor: color }}
    >
      <Ionicons name={icon} size={30} color="white" />
      <Text className="text-white font-bold text-lg">{title}</Text>
    </TouchableOpacity>
  );
};

export default ActionRow;
