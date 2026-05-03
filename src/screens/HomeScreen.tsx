import React from 'react';
import { View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

import Header from '../components/Header';

const HomeScreen: React.FC = () => {
  const { styles } = useStyles(stylesheet);

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <SafeAreaView>
        <Header />
      </SafeAreaView>
    </View>
  );
};

const stylesheet = createStyleSheet(theme => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.surface,
  },
}));

export default HomeScreen;
