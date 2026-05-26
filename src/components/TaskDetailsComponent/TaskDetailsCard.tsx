import { View, Text } from 'react-native';
import React from 'react';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

import { getInitials } from '../../utils/HeaderUtils/UtilsFunctionHeader';
import { AssignmentDifficulty } from '../../types/TaskTypes';
import { DIFFICULTY_CONFIG } from '../../constants/const';

type Props = {
  title: string;
  professorName: string;
  maxPoints: number;
  difficulty: AssignmentDifficulty;
  subjectName: string;
};

const TaskDetailsCard = ({ title, professorName, maxPoints, difficulty, subjectName }: Props) => {
  const { styles } = useStyles(stylesheet);
  const config = DIFFICULTY_CONFIG[difficulty];

  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subject}>{subjectName}</Text>

      <View style={styles.grid}>
        <View style={styles.cell}>
          <Text style={styles.cellLabel}>PROFESOR</Text>
          <View style={styles.professorRow}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{getInitials(professorName)}</Text>
            </View>
            <Text style={styles.professorName}>{professorName}</Text>
          </View>
        </View>

        <View style={styles.cell}>
          <Text style={styles.cellLabel}>VRIJEDI</Text>
          <Text style={styles.cellValue}>{maxPoints}% finalne</Text>
        </View>

        <View style={styles.cell}>
          <Text style={styles.cellLabel}>TEŽINA</Text>
          <View style={styles.dotsRow}>
            {[1, 2, 3].map(i => (
              <View key={i} style={styles.dot(i <= config.dots, config.color)} />
            ))}
            <Text style={styles.difficultyLabel(config.color)}>{config.label}</Text>
          </View>
        </View>

        <View style={styles.cell}>
          <Text style={styles.cellLabel}>PROCIJ. VRIJEME</Text>
          <Text style={styles.cellValue}>{config.time}</Text>
        </View>
      </View>
    </View>
  );
};

const stylesheet = createStyleSheet(theme => ({
  card: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.lg,
    padding: theme.spacing.md,
    marginTop: theme.spacing.md,
    gap: theme.spacing.sm,
    ...theme.shadow.sm,
  },
  title: {
    fontSize: theme.typography.h3,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.text,
  },
  subject: {
    fontSize: theme.typography.caption,
    color: theme.colors.muted,
    marginTop: -4,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: theme.spacing.sm,
    gap: theme.spacing.md,
  },
  cell: {
    width: '45%',
    gap: 6,
  },
  cellLabel: {
    fontSize: 10,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.muted,
    letterSpacing: 0.8,
  },
  cellValue: {
    fontSize: theme.typography.body,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.text,
  },
  professorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: theme.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: 12,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.surface,
  },
  professorName: {
    fontSize: theme.typography.body,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.text,
  },
  dotsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  dot: (active: boolean, color: string) => ({
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: active ? color : '#E0E0E0',
  }),
  difficultyLabel: (color: string) => ({
    fontSize: theme.typography.body,
    fontWeight: theme.fontWeight.bold,
    marginLeft: 4,
    color,
  }),
}));

export default TaskDetailsCard;
