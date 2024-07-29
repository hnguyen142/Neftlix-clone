import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { auth, db } from "../services/firebase"; // Ensure `db` is imported
import { doc, setDoc } from "firebase/firestore";

// Create the AuthContext
const AuthContext = createContext();
export default AuthContext;
// Define the AuthContextProvider component
export function AuthContextProvider({ children }) {
  const [user, setUser] = useState(null); // Initial user state is null
  const [loading, setLoading] = useState(true); // Track loading state

  // Monitor the authentication state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false); // Set loading to false once the auth state is determined
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  // Sign up function
  async function signUp(email, password) {
    try {
      // Create a new user with Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Create a new document in Firestore for the user
      await setDoc(doc(db, "users", user.uid), {
        favshow: [],
      });

      return user;
    } catch (error) {
      console.error("Error during sign-up:", error.message);
      throw error; // Re-throw the error to handle it in the calling function
    }
  }

  // Log in function
  async function logIn(email, password) {
    try {
      return await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error("Error during login:", error.message);
      throw error; // Re-throw the error to handle it in the calling function
    }
  }

  // Log out function
  async function logOut() {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error during logout:", error.message);
    }
  }

  // Provide the user state and auth functions to children
  const value = {
    user,
    signUp,
    logIn,
    logOut,
  };

  // Return context provider with value and handle loading state
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

// Custom hook for using auth context
export function useAuth() {
  return useContext(AuthContext);
}
