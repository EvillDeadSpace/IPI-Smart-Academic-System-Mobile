import { View, Text, Pressable, ActivityIndicator } from 'react-native';
import React, { useRef, useState } from 'react';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import { Ionicons } from '@expo/vector-icons';
import { BottomSheetModal, BottomSheetTextInput, BottomSheetView } from '@gorhom/bottom-sheet';

import { useQuestionQuery } from '../../hooks/queryHooks/useQuestionQuery';
import { getInitials } from '../../utils/HeaderUtils/UtilsFunctionHeader';
import { formatTimeAgo } from '../../utils/HeaderUtils/TaskUtils/taskFormatters';
import { postQuestion } from '../../services/fetchQuestions';

const MAX_LENGTH = 280;

type Props = {
  assignmentId: number;
  professorName?: string;
  subjectName?: string;
};

const HARDCODED_EMAIL = 'amar@amar.com';

const TaskQA = ({ assignmentId, professorName, subjectName }: Props) => {
  const { styles, theme } = useStyles(stylesheet);
  const { question, isLoading, refetch } = useQuestionQuery(assignmentId);
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const [text, setText] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    try {
      setSubmitting(true);
      await postQuestion(assignmentId, HARDCODED_EMAIL, text);
      setText('');
      bottomSheetRef.current?.close();
      await refetch();
    } catch (error) {
      console.error('Error posting question:', error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <View style={styles.iconBox}>
              <Ionicons name="mail-outline" size={16} color={theme.colors.primary} />
            </View>
            <Text style={styles.label}>PITANJA & ODGOVORI</Text>
          </View>
          <Text style={styles.questionCount}>{question?.length ?? 0}</Text>
        </View>

        <View style={styles.questionList}>
          {isLoading
            ? [0, 1].map(i => (
                <View key={i} style={[styles.questionCard, i > 0 && styles.questionCardBorder]}>
                  <View style={styles.skeletonRow}>
                    <View style={styles.skeletonAvatar} />
                    <View style={styles.skeletonName} />
                  </View>
                  <View style={styles.skeletonText} />
                </View>
              ))
            : question?.map((item, index) => {
                const initials = getInitials(`${item.student.firstName} ${item.student.lastName}`);
                return (
                  <View
                    key={item.id}
                    style={[styles.questionCard, index > 0 && styles.questionCardBorder]}
                  >
                    <View style={styles.avatarRow}>
                      <View style={styles.avatar}>
                        <Text style={styles.avatarText}>{initials}</Text>
                      </View>
                      <Text style={styles.studentName}>
                        {item.student.firstName} {item.student.lastName}
                        <Text style={styles.timeAgo}> · {formatTimeAgo(item.createdAt)}</Text>
                      </Text>
                    </View>
                    <Text style={styles.questionText}>{item.text}</Text>
                    {item.answer ? (
                      <View style={styles.answerBox}>
                        <View style={styles.answerLabelRow}>
                          <Ionicons
                            name="checkmark-circle-outline"
                            size={16}
                            color={theme.colors.primary}
                          />
                          <Text style={styles.answerLabelText}>ODGOVOR PROFESORA</Text>
                        </View>
                        <Text style={styles.answerText}>{item.answer}</Text>
                      </View>
                    ) : (
                      <View style={styles.pendingBadge}>
                        <Ionicons name="time-outline" size={13} color={theme.colors.muted} />
                        <Text style={styles.pendingText}>Čeka odgovor profesora</Text>
                      </View>
                    )}
                  </View>
                );
              })}
        </View>

        <Pressable style={styles.askButton} onPress={() => bottomSheetRef.current?.present()}>
          <Ionicons name="add" size={18} color={theme.colors.primary} />
          <Text style={styles.askButtonText}>Postavi pitanje profesoru</Text>
        </Pressable>
      </View>

      <BottomSheetModal ref={bottomSheetRef} snapPoints={['65%']} enableDynamicSizing={false}>
        <BottomSheetView style={styles.sheetContent}>
          <Text style={styles.sheetTitle}>Postavi pitanje</Text>
          <Text style={styles.sheetSubtitle}>
            {subjectName} · prof. {professorName}
          </Text>

          <View style={styles.inputWrapper}>
            <BottomSheetTextInput
              style={styles.textInput}
              placeholder="Npr. Da li smijemo koristiti vanjske biblioteke?"
              placeholderTextColor={theme.colors.muted}
              multiline
              maxLength={MAX_LENGTH}
              value={text}
              onChangeText={setText}
              textAlignVertical="top"
            />
            <Text style={styles.charCount}>
              {text.length}/{MAX_LENGTH}
            </Text>
          </View>

          <Text style={styles.visibilityLabel}>KO VIDI OVO PITANJE?</Text>

          <View style={styles.visibilityOption}>
            <View style={styles.visibilityIconBox}>
              <Ionicons name="people-outline" size={18} color="#fff" />
            </View>
            <View style={styles.visibilityInfo}>
              <Text style={styles.visibilityTitle}>Javno</Text>
              <Text style={styles.visibilityDesc}>Svi studenti vide pitanje i odgovor</Text>
            </View>
            <Ionicons name="checkmark-circle" size={22} color={theme.colors.primary} />
          </View>

          <Pressable
            onPress={handleSubmit}
            style={[styles.submitBtn, (!text.trim() || submitting) && styles.submitBtnDisabled]}
            disabled={!text.trim() || submitting}
          >
            {submitting ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Text style={styles.submitBtnText}>Pošalji pitanje</Text>
            )}
          </Pressable>
        </BottomSheetView>
      </BottomSheetModal>
    </>
  );
};

