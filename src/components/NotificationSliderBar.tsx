import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

import { Props } from '../types/news';

const NotificationSliderBar = ({ data, onFilterChange, activeTab }: Props) => {
  const { styles } = useStyles(stylesheet);

  return (
    <TouchableOpacity
      onPress={() => onFilterChange(data.title)}
      style={activeTab ? styles.tabActive : styles.tab}
    >
      <Text style={activeTab ? styles.textActive : styles.text}>{data.title}</Text>
      <View style={activeTab ? styles.badgeActive : styles.badge}>
        <Text style={activeTab ? styles.badgeTextActive : styles.badgeText}>{data.count}</Text>
      </View>
    </TouchableOpacity>
  );
};

const stylesheet = createStyleSheet(theme => ({
  tab: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.xs,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.xs + 2,
    borderRadius: theme.radius.full,
    backgroundColor: theme.colors.background,
    borderWidth: theme.borderWidth.thin,
    borderColor: theme.colors.border,
    marginRight: theme.spacing.sm,
  },
  tabActive: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.xs,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.xs + 2,
    borderRadius: theme.radius.full,
    backgroundColor: theme.colors.primary,
    borderWidth: theme.borderWidth.thin,
    borderColor: theme.colors.primary,
    marginRight: theme.spacing.sm,
  },
  text: {
    fontSize: theme.typography.caption,
    fontWeight: theme.fontWeight.regular,
    color: theme.colors.muted,
  },
  textActive: {
    fontSize: theme.typography.caption,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.surface,
  },
  badge: {
    backgroundColor: theme.colors.border,
    borderRadius: theme.radius.full,
    minWidth: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 5,
  },
  badgeActive: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.full,
    minWidth: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 5,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.muted,
  },
  badgeTextActive: {
    fontSize: 11,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.primary,
  },
}));

export default NotificationSliderBar;
