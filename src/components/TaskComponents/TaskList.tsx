import { View, ScrollView } from 'react-native';
import React from 'react';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

import SearchBar from '../common/SearchBar';
import { useAssignmentQuery } from '../../hooks/useTaskQuery';
import IsError from '../common/IsError';
import { useTaskFilters } from '../../hooks/useTaskFilters';
import { useAppNavigation } from '../../hooks/useAppNavigation';

import TaskPills from './TaskPills';
import TaskItem from './TaskItem';
import TaskItemSkeleton from './TaskItemSkeleton';

const HARDCODED_EMAIL = 'amar@amar.com';

const TaskList = () => {
  const navigation = useAppNavigation();
  const { styles } = useStyles(stylesheet);
  const { assignments, isError, refetch, isLoading } = useAssignmentQuery(HARDCODED_EMAIL);
  const { filtered, counts, activeFilter, setActiveFilter, searchQuery, setSearchQuery } =
    useTaskFilters(assignments);

  // Render content for Card Task list
  const renderContent = () => {
    if (isLoading) {
      return Array.from({ length: 3 }, (_, i) => <TaskItemSkeleton key={i} />);
    }
    if (isError || !assignments) {
      return <IsError message="Nije moguće učitati zadatke." onRetry={refetch} />;
    }
    return filtered.map(item => (
      <TaskItem
        onPress={() =>
          navigation.navigate('TaskDetails', {
            id: item.id,
            title: item.title,
            subject: item.subject,
            dueDate: item.dueDate,
            maxPoints: item.maxPoints,
            difficulty: item.difficulty,
            professorName: item.professorName,
            professorS3Path: item.professorS3Path,
          })
        }
        key={item.id}
        item={item}
      />
    ));
  };

  return (
    <View style={styles.container}>
      <SearchBar value={searchQuery} onChange={setSearchQuery} />
      <TaskPills active={activeFilter} onChange={setActiveFilter} counts={counts} />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.list}>
        {renderContent()}
      </ScrollView>
    </View>
  );
};

const stylesheet = createStyleSheet(theme => ({
  container: {
    flex: 1,
  },
  list: {
    gap: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
  },
}));

export default TaskList;
