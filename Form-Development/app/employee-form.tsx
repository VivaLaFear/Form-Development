import {
  ScrollView,
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";

const EmployeeSchema = Yup.object({
  fullName: Yup.string().min(3, "Minimum 3 characters").required("Full name is required"),
  employeeId: Yup.string()
    .min(4, "Minimum 4 characters")
    .max(10, "Maximum 10 characters")
    .required("Employee ID is required"),
  email: Yup.string().email("Enter a valid email").required("Email is required"),
  phone: Yup.string()
    .matches(/^[0-9]{10}$/, "Phone must be exactly 10 digits")
    .required("Phone number is required"),
  department: Yup.string().min(2, "Minimum 2 characters").required("Department is required"),
});

export default function EmployeeForm() {
  return (
    <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
      <Text style={styles.title}>Employee Information Form</Text>

      <Formik
        initialValues={{
          fullName: "",
          employeeId: "",
          email: "",
          phone: "",
          department: "",
        }}
        validationSchema={EmployeeSchema}
        validateOnMount
        validateOnChange
        validateOnBlur
        onSubmit={async (values, { resetForm, setSubmitting }) => {
          console.log("Employee Data:", values);

          await new Promise((resolve) => setTimeout(resolve, 1500));

          setSubmitting(false);
          resetForm();
          Alert.alert("Success", "Employee form submitted successfully");
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
            <Text style={styles.label}>Full Name</Text>
            <TextInput
              style={[
                styles.input,
                touched.fullName && errors.fullName ? styles.inputError : null,
                touched.fullName && !errors.fullName && values.fullName
                  ? styles.inputSuccess
                  : null,
              ]}
              placeholder="Enter full name"
              onChangeText={handleChange("fullName")}
              onBlur={handleBlur("fullName")}
              value={values.fullName}
            />
            {touched.fullName && errors.fullName ? (
              <Text style={styles.error}>{errors.fullName}</Text>
            ) : touched.fullName && !errors.fullName && values.fullName ? (
              <Text style={styles.success}>Looks good</Text>
            ) : null}

            <Text style={styles.label}>Employee ID</Text>
            <TextInput
              style={[
                styles.input,
                touched.employeeId && errors.employeeId ? styles.inputError : null,
                touched.employeeId && !errors.employeeId && values.employeeId
                  ? styles.inputSuccess
                  : null,
              ]}
              placeholder="Enter employee ID"
              onChangeText={handleChange("employeeId")}
              onBlur={handleBlur("employeeId")}
              value={values.employeeId}
            />
            {touched.employeeId && errors.employeeId ? (
              <Text style={styles.error}>{errors.employeeId}</Text>
            ) : touched.employeeId && !errors.employeeId && values.employeeId ? (
              <Text style={styles.success}>Looks good</Text>
            ) : null}

            <Text style={styles.label}>Email</Text>
            <TextInput
              style={[
                styles.input,
                touched.email && errors.email ? styles.inputError : null,
                touched.email && !errors.email && values.email ? styles.inputSuccess : null,
              ]}
              placeholder="Enter email"
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

            <Text style={styles.label}>Phone Number</Text>
            <TextInput
              style={[
                styles.input,
                touched.phone && errors.phone ? styles.inputError : null,
                touched.phone && !errors.phone && values.phone ? styles.inputSuccess : null,
              ]}
              placeholder="Enter 10-digit phone number"
              keyboardType="number-pad"
              onChangeText={handleChange("phone")}
              onBlur={handleBlur("phone")}
              value={values.phone}
            />
            {touched.phone && errors.phone ? (
              <Text style={styles.error}>{errors.phone}</Text>
            ) : touched.phone && !errors.phone && values.phone ? (
              <Text style={styles.success}>Looks good</Text>
            ) : null}

            <Text style={styles.label}>Department</Text>
            <TextInput
              style={[
                styles.input,
                touched.department && errors.department ? styles.inputError : null,
                touched.department && !errors.department && values.department
                  ? styles.inputSuccess
                  : null,
              ]}
              placeholder="Enter department"
              onChangeText={handleChange("department")}
              onBlur={handleBlur("department")}
              value={values.department}
            />
            {touched.department && errors.department ? (
              <Text style={styles.error}>{errors.department}</Text>
            ) : touched.department && !errors.department && values.department ? (
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
                <Text style={styles.buttonText}>Submit Employee Form</Text>
              )}
            </Pressable>

            <Pressable
              style={styles.resetButton}
              onPress={() => handleReset()}
              disabled={isSubmitting}
            >
              <Text style={styles.resetText}>Reset Form</Text>
            </Pressable>
          </View>
        )}
      </Formik>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 24,
    backgroundColor: "#ffffff",
  },
  title: {
    fontSize: 30,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 22,
    color: "#111827",
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
    marginTop: 8,
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
    marginBottom: 20,
  },
  resetText: {
    textAlign: "center",
    color: "#475569",
    fontSize: 15,
    fontWeight: "600",
  },
});