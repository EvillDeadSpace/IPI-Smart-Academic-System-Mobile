import { View, Text, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useStyles, createStyleSheet } from 'react-native-unistyles';

import { DAYS, MONTH_NAMES } from '../../constants/const';
import { useExamQuery } from '../../hooks/useExamQuery';
import { buildWeeks } from '../../utils/ExamUtils/CalendarFunction';

type Props = {
  onSelectDate: (date: { day: number; month: number; year: number }) => void;
  selectedDate: { day: number; month: number; year: number };
};

const ExamCalendar = ({ onSelectDate, selectedDate }: Props) => {
  const { styles, theme } = useStyles(stylesheet);
  const today = new Date();

  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());

  const { exam, isError, isLoading } = useExamQuery(month, year);

  const weeks = buildWeeks(year, month);

  const goToPrev = () => {
    if (month === 0) {
      setYear(y => y - 1);
      setMonth(11);
    } else {
      setMonth(m => m - 1);
    }
  };

  const goToNext = () => {
    if (month === 11) {
      setYear(y => y + 1);
      setMonth(0);
    } else {
      setMonth(m => m + 1);
    }
  };

  const isToday = (date: number) =>
    date === today.getDate() && month === today.getMonth() && year === today.getFullYear();

  return (
    <View style={styles.card}>
      <View style={styles.monthRow}>
        <TouchableOpacity style={styles.navButton} onPress={goToPrev}>
          <Ionicons name="chevron-back" size={18} color="#0f172a" />
        </TouchableOpacity>
        <Text style={styles.monthTitle}>
          {MONTH_NAMES[month]} {year}
        </Text>
        <TouchableOpacity style={styles.navButton} onPress={goToNext}>
          <Ionicons name="chevron-forward" size={18} color="#0f172a" />
        </TouchableOpacity>
      </View>

      <View style={styles.daysRow}>
        {DAYS.map((day, i) => (
          <Text key={day} style={[styles.dayName, i >= 5 && styles.weekendText]}>
            {day}
          </Text>
        ))}
      </View>

      {weeks.map((week, wi) => (
        <View key={wi} style={styles.weekRow}>
          {week.map((date, di) => {
            const indicator =
              date !== 0
                ? exam.some(e => new Date(e.examTime).getDate() === date)
                  ? theme.colors.primary
                  : undefined
                : undefined;
            const isSelected =
              date === selectedDate.day &&
              month === selectedDate.month &&
              year === selectedDate.year;

            return (
              <TouchableOpacity
                key={di}
                style={styles.dayCell}
                onPress={() => date !== 0 && onSelectDate({ day: date, month, year })}
                disabled={date === 0}
              >
                {date !== 0 && (
                  <>
                    <View
                      style={[
                        styles.dateWrapper,
                        isToday(date) && styles.todayWrapper,
                        isSelected && !isToday(date) && styles.selectedWrapper,
                      ]}
                    >
                      <Text
                        style={[
                          styles.dateText,
                          di >= 5 && styles.weekendText,
                          isToday(date) && styles.todayText,
                          isSelected && !isToday(date) && styles.selectedText,
                        ]}
                      >
                        {date}
                      </Text>
                    </View>
                    {indicator && (
                      <View style={[styles.indicator, { backgroundColor: indicator }]} />
                    )}
                  </>
                )}
              </TouchableOpacity>
            );
          })}
        </View>
      ))}
    </View>
  );
};

const stylesheet = createStyleSheet(theme => ({
  card: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.lg,
    padding: theme.spacing.md,
    borderWidth: 1,
    borderColor: theme.colors.border2,
    ...theme.shadow.md,
  },
  monthRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: theme.spacing.md,
  },
  navButton: {
    width: 36,
    height: 36,
    borderRadius: theme.radius.sm,
    borderWidth: theme.borderWidth.thin,
    borderColor: theme.colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  monthTitle: {
    fontSize: theme.typography.h3,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.text,
  },
  daysRow: {
    flexDirection: 'row',
    marginBottom: theme.spacing.sm,
  },
  dayName: {
    flex: 1,
    textAlign: 'center',
    fontSize: theme.typography.caption,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.muted,
  },
  weekendText: {
    color: theme.colors.error,
  },
  weekRow: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  dayCell: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 4,
  },
  dateWrapper: {
    width: 34,
    height: 34,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: theme.radius.sm,
  },
  todayWrapper: {
    backgroundColor: theme.colors.primary,
  },
  selectedWrapper: {
    backgroundColor: theme.colors.primaryTint,
    borderWidth: 1,
    borderColor: theme.colors.primary,
    borderRadius: theme.radius.md,
  },
  selectedText: {
    color: theme.colors.primary,
    fontWeight: theme.fontWeight.bold,
  },
  dateText: {
    fontSize: theme.typography.body,
    color: theme.colors.text,
  },
  todayText: {
    color: '#ffffff',
    fontWeight: theme.fontWeight.bold,
  },
  indicator: {
    width: 16,
    height: 3,
    borderRadius: 2,
    marginTop: 2,
  },
}));

export default ExamCalendar;
