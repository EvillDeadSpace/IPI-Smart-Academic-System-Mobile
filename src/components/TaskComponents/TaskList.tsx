import { View, ScrollView } from 'react-native';
import React, { useMemo, useState } from 'react';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

import SearchBar from '../common/SearchBar';
import { useAssignmentQuery } from '../../hooks/useTaskQuery';
import { StudentAssignment } from '../../types/TaskTypes';

import TaskPills from './TaskPills';
import TaskItem from './TaskItem';

const now = new Date();

const isAktivni = (item: StudentAssignment) =>
  item.submission === null && new Date(item.dueDate) >= now;

const isPredani = (item: StudentAssignment) => item.submission !== null;

const isKasne = (item: StudentAssignment) =>
  item.submission === null && new Date(item.dueDate) < now;

const TaskList = () => {
  const { styles } = useStyles(stylesheet);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('svi');

  const email = 'amar@amar.com';
  const { assignments } = useAssignmentQuery(email);

  const counts = useMemo(
    () => ({
      svi: assignments?.length ?? 0,
      aktivni: assignments?.filter(isAktivni).length ?? 0,
      predani: assignments?.filter(isPredani).length ?? 0,
      kasne: assignments?.filter(isKasne).length ?? 0,
    }),
    [assignments],
  );

  const filtered = useMemo(() => {
    if (!assignments) return [];

    let result = assignments;

    if (activeFilter === 'aktivni') result = result.filter(isAktivni);
    else if (activeFilter === 'predani') result = result.filter(isPredani);
    else if (activeFilter === 'kasne') result = result.filter(isKasne);

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        item => item.title.toLowerCase().includes(q) || item.subject.name.toLowerCase().includes(q),
      );
    }

    return result;
  }, [assignments, activeFilter, searchQuery]);

  return (
    <View style={styles.container}>
      <SearchBar value={searchQuery} onChange={setSearchQuery} />
      <TaskPills active={activeFilter} onChange={setActiveFilter} counts={counts} />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.list}>
        {filtered.map(item => (
          <TaskItem key={item.id} item={item} />
        ))}
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
