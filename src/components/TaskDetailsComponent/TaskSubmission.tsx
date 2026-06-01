import { View, Text, Pressable, TextInput, ActivityIndicator, Alert } from 'react-native';
import React, { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import * as DocumentPicker from 'expo-document-picker';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

import { NLP_BASE_URL } from '../../constants/config';
import { useAuthStore } from '../../store/authStore';

type Props = {
  assignmentId: number;
};

type SelectedFile = {
  name: string;
  size: number;
  uri: string;
  mimeType: string;
};

const formatSize = (bytes: number) => {
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};

const TaskSubmission = ({ assignmentId }: Props) => {
  const { styles, theme } = useStyles(stylesheet);
  const userId = useAuthStore(s => s.userId);
  const [file, setFile] = useState<SelectedFile | null>(null);
  const [comment, setComment] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handlePickFile = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: [
        'application/pdf',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'application/zip',
      ],
      copyToCacheDirectory: true,
    });

    if (!result.canceled && result.assets.length > 0) {
      const asset = result.assets[0];
      setFile({
        name: asset.name,
        size: asset.size ?? 0,
        uri: asset.uri,
        mimeType: asset.mimeType ?? 'application/octet-stream',
      });
    }
  };

  const handleSubmit = async () => {
    if (!file || !userId) return;

    try {
      setSubmitting(true);

      const formData = new FormData();
      formData.append('professor_subject', `assignments_${assignmentId}`);
      formData.append('assignment', userId);
      formData.append('file', {
        uri: file.uri,
        name: file.name,
        type: file.mimeType,
      } as unknown as Blob);

      const response = await fetch(`${NLP_BASE_URL}/save_s3`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('Upload failed');

      Alert.alert('Predato!', 'Vaš zadatak je uspješno predat.');
      setFile(null);
      setComment('');
    } catch {
      Alert.alert('Greška', 'Nije moguće predati zadatak. Pokušajte ponovo.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>MOJA PREDAJA</Text>

      <Pressable onPress={handlePickFile} style={styles.uploadZone}>
        <View style={styles.uploadIconBox}>
          <Ionicons name="cloud-upload-outline" size={22} color={theme.colors.primary} />
        </View>
        <Text style={styles.uploadTitle}>Povucite fajlove ovdje</Text>
        <Text style={styles.uploadSubtitle}>
          {'ili '}
          <Text style={styles.uploadLink}>kliknite za odabir</Text>
          {' · PDF, DOCX, ZIP'}
        </Text>
      </Pressable>

      {file && (
        <View style={styles.fileRow}>
          <View style={styles.fileIconBox}>
            <Ionicons name="document-outline" size={20} color={theme.colors.primary} />
          </View>
          <View style={styles.fileInfo}>
            <Text style={styles.fileName} numberOfLines={1}>
              {file.name}
            </Text>
            <Text style={styles.fileSize}>{formatSize(file.size)}</Text>
          </View>
          <Pressable onPress={() => setFile(null)} hitSlop={8}>
            <Ionicons name="trash-outline" size={20} color={theme.colors.error} />
          </Pressable>
        </View>
      )}

      <Text style={styles.commentLabel}>KOMENTAR ZA PROFESORA (OPCIONO)</Text>
      <TextInput
        style={styles.commentInput}
        placeholder="Npr."
        placeholderTextColor={theme.colors.muted}
        value={comment}
        onChangeText={setComment}
        multiline
        textAlignVertical="top"
      />

      <Pressable
        onPress={handleSubmit}
        disabled={!file || submitting}
        style={[styles.submitButton, (!file || submitting) && styles.submitButtonDisabled]}
      >
        {submitting ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <>
            <Ionicons name="paper-plane-outline" size={16} color="#fff" />
            <Text style={styles.submitText}>Predaj zadatak</Text>
          </>
        )}
      </Pressable>

      <Text style={styles.submitHint}>◎ Predaja se automatski potvrđuje SMS-om</Text>
    </View>
  );
};

const stylesheet = createStyleSheet(theme => ({
  container: {
    marginTop: theme.spacing.lg,
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.muted,
    letterSpacing: 0.8,
    marginBottom: theme.spacing.sm,
  },
  uploadZone: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.lg,
    borderWidth: 1.5,
    borderColor: theme.colors.border,
    borderStyle: 'dashed',
    paddingVertical: theme.spacing.lg,
    paddingHorizontal: theme.spacing.md,
    alignItems: 'center',
    gap: theme.spacing.sm,
  },
  uploadIconBox: {
    width: 48,
    height: 48,
    borderRadius: theme.radius.full,
    backgroundColor: theme.colors.primaryTint,
    alignItems: 'center',
    justifyContent: 'center',
  },
  uploadTitle: {
    fontSize: theme.typography.body,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.text,
  },
  uploadSubtitle: {
    fontSize: theme.typography.caption,
    color: theme.colors.muted,
  },
  uploadLink: {
    color: theme.colors.primary,
    fontWeight: theme.fontWeight.bold,
  },
  fileRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.md,
    padding: theme.spacing.md,
    marginTop: theme.spacing.sm,
    gap: theme.spacing.sm,
    ...theme.shadow.sm,
  },
  fileIconBox: {
    width: 36,
    height: 36,
    borderRadius: theme.radius.sm,
    backgroundColor: theme.colors.primaryTint,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fileInfo: {
    flex: 1,
    gap: 2,
  },
  fileName: {
    fontSize: theme.typography.caption,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.text,
  },
  fileSize: {
    fontSize: 12,
    color: theme.colors.muted,
  },
  commentLabel: {
    fontSize: 11,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.muted,
    letterSpacing: 0.8,
    marginTop: theme.spacing.md,
    marginBottom: theme.spacing.sm,
  },
  commentInput: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.md,
    padding: theme.spacing.md,
    fontSize: theme.typography.body,
    color: theme.colors.text,
    minHeight: 80,
    ...theme.shadow.sm,
  },
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
  submitButtonDisabled: {
    opacity: 0.5,
  },
  submitText: {
    fontSize: theme.typography.body,
    fontWeight: theme.fontWeight.bold,
    color: '#fff',
  },
  submitHint: {
    fontSize: 12,
    color: theme.colors.muted,
    textAlign: 'center',
    marginTop: theme.spacing.sm,
  },
}));

export default TaskSubmission;
