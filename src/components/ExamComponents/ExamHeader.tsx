import React from 'react';
import { View, Text } from 'react-native';
import { useStyles, createStyleSheet } from 'react-native-unistyles';

const ExamHeader = () => {
  const { styles } = useStyles(stylesheet);

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.subtitle}>Raspored ispita i rokovi</Text>
        <Text style={styles.title}>Kalendar ispita</Text>
      </View>
    </View>
  );
};

const stylesheet = createStyleSheet(theme => ({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: theme.spacing.md,
  },
  textContainer: {
    flex: 1,
  },
  subtitle: {
    fontSize: theme.typography.caption,
    color: theme.colors.muted,
    marginBottom: 2,
  },
  title: {
    fontSize: theme.typography.h2,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.text,
  },
  filterButton: {
    width: 40,
    height: 40,
    borderRadius: theme.radius.sm,
    borderWidth: theme.borderWidth.thin,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    ...theme.shadow.sm,
  },
}));

export default ExamHeader;
