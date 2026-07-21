import { View } from 'react-native';
import React from 'react';
import Skeleton from 'react-native-reanimated-skeleton';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

const HeaderSubjectSkeleton = () => {
  const { styles, theme } = useStyles(stylesheet);

  return (
    <View>
      <View style={styles.headerRow}>
        <Skeleton
          isLoading
          animationType="shiver"
          duration={1200}
          boneColor={theme.colors.border}
          highlightColor={theme.colors.surface}
          layout={[
            { key: 'subtitle', width: '55%', height: 12, borderRadius: theme.radius.sm },
            { key: 'title', width: '45%', height: 22, borderRadius: theme.radius.sm, marginTop: 6 },
          ]}
        />
      </View>

      <View style={styles.progressSection}>
        <View style={styles.progressRow}>
          <Skeleton
            isLoading
            animationType="shiver"
            duration={1200}
            boneColor={theme.colors.border}
            highlightColor={theme.colors.surface}
            layout={[{ width: 120, height: 14, borderRadius: theme.radius.sm }]}
          />
          <Skeleton
            isLoading
            animationType="shiver"
            duration={1200}
            boneColor={theme.colors.border}
            highlightColor={theme.colors.surface}
            layout={[{ width: 40, height: 14, borderRadius: theme.radius.sm }]}
          />
        </View>

        <Skeleton
          isLoading
          animationType="shiver"
          duration={1200}
          boneColor={theme.colors.border}
          highlightColor={theme.colors.surface}
          layout={[{ width: '100%', height: 8, borderRadius: theme.radius.full }]}
        />
      </View>
    </View>
  );
};

const stylesheet = createStyleSheet(theme => ({
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: theme.spacing.md,
  },
  progressSection: {
    backgroundColor: theme.colors.background,
    borderRadius: theme.radius.md,
    borderColor: theme.colors.border,
    borderWidth: 1,
    padding: theme.spacing.md,
    ...theme.shadow.sm,
  },
  progressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: theme.spacing.sm,
  },
}));

export default HeaderSubjectSkeleton;
