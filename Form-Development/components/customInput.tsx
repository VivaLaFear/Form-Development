import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

interface Props {
  label: string;
  error?: string;
  touched?: boolean;
  [key: string]: any
}

export default function CustomInput({ label, error, touched, ...props }: Props) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={styles.inputContainer}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={[styles.input, isFocused && styles.inputFocused, touched && error ? styles.inputError : null]}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        {...props}
      />
      {touched && error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  )
}

const styles = StyleSheet.create({
  inputContainer: {
    width: '100%',
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    color: '#000000',
    marginBottom: 5,
  },
  input: {
    borderWidth: 3,
    borderColor: '#000000',
    padding: 12,
    borderRadius: 10,
    backgroundColor: '#36454F',
    fontSize: 14,
  },
  inputFocused: {
    borderColor: '#191970'
  },
  inputError: {
    borderColor: '#FF3131'
  },
  errorText: {
    color: '#FF3131',
    fontSize: 16,
    marginTop: 4,
  },
});