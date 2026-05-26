import { View, Text } from 'react-native';
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import BackButton from '../components/BackButton';
import TaskCountdownTimer from '../components/TaskDetailsComponent/TaskCountdownTimer';
import TaskDetailsCard from '../components/TaskDetailsComponent/TaskDetailsCard';
import { RootStackParamList } from '../types/navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'TaskDetails'>;

export default function TaskDetailsScreen({ route }: Props) {
  const { styles } = useStyles(stylesheet);

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <BackButton />
          <View style={styles.titleGroup}>
            <Text style={styles.title}>{route.params.subject.name}</Text>
            <Text style={styles.subtitle}>Detalji zadatka</Text>
          </View>
        </View>
        <View style={styles.content}>
          <TaskCountdownTimer dueDate={route.params.dueDate} />
          <TaskDetailsCard
            title={route.params.title}
            professorName={route.params.professorName}
            maxPoints={route.params.maxPoints}
            difficulty={route.params.difficulty}
            subjectName={route.params.subject.name}
          />
        </View>
      </SafeAreaView>
    </View>
  );
}

const stylesheet = createStyleSheet(theme => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
  },
  content: {
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.md,
  },
  detailsCard: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.lg,
    padding: theme.spacing.md,
    marginTop: theme.spacing.md,
    ...theme.shadow.sm,
  },
  titleGroup: {
    flex: 1,
    paddingHorizontal: theme.spacing.md,
  },
  title: {
    fontSize: theme.typography.h3,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.primary,
  },
  subtitle: {
    fontSize: theme.typography.caption,
    color: theme.colors.muted,
    fontWeight: theme.fontWeight.regular,
  },
}));
