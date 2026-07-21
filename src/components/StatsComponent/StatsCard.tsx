import { Text, View } from 'react-native';
import React from 'react';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

import { StatsCardProps } from '../../types/stats.props';

export default function StatsCard({ value, title, color, isLoading }: StatsCardProps) {
  const { styles } = useStyles(stylesheet);

  if (isLoading) {
    return (
      <View style={styles.card}>
        <View style={styles.skeletonValue} />
        <View style={styles.skeletonLabel} />
      </View>
    );
  }

  return (
    <View style={styles.card}>
      <Text style={[styles.value, { color }]}>{value}</Text>
      <Text style={styles.label}>{title}</Text>
    </View>
  );
}
const stylesheet = createStyleSheet(theme => ({
  card: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.sm,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.sm,
    borderWidth: theme.borderWidth.thin,
    borderColor: theme.colors.border,
    ...theme.shadow.sm,
  },
  value: {
    fontSize: theme.typography.h2,
    fontWeight: theme.fontWeight.bold,
    textAlign: 'center',
  },
  label: {
    fontSize: theme.typography.caption,
    color: theme.colors.muted,
    textAlign: 'center',
    marginTop: 2,
    letterSpacing: 0.5,
  },
  skeletonValue: {
    width: 44,
    height: 26,
    borderRadius: theme.radius.sm,
    backgroundColor: theme.colors.border,
    marginBottom: 6,
  },
  skeletonLabel: {
    width: 56,
    height: 12,
    borderRadius: theme.radius.sm,
    backgroundColor: theme.colors.border,
  },
}));
