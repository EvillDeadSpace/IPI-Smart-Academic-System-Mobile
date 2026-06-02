import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useStyles, createStyleSheet } from 'react-native-unistyles';

import { getGreeting } from '../../utils/HeaderUtils/TaskUtils/TaskUtilsFunctions';
import { useTaskQuery } from '../../hooks/useTaskQuery';
import IsError from '../common/IsError';
import IsLoading from '../common/IsLoading';

import TaskCard from './TaskCard';

const HeaderTask = () => {
  const { styles } = useStyles(stylesheet);

  const email = 'amar@amar.com';

  const { isError, isLoading, tasks, refetch } = useTaskQuery(email);

  const username = 'Amar';

  const greeting = getGreeting();

  return (
    <View>
      <View style={styles.headerRow}>
        <View style={styles.textContainer}>
          <Text style={styles.subtitle}>Zadaci & domaće</Text>
          <Text style={styles.title}>
            {greeting}, {username}
          </Text>
        </View>
        <TouchableOpacity style={styles.filterButton}>
          <Ionicons name="options-outline" size={20} color="#0f172a" />
        </TouchableOpacity>
      </View>
      <View style={styles.statsRow}>
        {isLoading ? (
          <>
            <IsLoading />
            <IsLoading />
            <IsLoading />
          </>
        ) : isError || !tasks ? (
          <IsError message="Nije moguće učitati zadatke." onRetry={refetch} />
        ) : (
          tasks.map(item => <TaskCard key={item.label} item={item} />)
        )}
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
  textContainer: {
    flex: 1,
  },
  subtitle: {
    fontSize: theme.typography.caption,
    color: theme.colors.muted,
    marginBottom: 2,
  },
  title: {
    fontSize: theme.typography.h2,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.text,
  },
  filterButton: {
    width: 40,
    height: 40,
    borderRadius: theme.radius.sm,
    borderWidth: theme.borderWidth.thin,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    ...theme.shadow.sm,
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'stretch',
    gap: theme.spacing.sm,
    marginBottom: theme.spacing.md,
  },
}));
export default HeaderTask;
