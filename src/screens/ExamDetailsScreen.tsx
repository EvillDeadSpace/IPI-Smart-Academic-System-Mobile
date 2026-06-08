import { View, ScrollView, Text, Pressable } from 'react-native';
import React, { useState } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

import { RootStackParamList } from '../types/navigation';
import { useExamQuery } from '../hooks/useExamQuery';
import { useExamRegistrationQuery } from '../hooks/useExamRegistrationQuery';
import ExamDetailsHeader from '../components/ExamDetailsComponent/ExamDetailsHeader';
import ExamDetailsInfo from '../components/ExamDetailsComponent/ExamDetailsInfo';
import ExamRegistration from '../components/ExamComponents/ExamRegistration';

type Props = NativeStackScreenProps<RootStackParamList, 'ExamDetails'>;

const ExamDetailsScreen = (props: Props) => {
  const { styles } = useStyles(stylesheet);
  const { id, month, year } = props.route.params;
  const [freshCode, setFreshCode] = useState<string | null>(null);
  const { registrationCode: existingCode, isLoading: checkLoading } = useExamRegistrationQuery(
    Number(id),
  );

  const { exam, isLoading } = useExamQuery(month, year);

  const examDetails = exam.find(e => e.id === Number(id));

  const registrationCode = freshCode ?? existingCode;

  if (isLoading || checkLoading || !examDetails) {
    return <View style={styles.container} />;
  }

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <SafeAreaView edges={['top']} style={styles.safeArea}></SafeAreaView>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.wrapper}>
          <View style={styles.headerCard}>
            <ExamDetailsHeader
              examDate={examDetails.examTime}
              subjectName={examDetails.subject.name}
              maxPoints={examDetails.maxPoints}
            />
          </View>
          <ExamDetailsInfo
            examDate={examDetails.examTime}
            examLocation={examDetails.location}
            professorName={examDetails.professor.firstName + ' ' + examDetails.professor.lastName}
          />
          {registrationCode ? (
            <>
              <View style={styles.registeredBanner}>
                <View style={styles.registeredIconWrap}>
                  <Text style={styles.registeredCheck}>✓</Text>
                </View>
                <View style={styles.registeredText}>
                  <Text style={styles.registeredTitle}>Prijavljen ispit</Text>
                  <Text style={styles.registeredSub}>
                    Potvrda {registrationCode} · termin u kalendaru
                  </Text>
                </View>
              </View>
              <Pressable style={styles.backButton} onPress={() => props.navigation.goBack()}>
                <Text style={styles.backButtonText}>Povratak na kalendar</Text>
              </Pressable>
            </>
          ) : (
            <>
              <ExamRegistration
                examId={examDetails.id}
                examDate={examDetails.examTime}
                examLocation={examDetails.location}
                professorName={examDetails.professor.firstName}
                subjectName={examDetails.subject.name}
                onRegistered={setFreshCode}
              />
              <Pressable style={styles.backButton} onPress={() => props.navigation.goBack()}>
                <Text style={styles.backButtonText}>Povratak na kalendar</Text>
              </Pressable>
            </>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

const stylesheet = createStyleSheet(theme => ({
  wrapper: {
    paddingHorizontal: theme.spacing.md,
  },
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  safeArea: {
    backgroundColor: theme.colors.background,
  },
  headerCard: {
    backgroundColor: theme.colors.primary,
    borderBottomLeftRadius: theme.radius.lg,
    borderBottomRightRadius: theme.radius.lg,
    borderTopRightRadius: theme.radius.lg,
    borderTopLeftRadius: theme.radius.lg,
  },
  registeredBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
    backgroundColor: '#166534',
    borderRadius: theme.radius.lg,
    padding: theme.spacing.md,
    marginTop: theme.spacing.md,
  },
  registeredIconWrap: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  registeredCheck: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  registeredText: {
    flex: 1,
    gap: 2,
  },
  registeredTitle: {
    fontSize: theme.typography.body,
    fontWeight: theme.fontWeight.bold,
    color: '#fff',
  },
  registeredSub: {
    fontSize: theme.typography.caption,
    color: 'rgba(255,255,255,0.75)',
  },
  backButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.primaryTint,
    borderRadius: theme.radius.lg,
    paddingVertical: theme.spacing.md,
    marginTop: theme.spacing.sm,
  },
  backButtonText: {
    fontSize: theme.typography.body,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.primary,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: theme.spacing.xxl,
  },
}));

export default ExamDetailsScreen;
