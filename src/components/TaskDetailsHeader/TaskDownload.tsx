import { View, Text, Pressable, ActivityIndicator, Alert } from 'react-native';
import React, { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import RNBlobUtil from 'react-native-blob-util';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

import { NLP_BASE_URL } from '../../constants/config';

type Props = {
  professorS3Path: string | null;
  professorName: string;
};

const TaskDownload = ({ professorS3Path, professorName }: Props) => {
  const { styles, theme } = useStyles(stylesheet);
  const [downloading, setDownloading] = useState(false);

  if (!professorS3Path) return null;

  const fileName = professorS3Path.split('/')[1];
  const fileExt = fileName.split('.').pop()?.toUpperCase() ?? 'PDF';

  const handleDownload = async () => {
    const [folderName, file] = professorS3Path.split('/');
    const url = `${NLP_BASE_URL}/get_file_from_s3?folder_name=${encodeURIComponent(folderName)}&file_name=${encodeURIComponent(file)}`;

    try {
      setDownloading(true);
      const res = await RNBlobUtil.config({
        fileCache: true,
        appendExt: 'pdf',
      }).fetch('GET', url);
      await RNBlobUtil.android.actionViewIntent(res.path(), 'application/pdf');
    } catch {
      Alert.alert('Greška', 'Nije moguće otvoriti fajl.');
    } finally {
      setDownloading(false);
    }
  };

  return (
    <View style={styles.card}>
      <View style={styles.left}>
        <View style={styles.iconBox}>
          <Ionicons name="document-text" size={22} color={theme.colors.error} />
        </View>
        <View style={styles.info}>
          <Text style={styles.label}>ZADATAK ({fileExt})</Text>
          <Text style={styles.fileName} numberOfLines={1}>
            {fileName}
          </Text>
          <Text style={styles.meta}>postavio prof. {professorName}</Text>
        </View>
      </View>

      <Pressable onPress={handleDownload} disabled={downloading} style={styles.downloadButton}>
        {downloading ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <Ionicons name="cloud-download-outline" size={18} color="#fff" />
        )}
      </Pressable>
    </View>
  );
};

const stylesheet = createStyleSheet(theme => ({
  card: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.lg,
    padding: theme.spacing.md,
    marginTop: theme.spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    ...theme.shadow.sm,
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
    flex: 1,
  },
  iconBox: {
    width: 44,
    height: 44,
    borderRadius: theme.radius.md,
    backgroundColor: theme.colors.errorTint,
    alignItems: 'center',
    justifyContent: 'center',
  },
  info: {
    flex: 1,
    gap: 2,
  },
  label: {
    fontSize: 10,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.muted,
    letterSpacing: 0.5,
  },
  fileName: {
    fontSize: theme.typography.body,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.text,
  },
  meta: {
    fontSize: theme.typography.caption,
    color: theme.colors.muted,
  },
  downloadButton: {
    width: 40,
    height: 40,
    borderRadius: theme.radius.full,
    backgroundColor: theme.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

export default TaskDownload;
