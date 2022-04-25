import { useState, useEffect } from "react";
import { db } from "../firebase/config";
import { doc, onSnapshot } from "firebase/firestore";

export const useDocument = (col, id) => {
  const [document, setDocument] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const unsub = onSnapshot(
      doc(db, col, id),
      (doc) => {
        if (doc.data()) {
          setDocument({ ...doc.data(), id: doc.id });
          setError(null);
        } else {
          setError("Document not found");
        }
      },
      (error) => {
        setError(error.message);
        console.log(error.message);
      }
    );

    return () => {
      unsub();
    };
  }, [col, id]);

  return { document, error };
};
