import React from 'react';
import { View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

import Header from '../components/Header';
import QuickAccess from '../components/QuickAccessComponents/QuickAccess';

const HomeScreen: React.FC = () => {
  const { styles } = useStyles(stylesheet);

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <SafeAreaView style={styles.wrapper}>
        <Header />
        <QuickAccess />
      </SafeAreaView>
    </View>
  );
};

const stylesheet = createStyleSheet(theme => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.surface,
  },
  wrapper: {
    paddingHorizontal: theme.spacing.md,
  },
}));

export default HomeScreen;
