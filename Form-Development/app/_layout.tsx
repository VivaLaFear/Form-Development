import { useEffect } from "react";
import { Stack, useRouter, useSegments } from "expo-router";
import { AuthProvider, useAuth } from "../context/AuthContext";
import { ActivityIndicator, View, StyleSheet } from "react-native";


function Layout() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const segments = useSegments();

  useEffect(() => {
    if (loading) return; // Wait for loading to finish

    const inAuthGroup = segments[0] === "signin" || segments[0] === "signup";

    if (!user && !inAuthGroup) {
      router.replace("/signin");
    } else if (user && inAuthGroup) {
      router.replace("/");
    }
  }, [loading, user, segments, router]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#2563eb" />
      </View>
    );
  }

  return (
    <Stack screenOptions={{ headerShadowVisible: false }}>
      <Stack.Screen name="index" options={{ title: "Home" }} />
      <Stack.Screen name="signin" options={{ title: "Sign In", headerShown: false }} />
      <Stack.Screen name="signup" options={{ title: "Sign Up", headerShown: false }} />
      <Stack.Screen name="employee-form" options={{ title: "Employee Form" }} />
      <Stack.Screen name="submissions" options={{ title: "View Submissions" }} />
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <Layout />
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
  },
});