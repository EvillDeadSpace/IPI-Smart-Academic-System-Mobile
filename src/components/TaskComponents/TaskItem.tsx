import { View, Text, Pressable } from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

import {
  formatDate,
  formatDaysLate,
  formatShortDate,
  formatTimeLeft,
  truncate,
  getVariant,
} from '../../utils/HeaderUtils/TaskUtils/taskFormatters';
import { StudentAssignment } from '../../types/TaskTypes';
import { difficultyLabel, difficultyColor, difficultyDots } from '../../constants/const';

type Props = {
  item: StudentAssignment;
  onPress: () => void;
};

const TaskItem = ({ item, onPress }: Props) => {
  const { styles, theme } = useStyles(stylesheet);
  const variant = getVariant(item);
  const subjectColor = item.subject.color;
  const color = difficultyColor[item.difficulty];
  const dots = difficultyDots[item.difficulty];

  const renderDeadlineRow = () => {
    if (variant === 'active' || variant === 'urgent') {
      const isUrgent = variant === 'urgent';
      return (
        <View
          style={[
            styles.deadlineRow,
            isUrgent ? styles.deadlineRowUrgent : styles.deadlineRowActive,
          ]}
        >
          <View style={styles.deadlineLeft}>
            <Ionicons
              name="time-outline"
              size={13}
              color={isUrgent ? theme.colors.error : theme.colors.muted}
            />
            <Text style={[styles.deadlineText, isUrgent && styles.deadlineTextUrgent]}>
              Rok: {formatDate(item.dueDate)}
            </Text>
          </View>
          <View style={styles.timeLeftPill}>
            <Text style={[styles.timeLeftText, isUrgent && styles.deadlineTextUrgent]}>
              {formatTimeLeft(item.dueDate)}
            </Text>
          </View>
        </View>
      );
    }

    if (variant === 'late') {
      return (
        <View style={[styles.deadlineRow, styles.deadlineRowLate]}>
          <Ionicons name="alert-circle-outline" size={13} color={theme.colors.error} />
          <Text style={[styles.deadlineText, styles.deadlineTextUrgent]}>
            Prošao rok: {formatDaysLate(item.dueDate)}
          </Text>
        </View>
      );
    }

    if (variant === 'submitted') {
      return (
        <View style={[styles.deadlineRow, styles.deadlineRowSubmitted]}>
          <View style={styles.deadlineLeft}>
            <Ionicons name="checkmark-outline" size={13} color={theme.colors.success} />
            <Text style={[styles.deadlineText, styles.deadlineTextSubmitted]}>
              Predano · čeka ocjenu: {truncate(item.submission?.s3Path ?? null, 12)}
            </Text>
          </View>
          <Text style={[styles.deadlineText, styles.deadlineTextSubmitted]}>
            {formatShortDate(item.submission?.submittedAt ?? null)}
          </Text>
        </View>
      );
    }

    if (variant === 'graded') {
      return (
        <View style={[styles.deadlineRow, styles.deadlineRowSubmitted]}>
          <View style={styles.deadlineLeft}>
            <Ionicons name="checkmark-circle-outline" size={13} color={theme.colors.success} />
            <Text style={[styles.deadlineText, styles.deadlineTextSubmitted]}>
              Ocijenjeno: {formatShortDate(item.submission?.gradedAt ?? null)}
            </Text>
          </View>
        </View>
      );
    }
  };

  const renderActionButton = () => {
    if (variant === 'active' || variant === 'urgent') {
      return (
        <Pressable style={styles.submitButton}>
          <Ionicons name="cloud-upload-outline" size={13} color="#fff" />
          <Text style={styles.submitButtonText}>Predaj rad</Text>
        </Pressable>
      );
    }
    if (variant === 'late') {
      return (
        <Pressable style={[styles.submitButton, styles.submitButtonLate]}>
          <Ionicons name="cloud-upload-outline" size={13} color="#fff" />
          <Text style={styles.submitButtonText}>Predaj sa zakašnjenjem</Text>
        </Pressable>
      );
    }
    if (variant === 'submitted') {
      return (
        <Pressable style={[styles.submitButton, styles.submitButtonSecondary]}>
          <Text style={styles.submitButtonTextSecondary}>Otvori predaju</Text>
          <Ionicons name="arrow-forward-outline" size={13} color={theme.colors.text} />
        </Pressable>
      );
    }
    if (variant === 'graded') {
      return (
        <Pressable style={[styles.submitButton, styles.submitButtonSecondary]}>
          <Text style={styles.submitButtonTextSecondary}>Vidi feedback</Text>
          <Ionicons name="arrow-forward-outline" size={13} color={theme.colors.text} />
        </Pressable>
      );
    }
  };

  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.container,
        { borderLeftColor: variant === 'late' ? theme.colors.error : subjectColor },
      ]}
    >
      <View style={styles.titleRow}>
        <View style={styles.titleLeft}>
          <Text style={[styles.subject, { color: subjectColor }]}>{item.subject.name}</Text>
          <Text style={styles.title}>{item.title}</Text>
        </View>
        {variant === 'graded' && (
          <View style={styles.gradeBadge}>
            <Text style={styles.gradeValue}>{item.submission?.pointsEarned}</Text>
            <Text style={styles.gradeLabel}>BODOVA</Text>
          </View>
        )}
      </View>

      {renderDeadlineRow()}

      <View style={styles.infoRow}>
        <View style={[styles.difficultyPill, { backgroundColor: color + '20' }]}>
          {Array.from({ length: dots }).map((_, i) => (
            <View key={i} style={[styles.dot, { backgroundColor: color }]} />
          ))}
          <Text style={[styles.difficultyText, { color }]}>{difficultyLabel[item.difficulty]}</Text>
        </View>

        {item.professorS3Path && (variant === 'active' || variant === 'urgent') && (
          <View style={styles.infoPill}>
            <Ionicons name="attach-outline" size={13} color="#64748b" />
            <Text style={styles.infoPillText}>1 fajl</Text>
          </View>
        )}

        <View style={styles.actionSlot}>{renderActionButton()}</View>
      </View>
    </Pressable>
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
  subject: {
    fontSize: 11,
    fontWeight: theme.fontWeight.bold,
    letterSpacing: 0.5,
  },
  title: {
    fontSize: theme.typography.h3,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.text,
  },
  gradeBadge: {
    backgroundColor: theme.colors.successTint,
    borderRadius: theme.radius.md,
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
    alignItems: 'center',
    minWidth: 50,
  },
  gradeValue: {
    fontSize: theme.typography.h2,
    fontWeight: '900' as const,
    color: theme.colors.success,
  },
  gradeLabel: {
    fontSize: 9,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.success,
    letterSpacing: 1,
  },
  deadlineRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: theme.radius.sm,
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: 6,
    gap: 6,
  },
  deadlineRowActive: {
    backgroundColor: theme.colors.background,
  },
  deadlineRowUrgent: {
    backgroundColor: theme.colors.errorTint,
  },
  deadlineRowLate: {
    backgroundColor: theme.colors.errorTint,
  },
  deadlineRowSubmitted: {
    backgroundColor: theme.colors.successTint,
  },
  deadlineLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  deadlineText: {
    fontSize: theme.typography.body,
    color: theme.colors.muted,
    fontWeight: theme.fontWeight.regular,
  },
  deadlineTextUrgent: {
    color: theme.colors.error,
    fontWeight: theme.fontWeight.bold,
  },
  deadlineTextSubmitted: {
    color: theme.colors.success,
    fontWeight: theme.fontWeight.bold,
  },
  timeLeftPill: {
    backgroundColor: theme.colors.surface,
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: 3,
    borderRadius: theme.radius.full,
  },
  timeLeftText: {
    fontSize: 12,
    color: theme.colors.muted,
    fontWeight: theme.fontWeight.bold,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
  },
  difficultyPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: 4,
    borderRadius: theme.radius.full,
  },
  dot: {
    width: 5,
    height: 5,
    borderRadius: 999,
  },
  difficultyText: {
    fontSize: 12,
    fontWeight: theme.fontWeight.bold,
    marginLeft: 2,
  },
  infoPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: theme.colors.background,
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: 4,
    borderRadius: theme.radius.full,
  },
  infoPillText: {
    fontSize: 12,
    color: theme.colors.muted,
    fontWeight: theme.fontWeight.regular,
  },
  actionSlot: {
    marginLeft: 'auto',
  },
  submitButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: theme.colors.primary,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.radius.sm,
  },
  submitButtonLate: {
    backgroundColor: theme.colors.error,
  },
  submitButtonSecondary: {
    backgroundColor: theme.colors.background,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  submitButtonText: {
    fontSize: 12,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.surface,
  },
  submitButtonTextSecondary: {
    fontSize: 12,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.text,
  },
}));

export default TaskItem;
