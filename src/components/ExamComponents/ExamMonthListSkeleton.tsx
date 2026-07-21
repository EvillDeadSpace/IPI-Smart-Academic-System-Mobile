import { View } from 'react-native';
import React from 'react';
import Skeleton from 'react-native-reanimated-skeleton';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

const ROWS = [1, 2, 3];

const ExamMonthListSkeleton = () => {
  const { styles, theme } = useStyles(stylesheet);

  return (
    <>
      {ROWS.map(i => (
        <View key={i}>
          {i > 1 && <View style={styles.divider} />}
          <View style={styles.row}>
            <Skeleton
              isLoading
              animationType="shiver"
              duration={1200}
              boneColor={theme.colors.border}
              highlightColor={theme.colors.surface}
              layout={[{ width: 40, height: 40, borderRadius: theme.radius.md }]}
            />
            <View style={styles.textBlock}>
              <Skeleton
                isLoading
                animationType="shiver"
                duration={1200}
                boneColor={theme.colors.border}
                highlightColor={theme.colors.surface}
                layout={[{ width: '70%', height: 13, borderRadius: theme.radius.sm }]}
              />
              <Skeleton
                isLoading
                animationType="shiver"
                duration={1200}
                boneColor={theme.colors.border}
                highlightColor={theme.colors.surface}
                layout={[{ width: '45%', height: 10, borderRadius: theme.radius.sm }]}
              />
            </View>
            <Skeleton
              isLoading
              animationType="shiver"
              duration={1200}
              boneColor={theme.colors.border}
              highlightColor={theme.colors.surface}
              layout={[{ width: 36, height: 10, borderRadius: theme.radius.sm }]}
            />
          </View>
        </View>
      ))}
    </>
  );
};

const stylesheet = createStyleSheet(theme => ({
  divider: {
    height: 1,
    backgroundColor: theme.colors.border2,
    marginHorizontal: theme.spacing.md,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: theme.spacing.md,
    gap: theme.spacing.md,
  },
  textBlock: {
    flex: 1,
    gap: 6,
  },
}));

export default ExamMonthListSkeleton;
