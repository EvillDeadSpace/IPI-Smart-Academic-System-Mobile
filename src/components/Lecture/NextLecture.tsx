import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import { Ionicons } from '@expo/vector-icons';

import { useNextLecture } from '../../hooks/queryHooks/useLectureQuery';
import { NextLectureData } from '../../services/fetchLecture';

import NextLectureSkeleton from './NextLectureSkeleton';

const formatLecture = (lecture: NextLectureData) => {
  const timeRange = `${lecture.startTime} – ${lecture.endTime}`;
  return {
    header: `SLJEDEĆE PREDAVANJE · ${lecture.countdown.toUpperCase()}`,
    details: `${timeRange} · ${lecture.room} · Prof. ${lecture.professor.fullName}`,
  };
};

const HARDCODED_EMAIL = 'amar@amar.com';

const NextLecture = () => {
  const { styles } = useStyles(stylesheet);
  const { nextLecture, isLoading, isError } = useNextLecture(HARDCODED_EMAIL);

  if (isLoading) {
    return (
      <View style={styles.card}>
        <NextLectureSkeleton />
      </View>
    );
  }

  if (isError || !nextLecture) {
    return (
      <View style={[styles.card, styles.centered]}>
        <Text style={styles.errorText}>Nema dostupnih predavanja</Text>
      </View>
    );
  }

  const { header, details } = formatLecture(nextLecture);

  return (
    <View style={styles.card}>
      <Text style={styles.header}>{header}</Text>
      <Text style={styles.title}>{nextLecture.subject.name}</Text>
      <Text style={styles.details}>{details}</Text>

      <View style={styles.actionsRow}>
        <TouchableOpacity style={styles.qrButton} activeOpacity={0.8}>
          <Ionicons name="qr-code-outline" size={16} color="#1e4ed8" />
          <Text style={styles.qrButtonText}>Skeniraj QR</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const stylesheet = createStyleSheet(theme => ({
  card: {
    backgroundColor: theme.colors.primary,
    borderRadius: theme.radius.lg,
    padding: theme.spacing.md,
    marginTop: theme.spacing.md,
    gap: theme.spacing.xs,
    ...theme.shadow.lg,
  },
  centered: {
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    minHeight: 130,
  },
  header: {
    fontSize: 11,
    fontWeight: theme.fontWeight.bold,
    color: 'rgba(255,255,255,0.75)',
    letterSpacing: 0.5,
  },
  title: {
    fontSize: theme.typography.h2,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.surface,
    marginTop: 2,
  },
  details: {
    fontSize: theme.typography.caption,
    color: 'rgba(255,255,255,0.8)',
    fontWeight: theme.fontWeight.regular,
  },
  actionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
    marginTop: theme.spacing.sm,
  },
  qrButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.spacing.xs,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.md,
    paddingVertical: theme.spacing.sm + 2,
  },
  qrButtonText: {
    fontSize: theme.typography.caption,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.primary,
  },
  errorText: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: theme.typography.body,
  },
}));

export default NextLecture;
