import { useState } from "react";
import { auth, db } from "../firebase/config";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useAuthContext } from "./useAuthContext";
import { doc, updateDoc } from "firebase/firestore";

export const useLogin = () => {
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);

  const { dispatch } = useAuthContext();

  const login = async (email, password) => {
    setIsPending(true);
    setError(null);
    try {
      const user = await signInWithEmailAndPassword(auth, email, password);

      // Update users table, set online status to false
      await updateDoc(doc(db, "users", user.user.uid), {
        online: true,
      });
      setError(null);
      setIsPending(false);
      dispatch({ type: "LOGIN", payload: auth.currentUser });
    } catch (error) {
      setError(error.message);
      setIsPending(false);
    }
  };

  return { isPending, error, login };
};
