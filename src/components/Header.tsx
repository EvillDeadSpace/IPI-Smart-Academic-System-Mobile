import React from 'react';
import { Text, View } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import { Ionicons } from '@expo/vector-icons';

import { getInitials } from '../utils/HeaderUtils/UtilsFunctionHeader';
//import { useNewsQuery } from '../hooks/useNewsQuery';
import { useAppNavigation } from '../hooks/useAppNavigation';

const Header: React.FC = () => {
  const { styles } = useStyles(stylesheet);
  const navigation = useAppNavigation();

  const user = 'Amar Tubic';
  //const { news, isError, isLoading } = useNewsQuery();

  // Get first two letters of first name and last name
  const initials = getInitials(user);

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <View style={styles.leftGroup}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{initials}</Text>
          </View>
          <View style={styles.textGroup}>
            <Text style={styles.welcome}>Dobrodošli, nazad</Text>
            <Text style={styles.name}>{user}</Text>
            <Text style={styles.description}>Dobro dosli u III godinu - IR</Text>
          </View>
        </View>
        <View style={styles.notificationBell}>
          <Ionicons
            onPress={() => navigation.navigate('Notifications')}
            name="notifications"
            size={18}
            color={'gray'}
          />
        </View>
      </View>
    </View>
  );
};

const stylesheet = createStyleSheet(theme => ({
  container: {
    backgroundColor: theme.colors.surface,
    padding: theme.spacing.md,
    borderBottomWidth: 4,
    borderBottomColor: theme.colors.border,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  notificationBell: {
    backgroundColor: theme.colors.background,
    width: theme.notificationBell.width,
    height: theme.notificationBell.height,
    borderRadius: theme.radius.sm,
    borderWidth: theme.borderWidth.thin,
    borderColor: theme.colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  leftGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
  },
  description: {
    color: theme.colors.muted,
    fontSize: theme.typography.caption,
    fontWeight: theme.fontWeight.light,
  },
  avatar: {
    width: theme.avatar.width,
    height: theme.avatar.height,
    borderRadius: theme.radius.full,
    backgroundColor: theme.colors.primaryTint,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: theme.colors.primary,
  },
  avatarText: {
    color: theme.colors.primary,
    fontSize: theme.typography.body,
    fontWeight: theme.fontWeight.bold,
  },
  textGroup: {
    gap: 0,
  },
  welcome: {
    color: theme.colors.muted,
    fontSize: theme.typography.caption,
    fontWeight: theme.fontWeight.regular,
  },
  name: {
    color: theme.colors.text,
    fontSize: theme.typography.h3,
    fontWeight: theme.fontWeight.bold,
  },
}));

export default Header;
