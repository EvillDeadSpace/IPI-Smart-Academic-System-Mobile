import React from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useStyles, createStyleSheet } from 'react-native-unistyles';

import HeaderSubject from '../components/SubjectComponents/HeaderSubject';
import StatsCard from '../components/StatsComponent/StatsCard';
import { useSubjectLengthQuery } from '../hooks/useSubjectLengthQuery';
import { useTaskQuery } from '../hooks/useTaskQuery';

const HARD_CODED_EMAIL = 'amar@amar.com';

const SubjectScreen = () => {
  const { styles, theme } = useStyles(stylesheet);

  const { data, isLoading } = useSubjectLengthQuery(HARD_CODED_EMAIL);
  const { tasks } = useTaskQuery(HARD_CODED_EMAIL);

  const avgGrade = tasks?.find(task => task.label === 'PROSJEK')?.value ?? 0;

  const stats = [
    { value: data?.progress.totalSubjects ?? 0, title: 'PREDMETA', color: theme.colors.primary },
    { value: avgGrade, title: 'PROSJEK', color: theme.colors.success },
    { value: data?.progress.passedSubjects ?? 0, title: 'POLOŽENO', color: theme.colors.warning },
  ];

  return (
    <>
      <StatusBar />
      <SafeAreaView style={styles.wrapper}>
        <HeaderSubject />
        <View style={styles.statsRow}>
          {stats.map(stat => (
            <StatsCard
              key={stat.title}
              value={stat.value}
              title={stat.title}
              color={stat.color}
              isLoading={isLoading}
            />
          ))}
        </View>
      </SafeAreaView>
    </>
  );
};

const stylesheet = createStyleSheet(theme => ({
  wrapper: {
    flex: 1,
    paddingHorizontal: theme.spacing.md,
    backgroundColor: theme.colors.background,
  },
  statsRow: {
    flexDirection: 'row',
    marginTop: theme.spacing.md,
    gap: theme.spacing.md,
  },
}));

export default SubjectScreen;
