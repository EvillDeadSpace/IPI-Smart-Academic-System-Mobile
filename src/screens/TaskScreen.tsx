import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useStyles, createStyleSheet } from 'react-native-unistyles';

import HeaderTask from '../components/TaskComponents/TaskHeader';
import TaskList from '../components/TaskComponents/TaskList';

const TaskScreen = () => {
  const { styles } = useStyles(stylesheet);

  return (
    <SafeAreaView style={styles.wrapper}>
      <HeaderTask />
      <TaskList />
    </SafeAreaView>
  );
};

const stylesheet = createStyleSheet(theme => ({
  wrapper: {
    flex: 1,
    paddingHorizontal: theme.spacing.md,
    paddingTop: theme.spacing.md,
  },
}));

export default TaskScreen;
