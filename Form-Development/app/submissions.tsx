import { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from "react-native";
import { collection, query, where, getDocs } from "firebase/firestore";
import { auth, db } from "../config/firebase";

export default function Submissions() {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSubmissions = async () => {
      const q = query(
        collection(db, "submitted"),
        where("userId", "==", auth.currentUser?.uid)
      );
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setSubmissions(data);
      setLoading(false);
    };

    fetchSubmissions();
  }, []);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#2563eb" />
      </View>
    );
  }

  if (submissions.length === 0) {
    return (
      <View style={styles.centered}>
        <Text style={styles.emptyText}>No submissions yet.</Text>
      </View>
    );
  }

  return (
    <FlatList
      contentContainerStyle={styles.container}
      data={submissions}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View style={styles.card}>
          <Text style={styles.name}>{item.fullName}</Text>
          <Text style={styles.detail}>Employee ID: {item.employeeId}</Text>
          <Text style={styles.detail}>Email: {item.email}</Text>
          <Text style={styles.detail}>Phone: {item.phone}</Text>
          <Text style={styles.detail}>Department: {item.department}</Text>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#f0e9e9",
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0e9e9",
  },
  emptyText: {
    fontSize: 16,
    color: "#ffeaea",
  },
  card: {
    borderWidth: 1,
    borderColor: "#bdbcbc",
    borderRadius: 10,
    padding: 16,
    marginBottom: 14,
    backgroundColor: "#f0e9e9",
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 6,
    color: "#888282",
  },
  detail: {
    fontSize: 14,
    color: "#808080",
    marginBottom: 3,
  },
});
