import React from 'react';
import { View, Text } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import BackButton from '@components/BackButton';

type Props = {
  subjectName: string;
  examDate: string;
  maxPoints: number;
};

const ExamDetailsHeader = ({ subjectName, examDate, maxPoints }: Props) => {
  const { styles } = useStyles(stylesheet);

  const date = new Date(examDate);
  const formatted = date.toLocaleDateString('bs-BA', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

  return (
    <View style={styles.container}>
      <View style={styles.topRow}>
        <BackButton />
        <Text style={styles.screenLabel}>Detalji</Text>
      </View>

      <Text style={styles.title}>{subjectName}</Text>

      <View style={styles.chipsRow}>
        <View style={styles.chip}>
          <Text style={styles.chipText}>Ispit</Text>
        </View>
        <View style={styles.chip}>
          <Text style={styles.chipText}>{formatted}</Text>
        </View>
        <View style={styles.chip}>
          <Text style={styles.chipText}>{maxPoints} bod.</Text>
        </View>
      </View>
    </View>
  );
};

const stylesheet = createStyleSheet(theme => ({
  container: {
    padding: theme.spacing.lg,
    paddingBottom: theme.spacing.xl,
    gap: theme.spacing.lg,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
  },
  screenLabel: {
    fontSize: theme.typography.body,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.surface,
  },
  title: {
    fontSize: 32,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.surface,
    lineHeight: 38,
  },
  chipsRow: {
    flexDirection: 'row',
    gap: theme.spacing.sm,
    flexWrap: 'wrap',
  },
  chip: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: theme.radius.full,
    paddingVertical: 5,
    paddingHorizontal: theme.spacing.sm,
  },
  chipText: {
    fontSize: theme.typography.caption,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.surface,
  },
}));

export default ExamDetailsHeader;
