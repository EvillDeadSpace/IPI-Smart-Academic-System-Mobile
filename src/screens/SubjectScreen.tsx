import React from 'react';
import { View, ScrollView, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useStyles, createStyleSheet } from 'react-native-unistyles';

import HeaderSubject from '../components/SubjectComponents/HeaderSubject';
import StatsCard from '../components/StatsComponent/StatsCard';
import SubjectPill from '../components/SubjectComponents/SubjectPill';
import SubjectItem from '../components/SubjectComponents/SubjectItem';
import SearchBar from '../components/common/SearchBar';
import IsError from '../components/common/IsError';
import { useStatsQuery } from '../hooks/useStatsQuery';
import { useSubjectLengthQuery } from '../hooks/useSubjectLengthQuery';
import { useEnrollmentQuery } from '../hooks/useEnrollmentQuery';
import { useSubjectFilters } from '../hooks/filterHooks/useSubjectFilters';

const HARD_CODED_EMAIL = 'amar@amar.com';

const SubjectScreen = () => {
  const { styles, theme } = useStyles(stylesheet);

  const { data, isLoading } = useSubjectLengthQuery(HARD_CODED_EMAIL);
  const { data: studentStats } = useStatsQuery(HARD_CODED_EMAIL);
  const {
    enrollments,
    isLoading: isEnrollmentsLoading,
    isError,
    refetch,
  } = useEnrollmentQuery(HARD_CODED_EMAIL);

  const { filtered, counts, activeFilter, setActiveFilter, searchQuery, setSearchQuery } =
    useSubjectFilters(enrollments?.subjectEnrollments);

  // Need to implement a presence for counting.
  // Right now is hardcoded to 83% for demonstration purposes.
  const stats = [
    { value: data?.progress.totalSubjects ?? 0, title: 'PREDMETA', color: theme.colors.primary },
    { value: studentStats?.avgGrade ?? 0, title: 'PROSJEK', color: theme.colors.success },
    { value: 83, title: 'PRISUSTVO', color: theme.colors.warning },
  ];

  const renderList = () => {
    if (isEnrollmentsLoading) {
      return <ActivityIndicator color={theme.colors.primary} style={styles.loader} />;
    }
    if (isError || !enrollments) {
      return <IsError message="Nije moguće učitati predmete." onRetry={refetch} />;
    }
    return filtered.map(item => <SubjectItem key={item.id} item={item} />);
  };

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
        <SearchBar value={searchQuery} onChange={setSearchQuery} />
        <SubjectPill active={activeFilter} onChange={setActiveFilter} counts={counts} />
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.list}>
          {renderList()}
        </ScrollView>
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
  list: {
    gap: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    paddingBottom: theme.spacing.xl,
  },
  loader: {
    marginTop: theme.spacing.xl,
  },
}));

export default SubjectScreen;
