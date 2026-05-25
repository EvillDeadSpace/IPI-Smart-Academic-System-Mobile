import { View, Text } from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

import { tagConfig } from '../../constants/NotificationConst/const';
import { formatDate } from '../../utils/NotificationUtils/NotificationUtils';
import { newsType } from '../../types/news';

const NewsCard = ({ news }: { news: newsType }) => {
  const { styles } = useStyles(stylesheet);
  const config = tagConfig[news.tagName];

  return (
    <View style={styles.card}>
      <View style={[styles.iconContainer, { backgroundColor: config.bgColor }]}>
        <Ionicons name={config.icon} size={20} color={config.color} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.title} numberOfLines={1}>
          {news.title}
        </Text>
        <Text style={styles.content} numberOfLines={1}>
          {news.content}
        </Text>
        <Text style={styles.time}>{formatDate(news.createdAt)}</Text>
      </View>
    </View>
  );
};

const stylesheet = createStyleSheet(theme => ({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.surface,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm + 4,
    borderBottomWidth: theme.borderWidth.thin,
    borderBottomColor: theme.colors.border,
  },
  iconContainer: {
    width: theme.avatar.width,
    height: theme.avatar.height,
    borderRadius: theme.radius.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContainer: {
    flex: 1,
    paddingLeft: theme.spacing.md,
    gap: theme.spacing.xs,
  },
  title: {
    fontSize: theme.typography.body,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.text,
  },
  content: {
    fontSize: theme.typography.caption,
    color: theme.colors.muted,
    fontWeight: theme.fontWeight.regular,
  },
  time: {
    fontSize: theme.typography.caption,
    color: theme.colors.muted,
    fontWeight: theme.fontWeight.regular,
  },
}));

export default NewsCard;
