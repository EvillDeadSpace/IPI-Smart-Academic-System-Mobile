import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { RootStackParamList } from '@appTypes/navigation';
import { SafeAreaProvider } from 'react-native-safe-area-context';
// Screens
import HomeScreen from '@screens/HomeScreen';
import NotificationScreen from '@screens/NotificationScreen';
import TaskScreen from '@screens/TaskScreen';
import TaskDetailsScreen from '@screens/TaskDetailsScreen';

import ExamDetailsScreen from '../screens/ExamDetailsScreen';

import BottomTabNavigator from './BottomTabNavigator';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  return (
    <NavigationContainer>
      <SafeAreaProvider>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="MainTabs" component={BottomTabNavigator} />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Notifications" component={NotificationScreen} />
          <Stack.Screen name="TaskDetails" component={TaskDetailsScreen} />
          <Stack.Screen name="Tasks" component={TaskScreen} />
          <Stack.Screen name="ExamDetails" component={ExamDetailsScreen} />
        </Stack.Navigator>
      </SafeAreaProvider>
    </NavigationContainer>
  );
}