const stylesheet = createStyleSheet(theme => ({
  container: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.lg,
    padding: theme.spacing.md,
    marginTop: theme.spacing.md,
    ...theme.shadow.sm,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: theme.spacing.md,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
  },
  iconBox: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontSize: 10,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.muted,
    letterSpacing: 0.5,
  },
  questionCount: {
    fontSize: 12,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.primary,
    backgroundColor: theme.colors.primaryTint,
    borderRadius: theme.radius.full,
    paddingHorizontal: 8,
    paddingVertical: 2,
    overflow: 'hidden',
  },
  questionList: {},
  questionCard: {
    paddingVertical: theme.spacing.md,
  },
  questionCardBorder: {
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
  },
  avatarRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: theme.spacing.sm,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: theme.radius.full,
    backgroundColor: theme.colors.primaryTint,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: 11,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.primary,
  },
  studentName: {
    fontSize: theme.typography.caption,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.text,
  },
  timeAgo: {
    fontSize: theme.typography.caption,
    fontWeight: theme.fontWeight.regular,
    color: theme.colors.muted,
  },
  questionText: {
    fontSize: theme.typography.body,
    color: theme.colors.text,
    paddingLeft: 40,
    marginTop: -8,
  },
  answerBox: {
    backgroundColor: '#eef3ff',
    borderRadius: 9,
    borderWidth: 1,
    borderColor: '#dbe5ff',
    paddingVertical: 8,
    paddingHorizontal: 10,
    marginLeft: 36,
    marginTop: 8,
    gap: 4,
  },
  answerLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  answerLabelText: {
    fontSize: 12,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.primary,
    letterSpacing: 0.5,
  },
  answerText: {
    fontSize: theme.typography.body,
    color: theme.colors.text,
  },
  waitingText: {
    fontSize: theme.typography.body,
    color: theme.colors.muted,
  },
  pendingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#f6f8fb',
    borderRadius: 9,
    borderWidth: 1,
    borderColor: '#e6ebf2',
    borderStyle: 'dashed',
    paddingVertical: 7,
    paddingHorizontal: 10,
    marginLeft: 36,
    marginTop: 4,
    alignSelf: 'flex-start',
  },
  pendingText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#64748b',
  },
  askButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    backgroundColor: '#eef3ff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#dbe5ff',
    borderStyle: 'dashed',
    paddingVertical: 10,
    paddingHorizontal: 14,
    marginTop: theme.spacing.md,
  },
  askButtonText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1e4ed8',
  },
  sheetContent: {
    paddingHorizontal: theme.spacing.md,
    paddingTop: theme.spacing.sm,
    gap: theme.spacing.sm,
  },
  sheetTitle: {
    fontSize: theme.typography.h3,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.text,
  },
  sheetSubtitle: {
    fontSize: theme.typography.caption,
    color: theme.colors.muted,
  },
  inputWrapper: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
    padding: theme.spacing.sm,
    marginTop: theme.spacing.sm,
    minHeight: 100,
  },
  textInput: {
    fontSize: theme.typography.body,
    color: theme.colors.text,
    minHeight: 80,
  },
  charCount: {
    fontSize: 12,
    color: theme.colors.muted,
    textAlign: 'right',
    marginTop: 4,
  },
  visibilityLabel: {
    fontSize: 11,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.muted,
    letterSpacing: 0.8,
    marginTop: theme.spacing.sm,
  },
  visibilityOption: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
    backgroundColor: theme.colors.primaryTint,
    borderRadius: theme.radius.md,
    borderWidth: 1.5,
    borderColor: theme.colors.primary,
    padding: theme.spacing.md,
  },
  visibilityIconBox: {
    width: 36,
    height: 36,
    borderRadius: theme.radius.sm,
    backgroundColor: theme.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  visibilityInfo: {
    flex: 1,
  },
  visibilityTitle: {
    fontSize: theme.typography.body,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.text,
  },
  visibilityDesc: {
    fontSize: theme.typography.caption,
    color: theme.colors.muted,
  },
  submitBtn: {
    backgroundColor: theme.colors.primary,
    borderRadius: theme.radius.lg,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: theme.spacing.sm,
    ...theme.shadow.md,
  },
  submitBtnDisabled: {
    opacity: 0.5,
  },
  submitBtnText: {
    fontSize: theme.typography.body,
    fontWeight: theme.fontWeight.bold,
    color: '#fff',
  },
  skeletonRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
    marginBottom: theme.spacing.sm,
  },
  skeletonAvatar: {
    width: 32,
    height: 32,
    borderRadius: theme.radius.full,
    backgroundColor: theme.colors.border,
  },
  skeletonName: {
    width: 120,
    height: 12,
    borderRadius: theme.radius.sm,
    backgroundColor: theme.colors.border,
  },
  skeletonText: {
    width: '75%',
    height: 14,
    borderRadius: theme.radius.sm,
    backgroundColor: theme.colors.border,
    marginLeft: 40,
  },
}));

export default TaskQA;
