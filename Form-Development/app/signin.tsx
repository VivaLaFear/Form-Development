import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const SignInSchema = Yup.object({
  email: Yup.string().email("Enter a valid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

export default function SignIn() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign In</Text>

      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={SignInSchema}
        validateOnMount
        validateOnChange
        validateOnBlur
        onSubmit={async (values, { resetForm, setSubmitting }) => {
          console.log("Sign In Data:", values);

          await new Promise((resolve) => setTimeout(resolve, 1500));

          setSubmitting(false);
          resetForm();
          router.push("/signup");
        }}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          handleReset,
          values,
          errors,
          touched,
          isValid,
          isSubmitting,
        }) => (
          <View>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={[
                styles.input,
                touched.email && errors.email ? styles.inputError : null,
                touched.email && !errors.email && values.email ? styles.inputSuccess : null,
              ]}
              placeholder="Enter your email"
              keyboardType="email-address"
              autoCapitalize="none"
              onChangeText={handleChange("email")}
              onBlur={handleBlur("email")}
              value={values.email}
            />
            {touched.email && errors.email ? (
              <Text style={styles.error}>{errors.email}</Text>
            ) : touched.email && !errors.email && values.email ? (
              <Text style={styles.success}>Looks good</Text>
            ) : null}

            <Text style={styles.label}>Password</Text>
            <View style={styles.passwordWrapper}>
              <TextInput
                style={[
                  styles.input,
                  styles.passwordInput,
                  touched.password && errors.password ? styles.inputError : null,
                  touched.password && !errors.password && values.password
                    ? styles.inputSuccess
                    : null,
                ]}
                placeholder="Enter your password"
                secureTextEntry={!showPassword}
                onChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
                value={values.password}
              />
              <Pressable
                style={styles.eyeButton}
                onPress={() => setShowPassword((prev) => !prev)}
              >
                <Ionicons name={showPassword ? "eye-off" : "eye"} size={22} color="#475569" />
              </Pressable>
            </View>
            {touched.password && errors.password ? (
              <Text style={styles.error}>{errors.password}</Text>
            ) : touched.password && !errors.password && values.password ? (
              <Text style={styles.success}>Looks good</Text>
            ) : null}

            <Pressable
              style={[
                styles.button,
                (!isValid || isSubmitting) && styles.buttonDisabled,
              ]}
              onPress={() => handleSubmit()}
              disabled={!isValid || isSubmitting}
            >
              {isSubmitting ? (
                <ActivityIndicator color="#ffffff" />
              ) : (
                <Text style={styles.buttonText}>Sign In</Text>
              )}
            </Pressable>

            <Pressable
              style={styles.resetButton}
              onPress={() => handleReset()}
              disabled={isSubmitting}
            >
              <Text style={styles.resetText}>Reset Form</Text>
            </Pressable>

            <Pressable onPress={() => router.push("/signup")}>
              <Text style={styles.link}>Don&apos;t have an account? Go to Sign Up</Text>
            </Pressable>
          </View>
        )}
      </Formik>
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
    fontSize: 32,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 26,
    color: "#111827",
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
    marginTop: 10,
    color: "#111827",
  },
  input: {
    borderWidth: 1,
    borderColor: "#cbd5e1",
    borderRadius: 14,
    padding: 14,
    fontSize: 16,
    marginBottom: 6,
    backgroundColor: "#ffffff",
  },
  passwordWrapper: {
    position: "relative",
  },
  passwordInput: {
    paddingRight: 48,
  },
  eyeButton: {
    position: "absolute",
    right: 14,
    top: 14,
  },
  inputError: {
    borderColor: "#dc2626",
  },
  inputSuccess: {
    borderColor: "#16a34a",
  },
  error: {
    color: "#dc2626",
    marginBottom: 8,
    fontSize: 13,
  },
  success: {
    color: "#16a34a",
    marginBottom: 8,
    fontSize: 13,
  },
  button: {
    backgroundColor: "#2563eb",
    paddingVertical: 15,
    borderRadius: 14,
    marginTop: 18,
  },
  buttonDisabled: {
    backgroundColor: "#94a3b8",
  },
  buttonText: {
    color: "#ffffff",
    textAlign: "center",
    fontSize: 18,
    fontWeight: "600",
  },
  resetButton: {
    marginTop: 14,
  },
  resetText: {
    textAlign: "center",
    color: "#475569",
    fontSize: 15,
    fontWeight: "600",
  },
  link: {
    color: "#2563eb",
    textAlign: "center",
    marginTop: 18,
    fontSize: 16,
    fontWeight: "500",
  },
});