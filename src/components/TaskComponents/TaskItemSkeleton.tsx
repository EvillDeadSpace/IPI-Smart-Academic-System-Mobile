import { View } from 'react-native';
import React from 'react';
import Skeleton from 'react-native-reanimated-skeleton';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

const TaskItemSkeleton = () => {
  const { styles, theme } = useStyles(stylesheet);

  return (
    <View style={styles.card}>
      <View style={styles.colorBar} />
      <View style={styles.content}>
        <Skeleton
          isLoading
          animationType="shiver"
          duration={1200}
          boneColor={theme.colors.border}
          highlightColor={theme.colors.surface}
          layout={[{ width: '38%', height: 11, borderRadius: theme.radius.sm }]}
        />
        <View style={styles.titleRow}>
          <Skeleton
            isLoading
            animationType="shiver"
            duration={1200}
            boneColor={theme.colors.border}
            highlightColor={theme.colors.surface}
            layout={[{ width: 120, height: 18, borderRadius: theme.radius.sm }]}
          />
          <Skeleton
            isLoading
            animationType="shiver"
            duration={1200}
            boneColor={theme.colors.border}
            highlightColor={theme.colors.surface}
            layout={[{ width: 52, height: 52, borderRadius: theme.radius.md }]}
          />
        </View>
        <Skeleton
          isLoading
          animationType="shiver"
          duration={1200}
          boneColor={theme.colors.border}
          highlightColor={theme.colors.surface}
          layout={[{ width: '100%', height: 32, borderRadius: theme.radius.sm }]}
        />
        <Skeleton
          isLoading
          animationType="shiver"
          duration={1200}
          boneColor={theme.colors.border}
          highlightColor={theme.colors.surface}
          layout={[{ width: '42%', height: 28, borderRadius: theme.radius.full }]}
        />
      </View>
    </View>
  );
};

const stylesheet = createStyleSheet(theme => ({
  card: {
    flexDirection: 'row',
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.md,
    borderWidth: 1,
    borderColor: theme.colors.border2,
    overflow: 'hidden',
    ...theme.shadow.sm,
  },
  colorBar: {
    width: 5,
    backgroundColor: theme.colors.border,
  },
  content: {
    flex: 1,
    padding: theme.spacing.md,
    gap: theme.spacing.sm,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
}));

export default TaskItemSkeleton;
