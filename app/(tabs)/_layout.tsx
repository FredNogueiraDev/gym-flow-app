import { Tabs } from 'expo-router';
import { Dumbbell, Home, Utensils } from 'lucide-react-native';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#0c1018', 
          borderTopColor: '#1f2937', 
          height: 80,
          paddingBottom: 10,
          paddingTop: 8,
        },
        tabBarActiveTintColor: '#10b981', 
        tabBarInactiveTintColor: '#4b5563',
      }}
    >
      <Tabs.Screen
        name="index" 
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <Home size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="dieta" 
        options={{
          title: 'Dieta',
          tabBarIcon: ({ color }) => <Utensils size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="treino" 
        options={{
          title: 'Treino',
          tabBarIcon: ({ color }) => <Dumbbell size={24} color={color} />,
        }}
      />

    </Tabs>
  );
}