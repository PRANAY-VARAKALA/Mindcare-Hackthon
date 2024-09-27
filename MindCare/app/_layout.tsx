import { Tabs } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import AntDesign from '@expo/vector-icons/AntDesign';
export default function RootLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          headerShown: false,

          title: "Home",
          tabBarIcon: ({ color }) => (
            <AntDesign name="forward" size={24} color={color} />
          ),
        }}
      />
      {/* profile */}

      <Tabs.Screen
        name="Profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="user" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="Settings"
        options={{
          title: "Settings",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="cog" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="AIDog"
        options={{
          title: "AI Dog",
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="dog" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}