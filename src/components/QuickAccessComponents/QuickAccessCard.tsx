import { View, Text, Pressable } from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

import { QuickAccessItemsType } from '../../types/QuickAccessTypes';
import { useAppNavigation } from '../../hooks/useAppNavigation';

type IoniconsName = React.ComponentProps<typeof Ionicons>['name'];

type Props = {
  item: QuickAccessItemsType;
};

const colorMap: Record<string, { bg: string; icon: string }> = {
  blue: { bg: '#eef3ff', icon: '#1e4ed8' },
  green: { bg: '#dcfce7', icon: '#16a34a' },
  purple: { bg: '#f3e8ff', icon: '#7c3aed' },
  red: { bg: '#fee2e2', icon: '#dc2626' },
  yellow: { bg: '#fef3c7', icon: '#f59e0b' },
};

const QuickAccessCard = ({ item }: Props) => {
  const { styles } = useStyles(stylesheet);
  const colors = colorMap[item.color] ?? colorMap.blue;

  const navigation = useAppNavigation();

  return (
    <View style={styles.container}>
      <Pressable onPress={() => navigation.navigate('MainTabs', { screen: 'Zadaci' })}>
        <View style={[styles.iconContainer, { backgroundColor: colors.bg }]}>
          <Ionicons name={item.icon as IoniconsName} size={22} color={colors.icon} />
        </View>
        <Text style={styles.title}>{item.title}</Text>
        {item.subtitle && <Text style={styles.subtitle}>{item.subtitle}</Text>}
      </Pressable>
    </View>
  );
};

const stylesheet = createStyleSheet(theme => ({
  container: {
    width: '48.5%',
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.md,
    padding: theme.spacing.md,
    gap: theme.spacing.sm,
    ...theme.shadow.sm,
  },
  iconContainer: {
    width: 44,
    height: 48,
    borderRadius: theme.radius.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: theme.typography.body,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.text,
    marginTop: 8,
  },
  subtitle: {
    fontSize: theme.typography.caption,
    color: theme.colors.muted,
  },
}));

export default QuickAccessCard;
