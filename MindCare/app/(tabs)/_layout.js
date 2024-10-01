import { Tabs } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";
import AntDesign from '@expo/vector-icons/AntDesign';
import ProtectedRoute from "/workspaces/Mindcare-Hackthon/MindCare/components/ProtectRoute.js";
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Fontisto from '@expo/vector-icons/Fontisto';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

export default function RootLayout() {
  return (
    <ProtectedRoute>
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          headerShown: false,
          title: "",
          tabBarIcon: ({ color }) => (
            <AntDesign name="QQ" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="BinauralBeats"
        options={{
          title: "",
          tabBarIcon: ({ color }) => (
            <Fontisto name="heartbeat-alt" size={24} color={color} />
          ),
        }}
      />
      
      <Tabs.Screen
        name="Diet"
        options={{
          title: "",
          tabBarIcon: ({ color }) => (
            <FontAwesome6 name="bowl-food" size={24} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="rewards"
        options={{
          headerShown: false,
          title: "Rewards",
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="coins" size={24} color={color} />
          ),
        }}
      />
    
      <Tabs.Screen
        name="Profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="user" color={color} />
          ),
        }}
      />
    </Tabs>
    </ProtectedRoute>
  );
}