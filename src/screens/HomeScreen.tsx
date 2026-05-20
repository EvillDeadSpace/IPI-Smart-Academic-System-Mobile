import React from 'react';
import { View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

import Header from '../components/Header';
import NextLecture from '../components/Lecture/NextLecture';
import StatsCard from '../components/StatsComponent/StatsCard';
import { useStatsQuery } from '../hooks/useStatsQuery';

const HARD_CODED_EMAIL = 'amar@amar.com';

const HomeScreen: React.FC = () => {
  const { styles, theme } = useStyles(stylesheet);
  const { data, isLoading } = useStatsQuery(HARD_CODED_EMAIL);

  const stats = [
    { value: data?.avgGrade ?? 0, title: 'PROSJEK', color: theme.colors.primary },
    { value: data?.ects ?? 0, title: 'ECTS', color: theme.colors.success },
    { value: data?.examsLeft ?? 0, title: 'ISPITI', color: theme.colors.warning },
  ];

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <SafeAreaView>
        <Header />
        <NextLecture />
        <View style={styles.statsRow}>
          {stats.map(stat => (
            <StatsCard
              key={stat.title}
              value={stat.value}
              title={stat.title}
              color={stat.color}
              isLoading={isLoading}
            />
          ))}
        </View>
      </SafeAreaView>
    </View>
  );
};

const stylesheet = createStyleSheet(theme => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  statsRow: {
    flexDirection: 'row',
    marginHorizontal: theme.spacing.md,
    marginTop: theme.spacing.md,
    gap: theme.spacing.md,
  },
}));

export default HomeScreen;
