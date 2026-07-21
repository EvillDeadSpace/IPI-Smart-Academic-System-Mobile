import { View, Text } from 'react-native';
import React from 'react';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

import { SubjectEnrollment } from '../../types/SubjectTypes';

type Props = {
  item: SubjectEnrollment;
};

const SubjectItem = ({ item }: Props) => {
  const { styles, theme } = useStyles(stylesheet);
  const { subject } = item;
  const accent = subject.isElective ? theme.colors.warning : theme.colors.primary;

  return (
    <View style={[styles.container, { borderLeftColor: accent }]}>
      <View style={styles.titleRow}>
        <View style={styles.titleLeft}>
          <Text style={styles.code}>{subject.code}</Text>
          <Text style={styles.name}>{subject.name}</Text>
        </View>
        <View style={[styles.badge, { backgroundColor: accent + '20' }]}>
          <Text style={[styles.badgeText, { color: accent }]}>
            {subject.isElective ? 'Izborni' : 'Obavezni'}
          </Text>
        </View>
      </View>

      <View style={styles.infoRow}>
        <Text style={styles.infoText}>{subject.ects} ECTS</Text>
        <Text style={styles.infoText}>· {item.academicYear}</Text>
        <Text style={styles.infoText}>· Semestar {item.semester}</Text>
      </View>
    </View>
  );
};

const stylesheet = createStyleSheet(theme => ({
  container: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.md,
    padding: theme.spacing.md,
    gap: theme.spacing.sm,
    borderWidth: 1,
    borderColor: theme.colors.border2,
    borderLeftWidth: 5,
    ...theme.shadow.sm,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  titleLeft: {
    flex: 1,
    gap: 2,
  },
  code: {
    fontSize: 11,
    fontWeight: theme.fontWeight.bold,
    letterSpacing: 0.5,
    color: theme.colors.muted,
  },
  name: {
    fontSize: theme.typography.h3,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.text,
  },
  badge: {
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: 4,
    borderRadius: theme.radius.full,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: theme.fontWeight.bold,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  infoText: {
    fontSize: theme.typography.body,
    color: theme.colors.muted,
    fontWeight: theme.fontWeight.regular,
  },
}));

export default SubjectItem;
