import { StyleSheet, Text, TouchableOpacity, type StyleProp, type ViewStyle } from 'react-native';

type ButtonProps = {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'outline';
  style?: StyleProp<ViewStyle>;
  disabled?: boolean;
};

export function Button({ title, onPress, variant = 'primary', style, disabled = false }: ButtonProps) {
  const isPrimary = variant === 'primary';

  return (
    <TouchableOpacity
      style={[
        styles.button,
        {
          backgroundColor: isPrimary ? '#007AFF' : 'transparent',
          borderWidth: isPrimary ? 0 : 1,
          borderColor: '#007AFF',
        },
        style,
        disabled && styles.disabled,
      ]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={[styles.text, { color: isPrimary ? '#fff' : '#007AFF' }]}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: { fontSize: 16, fontWeight: '600' },
  disabled: { opacity: 0.5 },
});
