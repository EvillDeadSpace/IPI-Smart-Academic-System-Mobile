import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import { RootStackParamList } from '@appTypes/navigation';

import { horizontalItems } from '../constants/const';
import HorizontalItemBar from '../components/NotificationSliderBar';

type Props = NativeStackScreenProps<RootStackParamList, 'Notifications'>;

const NotificationScreen = ({ navigation }: Props) => {
  const { styles } = useStyles(stylesheet);
  const [activeFilter, setActiveFilter] = useState('Sve');

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Ionicons name="chevron-back" size={20} color="#0f172a" />
          </TouchableOpacity>
          <View style={styles.titleGroup}>
            <Text style={styles.title}>Notifikacije</Text>
            <Text style={styles.subtitle}>3 nepročitanih</Text>
          </View>
        </View>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={horizontalItems}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.filterList}
          renderItem={({ item }) => (
            <HorizontalItemBar
              data={item}
              activeTab={activeFilter === item.title}
              onFilterChange={setActiveFilter}
            />
          )}
        />
      </SafeAreaView>
    </View>
  );
};

const stylesheet = createStyleSheet(theme => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.surface,
  },
  safeArea: {
    backgroundColor: theme.colors.surface,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    borderBottomWidth: 4,
    borderBottomColor: theme.colors.border,
  },
  backButton: {
    width: theme.backButton.width,
    height: theme.backButton.height,
    borderRadius: theme.radius.sm,
    borderWidth: theme.borderWidth.thin,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    ...theme.shadow.sm,
  },
  titleGroup: {
    flex: 1,
    paddingHorizontal: theme.spacing.md,
  },
  title: {
    fontSize: theme.typography.h3,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.text,
  },
  subtitle: {
    fontSize: theme.typography.caption,
    color: theme.colors.muted,
    fontWeight: theme.fontWeight.regular,
  },
  filterList: {
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
  },
}));

export default NotificationScreen;
