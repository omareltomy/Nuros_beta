import { getFireBaseConfig } from "config/firebase";
import { AuthError } from "firebase/auth";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { addDoc, collection, getDocs, getFirestore, query, where } from "firebase/firestore";
import React, { createContext, useContext, useState } from "react";

type FirebaseProviderPropsType = {
  children: React.ReactNode;
};

type FirebaseStateType = {
  user: firebase.User | null;
  error: string | null;
  token: string | undefined;
  setError: React.Dispatch<React.SetStateAction<string | null>>;
  isFetchingUser: boolean;
  signInWithGoogle: () => Promise<void>;
  registerWithCredentials: (email: string, password: string) => Promise<void>;
  loginWithCredentials: (email: string, password: string) => Promise<void>;
  logoutUserFromFirebase: () => Promise<void>;
};

// Init
if (!firebase.apps.length) {
  firebase.initializeApp(getFireBaseConfig());
}
const FirebaseContext = createContext<FirebaseStateType | undefined>(undefined);

function FirebaseProvider({ children }: FirebaseProviderPropsType) {
  const db = getFirestore();
  const auth = firebase.auth();
  const userRef = collection(db, "user");

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({ prompt: "select_account" });

  // AUTHENTICATION
  const [user, setUser] = useState<firebase.User | null>(null);
  const [token, setToken] = useState<string | undefined>(undefined);
  const [error, setError] = useState<string | null>(null);
  const [isFetchingUser, setIsFetchingUser] = useState(true);

  auth.onAuthStateChanged(async (user) => {
    if (user) {
      setUser(user);
      const token = await user.getIdToken()
      setToken(token)
    } else {
      setUser(null);
      setToken(undefined);
    }

    setIsFetchingUser(false);
  });

  /**
   * Register a user using email and password.
   */
  const registerWithCredentials = async (email: string, password: string) => {
    try {
      const { user } = await auth.createUserWithEmailAndPassword(
        email,
        password
      );

      if (!user) {
        setError("No user was found");
        return;
      }

      await addDoc(userRef, {
        uid: user.uid,
        name: user.displayName,
        authProvider: "local",
        email: user.email,
      });

    } catch (error) {
      const e = error as AuthError
      const errorCode = e.code;
      const errorMessage = e.message;
      if (errorCode === "auth/weak-password") {
        setError("The password is too weak.");
      } else if (errorCode === "auth/network-request-failed") {
        setError("Request failed. Check your internet connection and try again.");
      } else {
        setError(errorMessage);
      }
      console.log(e);
    }
  };

  /**
   * Login a user using email and password.
   */
  const loginWithCredentials = async (email: string, password: string) => {
    try {
      await auth.signInWithEmailAndPassword(email, password);

    } catch (error) {
      const e = error as AuthError
      const errorCode = e.code;
      const errorMessage = e.message;

      console.log(errorCode);

      if (errorCode === "auth/wrong-password") {
        setError("Wrong password.");
      } else if (errorCode === "auth/user-not-found") {
        setError("User not found");
      } else if (errorCode === "auth/network-request-failed") {
        setError("Request failed. Check your internet connection and try again.");
      } else {
        setError(errorMessage);
      }
      console.log(e);
    }
  };

  const signInWithGoogle = async () => {
    try {
      const { user } = await auth.signInWithPopup(provider);

      if (!user) {
        setError("No user was found");
        return;
      }

      const result = await getDocs(
        query(userRef, where("uid", "==", user.uid))
      );

      if (result.empty) {
        await addDoc(collection(db, "users"), {
          uid: user.uid,
          name: user.displayName,
          authProvider: "google",
          email: user.email,
        });
      }

    } catch (error) {
      const e = error as AuthError & {email: string}
      const errorCode = e.code;
      const email = e.email;
      const errorMessage = e.message;
      if (errorCode === "auth/account-exists-with-different-credential") {
        auth.fetchSignInMethodsForEmail(email).then(function (providers) {
          // figure out what to do here later
          console.log(providers);
        });
      } else if (errorCode === "auth/network-request-failed") {
        setError(
          "Request failed. Check your internet connection and try again."
        );
      } else {
        setError(errorMessage);
      }
    };
  }

  /**
   * Logout a user.
   */
  const logoutUserFromFirebase = async () => {
    await auth.signOut()
  };

  return (
    <FirebaseContext.Provider
      value={{
        user,
        error,
        token,
        setError,
        isFetchingUser,
        registerWithCredentials,
        loginWithCredentials,
        signInWithGoogle,
        logoutUserFromFirebase,
      }}
    >
      {children}
    </FirebaseContext.Provider>
  );
}

/**
 * Provides access to auth state and functions.
 */
function useFirebase() {
  console.log("in here")
  const context = useContext(FirebaseContext);

  if (context === undefined) {
    throw new Error("useFirebase must be used within a FirebaseProvider");
  }

  return context;
}

export { FirebaseProvider, useFirebase };
