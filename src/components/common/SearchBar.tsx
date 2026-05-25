import { View, TextInput } from 'react-native';
import React, { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

import { SearchBarProps } from '../../types/TaskTypes';

const SearchBar = ({ value, onChange }: SearchBarProps) => {
  const { styles, theme } = useStyles(stylesheet);

  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={[styles.container, isFocused && styles.containerFocused]}>
      <Ionicons
        name="search-outline"
        size={18}
        color={isFocused ? theme.colors.primary : theme.colors.muted}
        style={styles.icon}
      />
      <TextInput
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder="Pretraži zadatke ili predmete…"
        placeholderTextColor={theme.colors.muted}
        value={value}
        onChangeText={onChange}
        style={styles.input}
      />
    </View>
  );
};

const stylesheet = createStyleSheet(theme => ({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.background,
    borderRadius: theme.radius.sm,
    borderWidth: 1,
    borderColor: theme.colors.border,
    height: 52,
    marginTop: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
  },
  containerFocused: {
    borderColor: theme.colors.primary,
  },
  icon: {
    marginRight: theme.spacing.sm,
  },
  input: {
    flex: 1,
    fontSize: theme.typography.body,
    color: theme.colors.text,
  },
}));

export default SearchBar;
