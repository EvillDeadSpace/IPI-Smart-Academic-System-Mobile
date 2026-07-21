import { View, Text } from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useStyles, createStyleSheet } from 'react-native-unistyles';

import { DAY_NAMES, MONTH_NAMES } from '../../constants/const';
import { useExamQuery } from '../../hooks/queryHooks/useExamQuery';

type Props = {
  selectedDate: { day: number; month: number; year: number } | null;
};

const EXAM_COLOR = '#3d5af1';

const ExamAgenda = ({ selectedDate }: Props) => {
  const { styles, theme } = useStyles(stylesheet);
  const { exam } = useExamQuery(selectedDate?.month ?? 0, selectedDate?.year ?? 0);

  if (!selectedDate) {
    return null;
  }

  const { day, month, year } = selectedDate;
  const dayOfWeek = new Date(year, month, day).getDay();
  const label = `${DAY_NAMES[dayOfWeek]}, ${day}. ${MONTH_NAMES[month]}`;

  const dayExams = exam.filter(e => new Date(e.examTime).getDate() === day);

  if (dayExams.length === 0) {
    return (
      <View style={styles.wrapper}>
        <Text style={styles.dateLabel}>{label}</Text>
        <View style={styles.emptyCard}>
          <View style={styles.emptyIconWrapper}>
            <Ionicons name="calendar-outline" size={24} color={theme.colors.muted} />
          </View>
          <Text style={styles.emptyTitle}>Slobodan dan</Text>
          <Text style={styles.emptyText}>Nema ispita ni rokova za ovaj dan.</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.wrapper}>
      <View style={styles.headerRow}>
        <Text style={styles.dateLabel}>{label}</Text>
        <Text style={styles.count}>
          {dayExams.length} {dayExams.length === 1 ? 'događaj' : 'događaja'}
        </Text>
      </View>

      <View style={styles.card}>
        {dayExams.map((item, index) => {
          const time = new Date(item.examTime).toLocaleTimeString('bs-BA', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
          });

          return (
            <View key={item.id}>
              {index > 0 && <View style={styles.divider} />}
              <View style={styles.eventRow}>
                <View style={[styles.colorBar, { backgroundColor: EXAM_COLOR }]} />
                <View style={styles.eventContent}>
                  <Text style={styles.title}>{item.subject.name}</Text>
                  <View style={styles.tagRow}>
                    <View style={[styles.tag, { backgroundColor: EXAM_COLOR + '20' }]}>
                      <Text style={[styles.tagText, { color: EXAM_COLOR }]}>Ispit</Text>
                    </View>
                    <Text style={styles.time}>{time}</Text>
                  </View>
                </View>
              </View>
            </View>
          );
        })}
      </View>
    </View>
  );
};

const stylesheet = createStyleSheet(theme => ({
  wrapper: {
    marginTop: theme.spacing.md,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
  },
  dateLabel: {
    fontSize: theme.typography.h3,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.text,
  },
  count: {
    fontSize: theme.typography.caption,
    color: theme.colors.muted,
    fontWeight: theme.fontWeight.regular,
  },
  card: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.lg,
    borderWidth: 1,
    borderColor: theme.colors.border2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  divider: {
    height: 1,
    backgroundColor: theme.colors.border2,
    marginHorizontal: theme.spacing.md,
  },
  eventRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: theme.spacing.md,
    gap: theme.spacing.md,
  },
  colorBar: {
    width: 3,
    height: 40,
    borderRadius: 2,
  },
  eventContent: {
    flex: 1,
    gap: 4,
  },
  title: {
    fontSize: theme.typography.body,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.text,
  },
  tagRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  tag: {
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: 2,
    borderRadius: theme.radius.full,
  },
  tagText: {
    fontSize: 11,
    fontWeight: theme.fontWeight.bold,
  },
  time: {
    fontSize: theme.typography.caption,
    color: theme.colors.muted,
  },
  emptyCard: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.lg,
    borderWidth: 1,
    borderColor: theme.colors.border2,
    alignItems: 'center',
    paddingVertical: theme.spacing.xl,
    paddingHorizontal: theme.spacing.md,
    marginTop: theme.spacing.sm,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  emptyIconWrapper: {
    width: 52,
    height: 52,
    borderRadius: theme.radius.full,
    backgroundColor: theme.colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.spacing.md,
  },
  emptyTitle: {
    fontSize: theme.typography.h3,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
  },
  emptyText: {
    fontSize: theme.typography.body,
    color: theme.colors.muted,
    textAlign: 'center',
  },
}));

export default ExamAgenda;
