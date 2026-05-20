import { View, Text } from 'react-native';
import React from 'react';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

import { QuickAccessItems } from '../../constants/const';

import QuickAccessCard from './QuickAccessCard';

const QuickAccess = () => {
  const { styles } = useStyles(stylesheet);
  return (
    <View>
      <Text style={styles.textContainer}>BRZI PRISTUP</Text>
      <View style={styles.QuickAccessContainer}>
        {QuickAccessItems.map(item => {
          return <QuickAccessCard key={item.id} item={item} />;
        })}
      </View>
    </View>
  );
};

const stylesheet = createStyleSheet(theme => ({
  textContainer: {
    fontSize: theme.typography.caption,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.text,
    marginBottom: theme.spacing.sm,
    marginTop: theme.spacing.sm,
  },
  QuickAccessContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.sm,
  },
}));

export default QuickAccess;
