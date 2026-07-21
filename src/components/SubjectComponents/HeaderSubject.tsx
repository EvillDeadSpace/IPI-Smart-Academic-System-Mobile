import { View, Text } from 'react-native';
import React from 'react';
import { useStyles, createStyleSheet } from 'react-native-unistyles';

import { useSemesterQuery } from '../../hooks/queryHooks/useSemesterQuery';
import { getSemesterProgress } from '../../utils/HeaderUtils/semesterProgress';

import HeaderSubjectSkeleton from './HeaderSubjectSkeleton';

const HeaderSubject = () => {
  const { styles } = useStyles(stylesheet);

  const { data, isLoading } = useSemesterQuery();

  if (isLoading) {
    return <HeaderSubjectSkeleton />;
  }

  const progress = data ? getSemesterProgress(data) : null;

  return (
    <View>
      <View style={styles.headerRow}>
        <View style={styles.textContainer}>
          <Text style={styles.subtitle}>{data?.name ?? 'Nema aktivnog semestra'}</Text>
          <Text style={styles.title}>Moji predmeti</Text>
        </View>
      </View>

      {progress && (
        <View style={styles.progressSection}>
          <View style={styles.progressRow}>
            <Text style={styles.weekText}>
              Sedmica <Text style={styles.weekNumber}>{progress.currentWeek}</Text> od{' '}
              {progress.totalWeeks}
            </Text>
            <Text style={styles.percentText}>{progress.percent}%</Text>
          </View>

          <View style={styles.track}>
            <View style={[styles.fill, { width: `${progress.percent}%` }]} />
          </View>
        </View>
      )}
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
  progressSection: {
    backgroundColor: theme.colors.background,
    borderRadius: theme.radius.md,
    borderColor: theme.colors.border,
    borderWidth: 1,
    padding: theme.spacing.md,
    ...theme.shadow.sm,
  },
  progressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: theme.spacing.sm,
  },
  weekText: {
    fontSize: theme.typography.body,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.text,
  },
  weekNumber: {
    color: theme.colors.primary,
  },
  percentText: {
    fontSize: theme.typography.body,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.text,
  },
  track: {
    height: 8,
    width: '100%',
    backgroundColor: theme.colors.border,
    borderRadius: theme.radius.full,
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    backgroundColor: theme.colors.primary,
    borderRadius: theme.radius.full,
  },
}));

export default HeaderSubject;
