import { View, Text, Pressable } from 'react-native';
import React from 'react';
import { useStyles, createStyleSheet } from 'react-native-unistyles';
import { useAppNavigation } from '@hooks/useAppNavigation';

import { useExamQuery } from '../../hooks/useExamQuery';
import IsError from '../common/IsError';

import ExamMonthListSkeleton from './ExamMonthListSkeleton';
import ExamMonthListItem from './ExamMonthListItem';

const ExamMonthList = () => {
  const { styles } = useStyles(stylesheet);
  const today = new Date();
  const { exam, isError, isLoading } = useExamQuery(today.getMonth(), today.getFullYear());

  const navigation = useAppNavigation();

  const renderContent = () => {
    if (isLoading) {
      return <ExamMonthListSkeleton />;
    }

    if (isError) {
      return <IsError message="Nije moguće učitati ispite." />;
    }

    // data ready — render each exam for this month
    return exam.map((item, index) => (
      <Pressable
        key={item.id}
        onPress={() =>
          navigation.navigate('ExamDetails', {
            id: item.id,
            month: today.getMonth(),
            year: today.getFullYear(),
          })
        }
      >
        <ExamMonthListItem key={item.id} item={item} showDivider={index > 0} />
      </Pressable>
    ));
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.headerRow}>
        <Text style={styles.title}>Ispiti ovaj mjesec</Text>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{isLoading ? '-' : exam.length}</Text>
        </View>
      </View>

      <View style={styles.list}>{renderContent()}</View>
    </View>
  );
};

const stylesheet = createStyleSheet(theme => ({
  wrapper: {
    marginTop: theme.spacing.md,
    marginBottom: theme.spacing.xl,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  title: {
    fontSize: theme.typography.h3,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.text,
  },
  badge: {
    backgroundColor: theme.colors.primary,
    borderRadius: theme.radius.full,
    minWidth: 28,
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: theme.spacing.sm,
  },
  badgeText: {
    fontSize: theme.typography.caption,
    fontWeight: theme.fontWeight.bold,
    color: '#ffffff',
  },
  list: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.lg,
    borderWidth: 1,
    borderColor: theme.colors.border2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
}));

export default ExamMonthList;
