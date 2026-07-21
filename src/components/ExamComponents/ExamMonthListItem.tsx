import { View, Text } from 'react-native';
import React from 'react';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

import { Exam } from '../../types/examTypes';
import { DAYS, MONTH_NAMES } from '../../constants/const';

type Props = {
  item: Exam;
  showDivider: boolean;
};

const ExamMonthListItem = ({ item, showDivider }: Props) => {
  const { styles } = useStyles(stylesheet);

  const date = new Date(item.examTime);
  const dayShort = DAYS[date.getDay()];
  const day = date.getDate();
  const month = MONTH_NAMES[date.getMonth()];
  const year = date.getFullYear();
  const time = date.toLocaleTimeString('bs-BA', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });
  const initial = item.subject.name.charAt(0).toUpperCase();

  return (
    <View>
      {showDivider && <View style={styles.divider} />}
      <View style={styles.row}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{initial}</Text>
        </View>
        <View style={styles.content}>
          <Text style={styles.name}>{item.subject.name}</Text>
          <View style={styles.meta}>
            <View style={styles.tag}>
              <Text style={styles.tagText}>Ispit</Text>
            </View>
            <Text style={styles.date}>
              {dayShort}, {day}. {month} {year}
            </Text>
          </View>
        </View>
        <Text style={styles.time}>{time}</Text>
      </View>
    </View>
  );
};

const stylesheet = createStyleSheet(theme => ({
  divider: {
    height: 1,
    backgroundColor: theme.colors.border2,
    marginHorizontal: theme.spacing.md,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: theme.spacing.md,
    gap: theme.spacing.md,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: theme.radius.md,
    backgroundColor: theme.colors.primaryTint,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: theme.typography.body,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.primary,
  },
  content: {
    flex: 1,
    gap: 4,
  },
  name: {
    fontSize: theme.typography.body,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.text,
  },
  meta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  tag: {
    backgroundColor: theme.colors.primaryTint2,
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: 2,
    borderRadius: theme.radius.full,
  },
  tagText: {
    fontSize: 11,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.primary,
  },
  date: {
    fontSize: theme.typography.caption,
    color: theme.colors.muted,
  },
  time: {
    fontSize: theme.typography.caption,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.text2,
  },
}));

export default ExamMonthListItem;
