import { Tabs } from 'expo-router';
import { Text } from 'react-native';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          const emojis: Record<string, string> = {
            home: focused ? '🏠' : '⌂',
            study: focused ? '📚' : '📖',
            practice: focused ? '📝' : '📋',
            progress: focused ? '📊' : '📈',
          };

          return <Text style={{ fontSize: size, color }}>{emojis[route.name] ?? '•'}</Text>;
        },
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
      })}
    >
      <Tabs.Screen name="home" options={{ title: 'Home' }} />
      <Tabs.Screen name="study" options={{ title: 'Study' }} />
      <Tabs.Screen name="practice" options={{ title: 'Practice' }} />
      <Tabs.Screen name="progress" options={{ title: 'Progress' }} />
    </Tabs>
  );
}
