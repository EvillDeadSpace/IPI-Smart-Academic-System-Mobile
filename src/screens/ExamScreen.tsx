import React, { useState } from 'react';
import { View, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

import ExamHeader from '../components/ExamComponents/ExamHeader';
import ExamCalendar from '../components/ExamComponents/ExamCalendar';
import ExamAgenda from '../components/ExamComponents/ExamAgenda';
import ExamMonthList from '../components/ExamComponents/ExamMonthList';

const ExamScreen = () => {
  const { styles } = useStyles(stylesheet);
  const tabBarHeight = useBottomTabBarHeight();

  const today = new Date();
  const [selectedDate, setSelectedDate] = useState<{
    day: number;
    month: number;
    year: number;
  }>({ day: today.getDate(), month: today.getMonth(), year: today.getFullYear() });

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <SafeAreaView style={styles.wrapper}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[styles.scrollContent, { paddingBottom: tabBarHeight + 16 }]}
        >
          <ExamHeader />
          <ExamCalendar onSelectDate={setSelectedDate} selectedDate={selectedDate} />
          <ExamAgenda selectedDate={selectedDate} />
          <ExamMonthList />
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

const stylesheet = createStyleSheet(theme => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  wrapper: {
    paddingHorizontal: theme.spacing.md,
  },
  scrollContent: {
    paddingBottom: 0,
  },
}));

export default ExamScreen;
