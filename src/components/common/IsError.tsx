import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

type Props = {
  message?: string;
  onRetry?: () => void;
};

const IsError = ({ message = 'Došlo je do greške.', onRetry }: Props) => {
  const { styles, theme } = useStyles(stylesheet);

  return (
    <View style={styles.container}>
      <Ionicons name="alert-circle-outline" size={40} color={theme.colors.error} />
      <Text style={styles.message}>{message}</Text>
      {onRetry && (
        <TouchableOpacity style={styles.retryButton} onPress={onRetry}>
          <Text style={styles.retryText}>Pokušaj ponovo</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const stylesheet = createStyleSheet(theme => ({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.spacing.sm,
    backgroundColor: theme.colors.background,
  },
  message: {
    fontSize: theme.typography.caption,
    color: theme.colors.muted,
    fontWeight: theme.fontWeight.regular,
    textAlign: 'center',
  },
  retryButton: {
    marginTop: theme.spacing.xs,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    backgroundColor: theme.colors.primaryTint,
    borderRadius: theme.radius.sm,
  },
  retryText: {
    fontSize: theme.typography.caption,
    color: theme.colors.primary,
    fontWeight: theme.fontWeight.bold,
  },
}));

export default IsError;
