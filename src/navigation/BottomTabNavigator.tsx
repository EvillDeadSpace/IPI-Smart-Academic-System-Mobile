import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { createBottomTabNavigator, BottomTabBarButtonProps } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from '@screens/HomeScreen';
import TaskScreen from '@screens/TaskScreen';
import ExamScreen from '@screens/ExamScreen';
import ProfileScreen from '@screens/ProfileScreen';
import SubjectScreen from '@screens/SubjectScreen';

const Tab = createBottomTabNavigator();

const COLORS = {
  active: '#eef3ff',
  activeTint: '#1e4ed8',
  inactiveTint: '#64748b',
  tabBar: '#ffffffeb',
  tabBarBorder: 'rgba(15, 23, 42, 0.06)',
  shadow: '#0f172a',
} as const;

const ICONS: Record<string, string> = {
  Pocetna: 'home-outline',
  Predmeti: 'book-outline',
  Zadaci: 'document-text-outline',
  Ispiti: 'calendar-outline',
  Profil: 'person-outline',
};

const LABELS: Record<string, string> = {
  Pocetna: 'Pocetna',
  Predmeti: 'Predmeti',
  Zadaci: 'Zadaci',
  Ispiti: 'Ispiti',
  Profil: 'Profil',
};

function TabButton({ children, onPress, accessibilityState }: BottomTabBarButtonProps) {
  const focused = accessibilityState?.selected ?? false;
  return (
    <Pressable
      onPress={onPress}
      style={[styles.tabButton, focused ? styles.tabButtonActive : styles.tabButtonInactive]}
    >
      {children}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  tabButton: {
    alignItems: 'center',
    borderRadius: 16,
    flex: 1,
    flexDirection: 'column',
    gap: 2,
    justifyContent: 'flex-start',
    paddingBottom: 6,
    paddingHorizontal: 4,
    paddingTop: 7,
  },
  tabButtonActive: {
    backgroundColor: COLORS.active,
  },
  tabButtonInactive: {
    backgroundColor: undefined,
  },
});

export default function BottomTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: COLORS.activeTint,
        tabBarInactiveTintColor: COLORS.inactiveTint,
        tabBarLabel: LABELS[route.name] ?? route.name,
        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: '600',
          marginTop: 0,
        },
        tabBarButton: TabButton,
        tabBarStyle: {
          position: 'absolute',
          bottom: 20,
          marginHorizontal: 16,
          height: 65,
          backgroundColor: COLORS.tabBar,
          borderRadius: 22,
          borderWidth: 1,
          borderColor: COLORS.tabBarBorder,
          paddingVertical: 7,
          paddingHorizontal: 6,
          elevation: 10,
          shadowColor: COLORS.shadow,
          shadowOffset: { width: 0, height: 8 },
          shadowOpacity: 0.08,
          shadowRadius: 20,
        },
        tabBarIcon: ({ color, size }) => {
          const iconName = ICONS[route.name] as React.ComponentProps<typeof Ionicons>['name'];
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Pocetna" component={HomeScreen} />
      <Tab.Screen name="Predmeti" component={SubjectScreen} />
      <Tab.Screen name="Zadaci" component={TaskScreen} />
      <Tab.Screen name="Ispiti" component={ExamScreen} />
      <Tab.Screen name="Profil" component={ProfileScreen} />
    </Tab.Navigator>
  );
}
