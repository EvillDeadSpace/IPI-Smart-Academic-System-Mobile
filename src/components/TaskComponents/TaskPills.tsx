import { View, Text, ScrollView, Pressable } from 'react-native';
import React from 'react';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

import { TaskPillsProps } from '../../types/TaskTypes';
import { filterPills } from '../../constants/const';

const TaskPills = ({ active, onChange, counts }: TaskPillsProps) => {
  const { styles } = useStyles(stylesheet);

  return (
    <View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {filterPills.map(pill => (
          <Pressable
            key={pill.id}
            onPress={() => onChange(pill.id)}
            style={[styles.pill, pill.id === active && styles.pillActive]}
          >
            <Text style={[styles.label, pill.id === active && styles.labelActive]}>
              {pill.label} {counts[pill.id] ?? 0}
            </Text>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
};

const stylesheet = createStyleSheet(theme => ({
  scrollContent: {
    gap: theme.spacing.sm,
    paddingVertical: theme.spacing.sm,
  },
  pill: {
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
    borderRadius: theme.radius.full,
    backgroundColor: theme.colors.background,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  pillActive: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary,
  },
  label: {
    fontSize: theme.typography.caption,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.muted,
  },
  labelActive: {
    color: theme.colors.surface,
  },
}));

export default TaskPills;
