import { View, Text } from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

import { TaskCardTypes } from '../../types/TaskTypes';

type IoniconsName = React.ComponentProps<typeof Ionicons>['name'];

type Props = {
  item: TaskCardTypes;
};

const colorMap: Record<string, { bg: string; icon: string; border: string }> = {
  blue: { bg: '#dbe5ff', icon: '#1e4ed8', border: '#dbe5ff' },
  green: { bg: '#dcfce7', icon: '#15803d', border: '#bbf7d0' },
  yellow: { bg: '#fde68a', icon: '#b45309', border: '#fde68a' },
};

const TaskCard = ({ item }: Props) => {
  const { styles } = useStyles(stylesheet);
  const colors = colorMap[item.color] ?? colorMap.blue;

  return (
    <View style={[styles.container, { backgroundColor: colors.bg, borderColor: colors.border }]}>
      <View style={styles.header}>
        <Text style={styles.label}>{item.label}</Text>
        <Ionicons name={item.icon as IoniconsName} size={16} color={colors.icon} />
      </View>
      <Text style={styles.value}>{item.value}</Text>
    </View>
  );
};

const stylesheet = createStyleSheet(theme => ({
  container: {
    flex: 1,
    borderRadius: theme.radius.md,
    padding: theme.spacing.md,
    justifyContent: 'space-between',
    minHeight: 80,
    borderWidth: 2,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  label: {
    fontSize: 11,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.text,
    flexShrink: 1,
    flexWrap: 'wrap',
    flex: 1,
  },
  value: {
    fontSize: theme.typography.h2,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.text,
  },
}));

export default TaskCard;
