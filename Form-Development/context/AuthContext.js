import React, { createContext, useContext, useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../config/firebase";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("LOG 1: Persistence check started");

    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        // We found a saved session!
        console.log("LOG 2: User FOUND:", firebaseUser.email);
        setUser(firebaseUser);
        setLoading(false);
      } else {
        // If it's null, wait 800ms to allow AsyncStorage to finish "waking up"
        // before we officially give up and redirect to login.
        const timer = setTimeout(() => {
          console.log("LOG 2: No session found after delay.");
          setUser(null);
          setLoading(false);
        }, 800);

        return () => clearTimeout(timer);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);