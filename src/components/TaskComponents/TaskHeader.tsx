import { View, Text } from 'react-native';
import React from 'react';
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
      <Text>Domaci zadaci</Text>
      <Text style={styles.welcomeText}>
        {greeting}, {username}!
      </Text>
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
  welcomeText: {
    fontSize: theme.typography.h1,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.text,
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'stretch',
    gap: theme.spacing.sm,
    marginTop: theme.spacing.md,
  },
  secundText: {
    fontSize: theme.typography.caption,
    color: theme.colors.muted,
  },
}));
export default HeaderTask;
