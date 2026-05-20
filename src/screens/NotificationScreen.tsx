import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { FlatList, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

import { horizontalItems } from '../constants/const';
import HorizontalItemBar from '../components/NotificationSliderBar';
import BackButton from '../components/BackButton';

const NotificationScreen = () => {
  const { styles } = useStyles(stylesheet);
  const [activeFilter, setActiveFilter] = useState('Sve');

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <BackButton />
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
