import { View, Text } from 'react-native';
import React from 'react';
import { useStyles, createStyleSheet } from 'react-native-unistyles';

type Props = {
  examDate: string;
  examLocation: string;
  professorName: string;
};

type RowProps = {
  letter: string;
  avatarColor: string;
  label: string;
  value: string;
  showDivider: boolean;
};

const InfoRow = ({ letter, avatarColor, label, value, showDivider }: RowProps) => {
  const { styles } = useStyles(stylesheet);

  return (
    <>
      {showDivider && <View style={styles.divider} />}
      <View style={styles.row}>
        <View style={[styles.avatar, { backgroundColor: avatarColor }]}>
          <Text style={styles.avatarText}>{letter}</Text>
        </View>
        <View style={styles.textGroup}>
          <Text style={styles.label}>{label}</Text>
          <Text style={styles.value}>{value}</Text>
        </View>
      </View>
    </>
  );
};

const ExamDetailsInfo = ({ examDate, examLocation, professorName }: Props) => {
  const { styles } = useStyles(stylesheet);

  const time = new Date(examDate).toLocaleTimeString('bs-BA', {
    hour: '2-digit',
    minute: '2-digit',
  });

  const rows = [
    { letter: 'V', avatarColor: '#e0e7ff', label: 'VRIJEME', value: time },
    { letter: 'L', avatarColor: '#fef3c7', label: 'LOKACIJA', value: examLocation },
    { letter: 'P', avatarColor: '#ede9fe', label: 'PROFESOR', value: professorName },
  ];

  return (
    <View style={styles.card}>
      {rows.map((row, index) => (
        <InfoRow
          key={row.label}
          letter={row.letter}
          avatarColor={row.avatarColor}
          label={row.label}
          value={row.value}
          showDivider={index > 0}
        />
      ))}
    </View>
  );
};

const stylesheet = createStyleSheet(theme => ({
  card: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.lg,
    borderWidth: 1,
    borderColor: theme.colors.border2,
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
    marginTop: theme.spacing.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.md,
    paddingVertical: theme.spacing.md,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: theme.radius.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: theme.typography.body,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.text,
  },
  textGroup: {
    gap: 2,
  },
  label: {
    fontSize: 11,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.muted,
    letterSpacing: 0.8,
  },
  value: {
    fontSize: theme.typography.h3,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.text,
  },
  divider: {
    height: 1,
    backgroundColor: theme.colors.border2,
  },
}));

export default ExamDetailsInfo;
