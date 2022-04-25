import { useState } from "react";

// Hooks
import { useAuthContext } from "./useAuthContext";

// Import firebase auth
import { auth, storage, db } from "../firebase/config";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useAuthContext();

  async function signup(email, password, displayName, thumbnail) {
    // Set isPending to true
    setError(null);
    setIsPending(true);

    // Sign up the user
    try {
      // Create the user
      await createUserWithEmailAndPassword(auth, email, password);

      // Upload the image
      const uploadPath = `thumbnails/${auth.currentUser.uid}/${thumbnail.name}`;
      const thumbnailRef = ref(storage, uploadPath);

      await uploadBytes(thumbnailRef, thumbnail);

      // Get the download URL
      const photoURL = await getDownloadURL(thumbnailRef);

      // Update the user profile
      await updateProfile(auth.currentUser, { displayName, photoURL });

      // Create a user document in the firestore database
      await setDoc(doc(db, "users", auth.currentUser.uid), {
        online: true,
        displayName,
        photoURL,
      });

      // Dispatch login action
      dispatch({ type: "LOGIN", payload: auth.currentUser });
    } catch (error) {
      setError(error.message);
      setIsPending(false);
    }

    // Set isPending to false
    setIsPending(false);
  }

  return { error, isPending, signup };
};
