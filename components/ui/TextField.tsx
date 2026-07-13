import { StyleSheet, Text, TextInput, View } from 'react-native';

import { theme } from '@/constants/theme';

type TextFieldProps = {
  label: string;
  placeholder: string;
  secureTextEntry?: boolean;
  value?: string;
  onChangeText?: (value: string) => void;
};

export function TextField({
  label,
  placeholder,
  secureTextEntry = false,
  value,
  onChangeText,
}: TextFieldProps) {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={theme.colors.muted}
        secureTextEntry={secureTextEntry}
        style={styles.input}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    gap: theme.spacing.xs,
  },
  label: {
    color: theme.colors.text,
    fontSize: 14,
    fontWeight: '600',
  },
  input: {
    backgroundColor: theme.colors.card,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.radius.md,
    minHeight: 48,
    paddingHorizontal: theme.spacing.md,
    color: theme.colors.text,
  },
});
