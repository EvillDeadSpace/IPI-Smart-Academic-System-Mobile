import { View, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import { Ionicons } from '@expo/vector-icons';

import { calculateTimeLeft } from '../../utils/HeaderUtils/TaskUtils/taskFormatters';

type TaskCountdownTimerProps = {
  dueDate: string;
};

const pad = (n: number) => String(n).padStart(2, '0');

const TaskCountdownTimer = ({ dueDate }: TaskCountdownTimerProps) => {
  const { styles } = useStyles(stylesheet);
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(dueDate));

  useEffect(() => {
    const interval = setInterval(() => setTimeLeft(calculateTimeLeft(dueDate)), 1000);
    return () => clearInterval(interval);
  }, [dueDate]);

  return (
    <View style={styles.card}>
      <View style={styles.labelRow}>
        <Ionicons name="time-outline" size={15} color="rgba(255,255,255,0.75)" />
        <Text style={styles.labelText}>ISTIČE ZA</Text>
      </View>

      <View style={styles.timerRow}>
        <View style={styles.unit}>
          <Text style={styles.number}>{pad(timeLeft.hours)}</Text>
          <Text style={styles.unitLabel}>SATI</Text>
        </View>
        <Text style={styles.separator}>:</Text>
        <View style={styles.unit}>
          <Text style={styles.number}>{pad(timeLeft.minutes)}</Text>
          <Text style={styles.unitLabel}>MIN</Text>
        </View>
        <Text style={styles.separator}>:</Text>
        <View style={styles.unit}>
          <Text style={styles.number}>{pad(timeLeft.seconds)}</Text>
          <Text style={styles.unitLabel}>SEK</Text>
        </View>
      </View>
    </View>
  );
};

const stylesheet = createStyleSheet(theme => ({
  card: {
    backgroundColor: theme.colors.primary,
    borderRadius: theme.radius.lg,
    padding: theme.spacing.md,
    gap: theme.spacing.sm,
    ...theme.shadow.lg,
  },
  labelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  labelText: {
    fontSize: 12,
    fontWeight: '800' as const,
    color: 'rgba(255,255,255,0.85)',
    letterSpacing: 0.5,
    marginLeft: theme.spacing.xs,
  },
  timerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
  },
  unit: {
    alignItems: 'center',
    minWidth: 56,
  },
  number: {
    fontSize: 52,
    fontWeight: '900' as const,
    color: theme.colors.surface,
  },
  unitLabel: {
    fontSize: 11,
    fontWeight: '800' as const,
    color: 'rgba(255,255,255,0.45)',
    letterSpacing: 1,
    marginTop: 2,
  },
  separator: {
    fontSize: 44,
    fontWeight: '900' as const,
    color: 'rgba(255,255,255,0.45)',
    paddingBottom: 18,
  },
}));

export default TaskCountdownTimer;
