import React, { use state } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

interface Props {
  label: string;
  error?: string;
  touched?: boolean;
  [key: string]: any
}

export default function CustomInput({ label, error, touched, ...props: props }) {
  const [isFocused, setIsFocused] = useState(false);
}