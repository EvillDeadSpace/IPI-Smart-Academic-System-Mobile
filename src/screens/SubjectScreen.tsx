import React from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useStyles, createStyleSheet } from 'react-native-unistyles';

import HeaderSubject from '../components/SubjectComponents/HeaderSubject';
import StatsCard from '../components/StatsComponent/StatsCard';
import { useStatsQuery } from '../hooks/useStatsQuery';
import { useSubjectLengthQuery } from '../hooks/useSubjectLengthQuery';

const HARD_CODED_EMAIL = 'amar@amar.com';

const SubjectScreen = () => {
  const { styles, theme } = useStyles(stylesheet);

  const { data, isLoading } = useSubjectLengthQuery(HARD_CODED_EMAIL);
  const { data: studentStats } = useStatsQuery(HARD_CODED_EMAIL);

  // Need to implement a presence for counting.
  // Right now is hardcoded to 83% for demonstration purposes.
  const stats = [
    { value: data?.progress.totalSubjects ?? 0, title: 'PREDMETA', color: theme.colors.primary },
    { value: studentStats?.avgGrade ?? 0, title: 'PROSJEK', color: theme.colors.success },
    { value: 83, title: 'PRISUSTVO', color: theme.colors.warning },
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
