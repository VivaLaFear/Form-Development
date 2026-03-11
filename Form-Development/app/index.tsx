import { Pressable, Text, View, StyleSheet } from "react-native";
import { useRouter } from 'expo-router';

export default function Index() {

  const router = useRouter();

  return (
    <View>
      <Pressable style={styles.button}
        onPress={() => router.push('/signup')}>
        <Text style={styles.buttonText}>Go to Sign Up Page</Text>
      </Pressable>

      <Pressable style={styles.button}
        onPress={() => router.push('/employee-form')}>
        <Text style={styles.buttonText}>Go to Employee Form Page</Text>
      </Pressable>

    </View >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
  },
  button: {
    backgroundColor: '#36454F',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: "#000000",
    fontSize: 16,
  }
})