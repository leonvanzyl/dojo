import { useState } from "react";
import { auth, db } from "../firebase/config";
import { useAuthContext } from "./useAuthContext";
import { signOut } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";

export const useLogout = () => {
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch, user } = useAuthContext();

  const logout = async () => {
    setError(null);
    setIsPending(true);

    // sign the user out
    try {
      // Update users table, set online status to false
      await updateDoc(doc(db, "users", user.uid), {
        online: false,
      });

      await signOut(auth);

      // dispatch logout action
      dispatch({ type: "LOGOUT" });
      setIsPending(false);
      setError(false);
    } catch (error) {
      setError(error.message);
      setIsPending(false);
    }
  };

  return { error, isPending, logout };
};
