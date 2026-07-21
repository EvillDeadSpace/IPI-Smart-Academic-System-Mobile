import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useStyles, createStyleSheet } from 'react-native-unistyles';

import HeaderTask from '../components/TaskComponents/TaskHeader';
import TaskList from '../components/TaskComponents/TaskList';

const TaskScreen = () => {
  const { styles } = useStyles(stylesheet);

  return (
    <>
      <StatusBar />
      <SafeAreaView style={styles.wrapper}>
        <HeaderTask />
        <TaskList />
      </SafeAreaView>
    </>
  );
};

const stylesheet = createStyleSheet(theme => ({
  wrapper: {
    flex: 1,
    paddingHorizontal: theme.spacing.md,
    backgroundColor: theme.colors.background,
  },
}));

export default TaskScreen;
