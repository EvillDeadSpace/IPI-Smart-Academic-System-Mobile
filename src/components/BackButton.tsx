import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useStyles, createStyleSheet } from 'react-native-unistyles';

const BackButton = () => {
  const { styles } = useStyles(stylesheet);
  const navigation = useNavigation();

  return (
    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
      <Ionicons name="chevron-back" size={20} color="#0f172a" />
    </TouchableOpacity>
  );
};

const stylesheet = createStyleSheet(theme => ({
  backButton: {
    width: theme.backButton.width,
    height: theme.backButton.height,
    borderRadius: theme.radius.sm,
    borderWidth: theme.borderWidth.thin,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    ...theme.shadow.sm,
  },
}));

export default BackButton;
