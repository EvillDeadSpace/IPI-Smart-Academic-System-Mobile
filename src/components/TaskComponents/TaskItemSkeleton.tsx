import { View } from 'react-native';
import React from 'react';
import Skeleton from 'react-native-reanimated-skeleton';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

const TaskItemSkeleton = () => {
  const { styles, theme } = useStyles(stylesheet);
  return (
    <View style={styles.container}>
      <Skeleton
        isLoading
        animationType="shiver"
        duration={1200}
        boneColor={theme.colors.border}
        highlightColor={theme.colors.surface}
        layout={[
          { width: '65%', height: 12, borderRadius: theme.radius.sm },
          { width: '45%', height: 24, borderRadius: theme.radius.sm, marginTop: theme.spacing.md },
        ]}
      />
    </View>
  );
};
const stylesheet = createStyleSheet(theme => ({
  container: {
    flex: 1,
    borderRadius: theme.radius.md,
    padding: theme.spacing.md,
    minHeight: 90,
    backgroundColor: theme.colors.border,
    justifyContent: 'space-between',
    overflow: 'hidden',
  },
}));

export default TaskItemSkeleton;
