import { globalColors } from "@/constants/global";
import { Stack, Tabs } from "expo-router";
import { History, Home, User } from "lucide-react-native";

export default function PagesLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: globalColors.title2,
      }}
    >
      <Tabs.Screen
        name="homepage"
        options={{
          title: "Accueil",
          tabBarIcon: ({ color, size }) => <Home color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="historique"
        options={{
          title: "Historique",
          tabBarIcon: ({ color, size }) => <History color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, size }) => <User color={color} size={size} />,
        }}
      />

    </Tabs>
  );
}
