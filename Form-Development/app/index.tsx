import { View, Text, Pressable, StyleSheet } from "react-native";
import { router } from "expo-router";
import { signOut } from "firebase/auth";
import { auth } from "../config/firebase";

export default function Home() {
  const handleSignOut = async () => {
    try {
      await signOut(auth);
      router.replace("/signin");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Form App</Text>

      <Pressable style={styles.btn} onPress={() => router.push("/signin")}>
        <Text style={styles.text}>Go to Sign In</Text>
      </Pressable>

      <Pressable style={styles.btn} onPress={() => router.push("/signup")}>
        <Text style={styles.text}>Go to Sign Up</Text>
      </Pressable>

      <Pressable style={styles.btn} onPress={() => router.push("/employee-form")}>
        <Text style={styles.text}>Go to Employee Form</Text>
      </Pressable>

      <Pressable style={styles.signOutBtn} onPress={handleSignOut}>
        <Text style={styles.signOutText}>Sign Out</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 24,
    backgroundColor: "#ffffff",
  },
  title: {
    fontSize: 30,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 28,
    color: "#111827",
  },
  btn: {
    backgroundColor: "#2563eb",
    paddingVertical: 16,
    borderRadius: 14,
    marginBottom: 16,
  },
  text: {
    color: "#ffffff",
    textAlign: "center",
    fontSize: 18,
    fontWeight: "600",
  },
  signOutBtn: {
    marginTop: 8,
    paddingVertical: 16,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: "#dc2626",
  },
  signOutText: {
    color: "#dc2626",
    textAlign: "center",
    fontSize: 18,
    fontWeight: "600",
  },
});
