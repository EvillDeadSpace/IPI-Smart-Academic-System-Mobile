import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useStyles, createStyleSheet } from 'react-native-unistyles';

import HeaderTask from '../components/TaskComponents/HeaderTask';

const TaskScreen = () => {
  const { styles } = useStyles(stylesheet);

  return (
    <SafeAreaView style={styles.wrapper}>
      <HeaderTask />
    </SafeAreaView>
  );
};

const stylesheet = createStyleSheet(theme => ({
  wrapper: {
    paddingHorizontal: theme.spacing.md,
    paddingTop: theme.spacing.md,
  },
}));

export default TaskScreen;
