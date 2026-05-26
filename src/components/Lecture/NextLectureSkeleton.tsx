import React from 'react';
import { View } from 'react-native';
import Skeleton from 'react-native-reanimated-skeleton';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

const NextLectureSkeleton = () => {
  const { styles } = useStyles(stylesheet);
  return (
    <View style={styles.container}>
      <Skeleton
        isLoading
        animationType="shiver"
        duration={1200}
        boneColor="rgba(255,255,255,0.15)"
        highlightColor="rgba(255,255,255,0.3)"
        layout={[
          { key: 'header', width: '60%', height: 14, borderRadius: 4 },
          {
            key: 'title',
            width: '85%',
            height: 28,
            borderRadius: 4,
            marginTop: 6,
          },
          {
            key: 'details',
            width: '90%',
            height: 16,
            borderRadius: 4,
            marginTop: 4,
          },
          {
            key: 'button',
            width: '100%',
            height: 37,
            borderRadius: 16,
            marginTop: 12,
          },
        ]}
      />
    </View>
  );
};

const stylesheet = createStyleSheet(() => ({
  container: {
    minHeight: 117,
    overflow: 'hidden',
  },
}));

export default NextLectureSkeleton;
