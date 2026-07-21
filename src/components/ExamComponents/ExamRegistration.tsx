import { View, Text, Pressable, StyleSheet, ActivityIndicator } from 'react-native';
import React, { useRef, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import { BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet';
import { registerForExam } from '@services/examService';
import { BottomSheetDefaultBackdropProps } from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop/types';
import { BlurView } from 'expo-blur';
import Animated, { useAnimatedStyle, interpolate, Extrapolate } from 'react-native-reanimated';

const BACKDROP_BG = 'rgba(0,0,0,0.4)';

const backdropStyles = StyleSheet.create({
  container: {
    backgroundColor: BACKDROP_BG,
  },
});

const BlurBackdrop = ({ animatedIndex, style }: BottomSheetDefaultBackdropProps) => {
  const animatedStyle = useAnimatedStyle(() => ({
    opacity: interpolate(animatedIndex.value, [-1, 0], [0, 1], Extrapolate.CLAMP),
  }));

  return (
    <Animated.View style={[style, animatedStyle, backdropStyles.container]}>
      <BlurView intensity={25} tint="dark" style={StyleSheet.absoluteFill} />
    </Animated.View>
  );
};

const HARDCODED_EMAIL = 'amar@amar.com';

type Props = {
  examId: number;
  examDate: string;
  examLocation: string;
  professorName: string;
  subjectName: string;
  onRegistered: (code: string) => void;
};

const ExamRegistration = ({
  examId,
  examDate,
  examLocation,
  professorName,
  subjectName,
  onRegistered,
}: Props) => {
  const { styles, theme } = useStyles(stylesheet);
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const [loading, setLoading] = useState(false);
  const [confirmationCode, setConfirmationCode] = useState<string | null>(null);

  const renderBackdrop = (props: BottomSheetDefaultBackdropProps) => <BlurBackdrop {...props} />;

  const handleConfirm = async () => {
    try {
      setLoading(true);
      const registration = await registerForExam(examId, HARDCODED_EMAIL);
      const code = `#PR-${new Date().getFullYear()}-${String(registration.id).padStart(4, '0')}`;
      setConfirmationCode(code);
    } catch {
      // TODO: error handling
    } finally {
      setLoading(false);
    }
  };

  const date = new Date(examDate);
  const day = date.getDate();
  const time = date.toLocaleTimeString('bs-BA', { hour: '2-digit', minute: '2-digit' });

  const rows = [
    { icon: 'calendar-outline' as const, label: 'TERMIN', value: `Dan ${day}. · ${time}` },
    { icon: 'location-outline' as const, label: 'LOKACIJA', value: examLocation },
    { icon: 'person-outline' as const, label: 'PROFESOR', value: professorName },
  ];

  return (
    <>
      <Pressable style={styles.submitButton} onPress={() => bottomSheetRef.current?.present()}>
        <Ionicons name="clipboard-outline" size={16} color="#fff" />
        <Text style={styles.submitText}>Prijavi ispit</Text>
      </Pressable>

      <BottomSheetModal ref={bottomSheetRef} enableDynamicSizing backdropComponent={renderBackdrop}>
        <BottomSheetView style={styles.sheetContent}>
          {confirmationCode ? (
            <>
              <View style={styles.successIconWrap}>
                <Ionicons name="checkmark" size={32} color="#16a34a" />
              </View>
              <Text style={styles.successTitle}>Prijava potvrđena</Text>
              <Text style={styles.successSubtitle}>
                Prijavljen/a si za <Text style={styles.successBold}>{subjectName}</Text>. Potvrda{' '}
                {confirmationCode}.
              </Text>
              <Pressable
                style={styles.confirmButton}
                onPress={() => {
                  onRegistered(confirmationCode!);
                  bottomSheetRef.current?.close();
                }}
              >
                <Text style={styles.confirmText}>Gotovo</Text>
              </Pressable>
            </>
          ) : (
            <>
              <Text style={styles.sheetTitle}>Prijava ispita</Text>
              <Text style={styles.sheetSubtitle}>{subjectName} · Ispit</Text>

              <View style={styles.infoCard}>
                {rows.map((row, index) => (
                  <View key={row.label}>
                    {index > 0 && <View style={styles.divider} />}
                    <View style={styles.infoRow}>
                      <Ionicons name={row.icon} size={18} color={theme.colors.muted} />
                      <View style={styles.infoText}>
                        <Text style={styles.infoLabel}>{row.label}</Text>
                        <Text style={styles.infoValue}>{row.value}</Text>
                      </View>
                    </View>
                  </View>
                ))}
              </View>

              <View style={styles.warningBox}>
                <Ionicons name="information-circle-outline" size={16} color="#b45309" />
                <Text style={styles.warningText}>Prijava se zatvara 3 dana prije termina.</Text>
              </View>

              <Pressable
                style={[styles.confirmButton, loading && styles.confirmButtonDisabled]}
                onPress={handleConfirm}
                disabled={loading}
              >
                {loading ? (
                  <ActivityIndicator size="small" color="#fff" />
                ) : (
                  <>
                    <Ionicons name="checkmark" size={18} color="#fff" />
                    <Text style={styles.confirmText}>Potvrdi prijavu</Text>
                  </>
                )}
              </Pressable>
            </>
          )}
        </BottomSheetView>
      </BottomSheetModal>
    </>
  );
};

const stylesheet = createStyleSheet(theme => ({
  submitButton: {
    backgroundColor: theme.colors.primary,
    borderRadius: theme.radius.lg,
    height: 52,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.spacing.sm,
    marginTop: theme.spacing.md,
    ...theme.shadow.md,
  },
  submitText: {
    fontSize: theme.typography.body,
    fontWeight: theme.fontWeight.bold,
    color: '#fff',
  },
  sheetContent: {
    paddingHorizontal: theme.spacing.md,
    paddingTop: theme.spacing.sm,
    paddingBottom: theme.spacing.xl,
    gap: theme.spacing.md,
  },
  sheetTitle: {
    fontSize: theme.typography.h3,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.text,
  },
  sheetSubtitle: {
    fontSize: theme.typography.caption,
    color: theme.colors.muted,
    marginTop: -8,
  },
  infoCard: {
    backgroundColor: theme.colors.background,
    borderRadius: theme.radius.md,
    paddingHorizontal: theme.spacing.md,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.md,
    paddingVertical: theme.spacing.md,
  },
  infoText: {
    gap: 2,
  },
  infoLabel: {
    fontSize: 11,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.muted,
    letterSpacing: 0.8,
  },
  infoValue: {
    fontSize: theme.typography.body,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.text,
  },
  divider: {
    height: 1,
    backgroundColor: theme.colors.border,
  },
  warningBox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: theme.spacing.sm,
    backgroundColor: '#fef9c3',
    borderRadius: theme.radius.md,
    borderWidth: 1,
    borderColor: '#fde68a',
    padding: theme.spacing.md,
  },
  warningText: {
    flex: 1,
    fontSize: theme.typography.caption,
    color: '#92400e',
    lineHeight: 18,
  },
  successIconWrap: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: '#dcfce7',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginBottom: theme.spacing.sm,
  },
  successTitle: {
    fontSize: theme.typography.h3,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.text,
    textAlign: 'center',
  },
  successSubtitle: {
    fontSize: theme.typography.body,
    color: theme.colors.muted,
    textAlign: 'center',
    lineHeight: 22,
  },
  successBold: {
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.text,
  },
  confirmButtonDisabled: {
    opacity: 0.6,
  },
  confirmButton: {
    backgroundColor: theme.colors.primary,
    borderRadius: theme.radius.lg,
    height: 52,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.spacing.sm,
    ...theme.shadow.md,
  },
  confirmText: {
    fontSize: theme.typography.body,
    fontWeight: theme.fontWeight.bold,
    color: '#fff',
  },
}));

export default ExamRegistration;
